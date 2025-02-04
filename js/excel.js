let data = [];

/**
 * Carga un archivo CSV y procesa su contenido.
 * @param {Event} event Evento de carga del archivo.
 */
function loadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.split('\n')
            .map(line => line.split(',').map(value => value.trim())) // Elimina espacios extra
            .filter(line => line.length > 1 && line[0]); // Ignora líneas vacías

        data = lines.slice(1).map((line, index) => ({
            id: (index + 1).toString(), // ID como string para comparación exacta
            name: line[0] || '',
            lastName: line[1] || '',
            email: line[2] || '',
            whatsapp: line[3] || '',
            funnel: line[4] || '',
            course: line[5] || ''
        }));

        console.log("Datos cargados desde el CSV:", data);
        
        // Guardar datos en localStorage
        localStorage.setItem("csvData", JSON.stringify(data));

        displayData(data);
    };
    reader.readAsText(file);
}

/**
 * Crea un input de tipo archivo para cargar datos desde un CSV.
 */
function searchData() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = loadFile;
    fileInput.click();
}

/**
 * Muestra los datos en una tabla HTML.
 * @param {Array} list Lista de datos a mostrar en la tabla.
 */
function displayData(list) {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = '';

    if (list.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No results found</td></tr>';
        return;
    }

    list.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', item.id);
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.whatsapp}</td>
            <td>${item.funnel}</td>
            <td>${item.course}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Agregar evento a los botones de edición
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            editRow(this.dataset.id);
        });
    });
}

/**
 * Carga los datos desde localStorage al iniciar la página.
 */
function loadFromLocalStorage() {
    const storedData = localStorage.getItem("csvData");
    if (storedData) {
        data = JSON.parse(storedData);
        displayData(data);
    }
}

/**
 * Abre el modal y carga los datos para editar una fila.
 * @param {string} id ID de la fila a editar.
 */
function editRow(id) {
    const rowData = data.find(item => item.id === id);
    if (!rowData) return;

    document.getElementById('editId').value = rowData.id;
    document.getElementById('editName').value = rowData.name;
    document.getElementById('editLastName').value = rowData.lastName;
    document.getElementById('editEmail').value = rowData.email;
    document.getElementById('editWhatsapp').value = rowData.whatsapp;
    document.getElementById('editFunnel').value = rowData.funnel;
    document.getElementById('editCourse').value = rowData.course;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

/**
 * Guarda los cambios de una fila editada.
 */
function saveChanges() {
    const id = document.getElementById('editId').value;
    const name = document.getElementById('editName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const whatsapp = document.getElementById('editWhatsapp').value.trim();
    const funnel = document.getElementById('editFunnel').value.trim();
    const course = document.getElementById('editCourse').value.trim();

    if (name && lastName && email && whatsapp && funnel && course) {
        const updatedData = { id, name, lastName, email, whatsapp, funnel, course };

        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = updatedData;
            console.log("Cambios guardados para el ID:", id, updatedData);
            
            // Guardar cambios en localStorage
            localStorage.setItem("csvData", JSON.stringify(data));

            displayData(data);

            const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            editModal.hide();
        }
    }
}

// Agregar eventos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    // Cargar datos almacenados al iniciar la página
    loadFromLocalStorage();

    // Evento para cargar un archivo CSV
    document.getElementById("loadCsvBtn")?.addEventListener("click", searchData);

    // Evento para guardar los cambios de edición
    document.getElementById("saveChangesBtn")?.addEventListener("click", saveChanges);
});
