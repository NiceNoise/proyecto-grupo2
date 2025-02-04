let data = [];

// 📌 Función para cargar el archivo CSV
function loadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        parseCSV(e.target.result);
    };
    reader.readAsText(file);
}

// 📌 Función para analizar los datos CSV y llenar la tabla
function parseCSV(csvData) {
    Papa.parse(csvData, {
        complete: function(results) {
            data = results.data.slice(1).map((row, index) => ({
                id: (index + 1).toString(),
                name: row[0] || '',
                lastName: row[1] || '',
                email: row[2] || '',
                whatsapp: row[3] || '',
                funnel: row[4] || '',
                course: row[5] || ''
            }));

            // Guardar en localStorage
            localStorage.setItem("leads", JSON.stringify(data));

            // Mostrar datos en la tabla
            displayData(data);
        },
        header: false
    });
}

// 📌 Función para abrir explorador de archivos y cargar CSV
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
            document.getElementById('filePath').value = file.name;
            loadFile(event);
        }
    });
});

// 📌 Función para mostrar los datos en la tabla
function displayData(list) {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = ''; // Limpiar antes de agregar nuevos datos

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
        tableBody.innerHTML += row;
    });
}

// 📌 Función para buscar datos en la tabla
function searchTable() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = data.filter(item => 
        item.id.includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.whatsapp.includes(searchTerm) ||
        item.funnel.toLowerCase().includes(searchTerm) ||
        item.course.toLowerCase().includes(searchTerm)
    );

    displayData(filteredData);
}

// 📌 Función para editar una fila
function editRow(id) {
    const rowData = data.find(item => item.id === id);
    if (!rowData) return;

    // Llenar el modal con los datos actuales
    document.getElementById('editId').value = rowData.id;
    document.getElementById('editName').value = rowData.name;
    document.getElementById('editLastName').value = rowData.lastName;
    document.getElementById('editEmail').value = rowData.email;
    document.getElementById('editWhatsapp').value = rowData.whatsapp;
    document.getElementById('editFunnel').value = rowData.funnel;
    document.getElementById('editCourse').value = rowData.course;

    // Mostrar modal de edición
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// 📌 Función para guardar cambios después de editar
function saveChanges() {
    const id = document.getElementById('editId').value;
    const updatedData = {
        id,
        name: document.getElementById('editName').value.trim(),
        lastName: document.getElementById('editLastName').value.trim(),
        email: document.getElementById('editEmail').value.trim(),
        whatsapp: document.getElementById('editWhatsapp').value.trim(),
        funnel: document.getElementById('editFunnel').value.trim(),
        course: document.getElementById('editCourse').value.trim()
    };

    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedData;
        localStorage.setItem("leads", JSON.stringify(data));
        displayData(data);

        // Cerrar modal después de guardar
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        editModal.hide();
    }
}

// 📌 Función para redirigir a la página principal
function goHome() {
    window.location.href = "index.html";
}
