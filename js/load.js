// Variables generales scope load.js
let currentPage = 1;
const itemsPerPage = 5;
let filteredLeads = [];


// Función para abrir el explorador de archivos al presionar "Load"
document.getElementById('loadBtn').addEventListener('click', function() {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = '.csv';
    inputFile.style.display = 'none';
    document.body.appendChild(inputFile);
    inputFile.click();

    inputFile.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById('filePath').value = file.name; // Muestra el nombre del archivo en el textbox
            readCSVFile(file); // Llama a la función para leer el archivo CSV
        }
    });
});

// Función para leer el archivo CSV y llenar la tabla
function readCSVFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const csvData = event.target.result;
        parseCSV(csvData); // Llamar a la función para analizar los datos CSV
    };
    
    reader.readAsText(file);
}

// Función para analizar los datos CSV y crear los objetos Lead
function parseCSV(csvData) {
    let id = 1; // Inicializar el ID en 1
    Papa.parse(csvData, {
        complete: function(results) {
            leads = []; // Limpiar el arreglo de leads antes de llenarlo

            results.data.forEach(function(row) {
                if (row.length >= 4) {
                    const lead = new Lead(id, row[0], row[1], row[2], row[3]);
                    leads.push(lead);
                    id++;
                }
            });
            
            localStorage.setItem("leads", JSON.stringify(leads));

            filteredLeads = getLeads();
            renderTable();
            renderPagination();
        
        },
        header: false
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

// Renderizado de tabla
function renderTable() {
    const tbody = document.querySelector('#leadsTable tbody');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredLeads.slice(start, end);
    
    tbody.innerHTML = '';
    
    pageItems.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.id}</td>
            <td>${lead.nombre}</td>
            <td>${lead.apellido}</td>
            <td>${lead.correo}</td>
            <td>${lead.whatsapp}</td>
        `;
        tbody.appendChild(row);
    });
}


// Funciones de utilidad
function getLeads() {
    return JSON.parse(localStorage.getItem('leads')) || [];
}


// Función para inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    filteredLeads = getLeads();
    renderTable();
    renderPagination();
});
