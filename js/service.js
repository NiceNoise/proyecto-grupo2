// Variables generales scope service.js
let currentPage = 1;
const itemsPerPage = 5;
let filteredLeads = [];

// Inicialización de datos de ejemplo
function initializeSampleData() {
    if (!localStorage.getItem('leads')) {
        const sampleLeads = [
            new Lead(1, 'Juan', 'Pérez', 'juan@example.com', '1234567890', 1, 0),
            new Lead(2, 'María', 'García', 'maria@example.com', '0987654321', 2, 1),
            // Añadir más datos de ejemplo según sea necesario
        ];
        localStorage.setItem('leads', JSON.stringify(sampleLeads));
    }

    if (!localStorage.getItem('funnels')) {
        const sampleFunnels = [
            new Funnel(1, 'Nuevo Lead', '¡Bienvenido! Estos son nuestros cursos:'),
            new Funnel(2, 'Interesado', '¿Te interesa nuestro curso de'),
            new Funnel(3, 'En Proceso', 'Continúa tu proceso en el curso de'),
            new Funnel(4, 'Finalizado', '¡Felicitaciones por completar el curso de')
        ];
        localStorage.setItem('funnels', JSON.stringify(sampleFunnels));
    }

    if (!localStorage.getItem('courses')) {
        const sampleCourses = [
            new Course(1, 'Marketing Digital', '¡Aprende las últimas estrategias!'),
            new Course(2, 'Desarrollo Web', '¡Conviértete en desarrollador web!'),
            new Course(3, 'Diseño UX/UI', '¡Crea experiencias increíbles!')
        ];
        localStorage.setItem('courses', JSON.stringify(sampleCourses));
    }
}

// Funciones de utilidad
function getLeads() {
    return JSON.parse(localStorage.getItem('leads')) || [];
}

function getFunnels() {
    return JSON.parse(localStorage.getItem('funnels')) || [];
}

function getCourses() {
    return JSON.parse(localStorage.getItem('courses')) || [];
}

function fillFilterFunnels() {
    const funnelSelect = document.getElementById('filterFunnel');
    const funnels = getFunnels();
   
    funnelSelect.innerHTML = '<option value="">Select Funnel</option>';
    
    funnels.forEach(funnel => {
    const option = document.createElement('option');
    option.value = funnel.id;
    option.textContent = funnel.descripcion;
    funnelSelect.appendChild(option);
    });
}

function fillFilterCourses() {
    const courseSelect = document.getElementById('filterCourse');
    const courses = getCourses();

    courseSelect.innerHTML = '<option value="">Select Course</option>';
    
    courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.descripcion;
    courseSelect.appendChild(option);
    });
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

    pagination.innerHTML = '';

    // Botón Anterior
    const prevButton = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a></li>`;
    pagination.insertAdjacentHTML('beforeend', prevButton);

    // Botones numéricos
    for (let i = 1; i <= totalPages; i++) {
        const active = i === currentPage ? 'active' : '';
        const pageButton = `<li class="page-item ${active}">
            <a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        pagination.insertAdjacentHTML('beforeend', pageButton);
    }

    // Botón Siguiente
    const nextButton = `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`;
    pagination.insertAdjacentHTML('beforeend', nextButton);

    // Event listeners
    pagination.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(link.dataset.page);
            renderTable();
            renderPagination();
        });
    });

}

// Funciones de filtrado
function applyFilters() {
    const leads = getLeads();
    const id = document.getElementById('filterId').value;
    const nombre = document.getElementById('filterNombre').value.toLowerCase();
    const apellido = document.getElementById('filterApellido').value.toLowerCase();
    const whatsapp = document.getElementById('filterWhatsapp').value;
    const funnel = document.getElementById('filterFunnel').value;
    const curso = document.getElementById('filterCourse').value;

    filteredLeads = leads.filter(lead => {
        return (!id || lead.id.toString() === id) &&
               (!nombre || lead.nombre.toLowerCase().includes(nombre)) &&
               (!apellido || lead.apellido.toLowerCase().includes(apellido)) &&
               (!whatsapp || lead.whatsapp.includes(whatsapp)) &&
               (!funnel || lead.funnel.toString() === funnel) &&
               (!curso || lead.curso.toString() === curso);
    });

    currentPage = 1;
    renderTable();
    renderPagination();
}

// Renderizado de tabla
function renderTable() {
    const tbody = document.querySelector('#leadsTable tbody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredLeads.slice(start, end);
    
    tbody.innerHTML = '';
    
    pageItems.forEach(lead => {
        const funnel = getFunnels().find(f => f.id === lead.funnel);
        const course = getCourses().find(c => c.id === lead.curso);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.id}</td>
            <td>${lead.nombre}</td>
            <td>${lead.apellido}</td>
            <td>${lead.correo}</td>
            <td>${lead.whatsapp}</td>
            <td>${funnel ? funnel.descripcion : ''}</td>
            <td>${course ? course.descripcion : ''}</td>
            <td>
                <button class="btn btn-primary btn-send" onclick="handleSend(${lead.id})">
                    Send
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Manejo de envío de mensajes
async function handleSend(leadId) {
    const lead = getLeads().find(l => l.id === leadId);
    const funnel = getFunnels().find(f => f.id === lead.funnel);
    const courses = getCourses();
    const currentCourse = courses.find(c => c.id === lead.curso);

    let message = '';
    
    switch(lead.funnel) {
        case 1:
            const coursesList = courses.map(c => c.descripcion).join(', ');
            message = `${lead.nombre} ${lead.apellido} ${funnel.mensaje} ${coursesList}`;
            showCoursesModal(lead, message);
            break;
            
        case 2:
            message = `${lead.nombre} ${lead.apellido} ${funnel.mensaje} ${currentCourse.descripcion} ${currentCourse.mensaje}`;
            await sendWhatsAppMessage(lead.whatsapp, message);
            updateLeadFunnel(lead.id, 3);
            break;
            
        case 3:
            message = `${lead.nombre} ${lead.apellido} ${funnel.mensaje} ${currentCourse.descripcion}`;
            await sendWhatsAppMessage(lead.whatsapp, message);
            updateLeadFunnel(lead.id, 4);
            break;
    }
}

// Funciones de modal
function showCoursesModal(lead, message) {
    const modal = new bootstrap.Modal(document.getElementById('coursesModal'));
    const coursesList = document.getElementById('coursesList');
    const courses = getCourses();
    
    coursesList.innerHTML = courses.map((course, index) => `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="course" 
                   value="${course.id}" id="course${course.id}" 
                   ${index === 0 ? 'checked' : ''}>
            <label class="form-check-label" for="course${course.id}">
                ${course.descripcion}
            </label>
        </div>
    `).join('');
    
    document.getElementById('acceptCourse').onclick = async () => {
        const selectedCourseId = parseInt(document.querySelector('input[name="course"]:checked').value);
        modal.hide();
        await sendWhatsAppMessage(lead.whatsapp, message);
        updateLeadFunnel(lead.id, 2, selectedCourseId);
    };
    
    modal.show();
}

// Funciones de actualización
function updateLeadFunnel(leadId, newFunnel, newCourse = null) {
    const leads = getLeads();
    const leadIndex = leads.findIndex(l => l.id === leadId);
    
    if (leadIndex !== -1) {
        leads[leadIndex].funnel = newFunnel;
        if (newCourse !== null) {
            leads[leadIndex].curso = newCourse;
        }
        localStorage.setItem('leads', JSON.stringify(leads));
        applyFilters();
    }
}

// Función para enviar mensaje de WhatsApp
async function sendWhatsAppMessage(number, message) {
    try {
        // Limpiar el número de teléfono (eliminar espacios, guiones, etc.)
        const cleanNumber = number.replace(/[^0-9]/g, '');
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear el enlace de WhatsApp
        const whatsappURL = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
        
        // Abrir WhatsApp en una nueva ventana
        window.open(whatsappURL, '_blank');
        
        // Retornar promesa resuelta exitosamente
        return Promise.resolve({
            success: true,
            message: 'WhatsApp window opened successfully'
        });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        
        // Retornar promesa rechazada con el error
        return Promise.reject({
            success: false,
            error: 'Failed to open WhatsApp'
        });
    }
}

// Función para inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar datos de ejemplo
    initializeSampleData();

    //  Llena combo funnel de los filtros
    fillFilterFunnels(); 

    //  Llena combo cursos de los filtros
    fillFilterCourses(); 
    
    // Configurar eventos de filtros
    document.getElementById('filterId').addEventListener('input', applyFilters);
    document.getElementById('filterNombre').addEventListener('input', applyFilters);
    document.getElementById('filterApellido').addEventListener('input', applyFilters);
    document.getElementById('filterWhatsapp').addEventListener('input', applyFilters);
    document.getElementById('filterFunnel').addEventListener('change', applyFilters);
    document.getElementById('filterCourse').addEventListener('change', applyFilters);
    
    // Cargar datos iniciales
    applyFilters();
    
    // Configurar botón de inicio
    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});