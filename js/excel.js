let data = [];

// Función para cargar el archivo CSV
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

        // Mostrar los datos en la consola
        console.log("Datos cargados desde el CSV:", data);

        displayData(data);
    };
    reader.readAsText(file);
}

// Función para buscar datos
function searchData() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = loadFile;
    fileInput.click();
}

// Función para mostrar los datos en la tabla
function displayData(list) {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar nuevos datos

    if (list.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No results found</td></tr>';
        return;
    }

    list.forEach(item => {
        const row = `<tr data-id="${item.id}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.whatsapp}</td>
            <td>${item.funnel}</td>
            <td>${item.course}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRow('${item.id}')">Edit</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row; // Agregar la fila a la tabla
    });
}

// Función para redirigir a la página principal
function goHome() {
    window.location.href = "index.html"; // Cambia "index.html" por la ruta correcta de tu página principal
}

// Función para abrir el modal y editar los datos de una fila
function editRow(id) {
    const rowData = data.find(item => item.id === id);
    if (!rowData) return;

    // Rellenar los campos del modal con los datos de la fila seleccionada
    document.getElementById('editId').value = rowData.id;
    document.getElementById('editName').value = rowData.name;
    document.getElementById('editLastName').value = rowData.lastName;
    document.getElementById('editEmail').value = rowData.email;
    document.getElementById('editWhatsapp').value = rowData.whatsapp;
    document.getElementById('editFunnel').value = rowData.funnel;
    document.getElementById('editCourse').value = rowData.course;

    // Mostrar el modal de edición
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// Función para guardar los cambios (permite edición N veces)
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
            displayData(data);

            // Cerrar modal después de guardar
            const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            editModal.hide();
        }
    }
}
