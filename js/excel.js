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

// Al cargar el contenido del documento
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dataTable').innerHTML = '<tr><td colspan="7" class="text-center">No data loaded</td></tr>';
});


// Función para filtrar los datos
function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    const filteredData = data.filter(item =>
        item.id === searchTerm || // Búsqueda exacta por ID
        item.name.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm) ||
        item.whatsapp.includes(searchTerm) ||
        item.funnel.toLowerCase().includes(searchTerm) ||
        item.course.toLowerCase().includes(searchTerm)
    );

    displayData(filteredData);
}

// Función para agregar datos
function addData() {
    const id = (data.length + 1).toString();
    const name = document.getElementById('nameInput').value.trim();
    const lastName = document.getElementById('lastNameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const whatsapp = document.getElementById('whatsappInput').value.trim();
    const funnel = document.getElementById('funnelInput').value.trim();
    const course = document.getElementById('courseInput').value.trim();

    if (name && lastName && email && whatsapp && funnel && course) {
        const newData = { id, name, lastName, email, whatsapp, funnel, course };
        data.push(newData); // Agregar el nuevo dato a la lista
        displayData(data); // Actualizar la tabla con los nuevos datos

        // Limpiar los campos después de agregar
        document.getElementById('nameInput').value = '';
        document.getElementById('lastNameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('whatsappInput').value = '';
        document.getElementById('funnelInput').value = '';
        document.getElementById('courseInput').value = '';
    }
}

// Función para editar los datos de una fila
function editRow(id) {
    const rowData = data.find(item => item.id === id);
    if (!rowData) return;

    // Rellenar los campos del formulario con los datos de la fila seleccionada
    document.getElementById('nameInput').value = rowData.name;
    document.getElementById('lastNameInput').value = rowData.lastName;
    document.getElementById('emailInput').value = rowData.email;
    document.getElementById('whatsappInput').value = rowData.whatsapp;
    document.getElementById('funnelInput').value = rowData.funnel;
    document.getElementById('courseInput').value = rowData.course;

    // Cambiar el botón de "Add" a "Save" para actualizar los datos
    const addButton = document.querySelector('.btn-success');
    addButton.textContent = 'Save Changes';
    addButton.onclick = function () {
        saveChanges(id);
    };
}

// Función para guardar los cambios de la fila editada
function saveChanges(id) {
    const name = document.getElementById('nameInput').value.trim();
    const lastName = document.getElementById('lastNameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const whatsapp = document.getElementById('whatsappInput').value.trim();
    const funnel = document.getElementById('funnelInput').value.trim();
    const course = document.getElementById('courseInput').value.trim();

    if (name && lastName && email && whatsapp && funnel && course) {
        const updatedData = { id, name, lastName, email, whatsapp, funnel, course };

        // Actualizar los datos en el arreglo
        const index = data.findIndex(item => item.id === id);
        data[index] = updatedData;

        // Actualizar la tabla
        displayData(data);

        // Limpiar los campos del formulario y restaurar el texto del botón
        clearForm();
    }
}

// Función para limpiar los campos del formulario
function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('lastNameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('whatsappInput').value = '';
    document.getElementById('funnelInput').value = '';
    document.getElementById('courseInput').value = '';

    const addButton = document.querySelector('.btn-success');
    addButton.textContent = 'Add Data';
    addButton.onclick = addData; // Restaurar la acción original
}

// Al cargar el contenido del documento
document.addEventListener('DOMContentLoaded', () => {
    // Crear formulario para agregar datos
    const formContainer = document.createElement('div');
    formContainer.className = 'd-flex flex-column mt-3';

    const inputs = [
        { id: 'nameInput', placeholder: 'Name' },
        { id: 'lastNameInput', placeholder: 'Last Name' },
        { id: 'emailInput', placeholder: 'Email' },
        { id: 'whatsappInput', placeholder: 'Whatsapp' },
        { id: 'funnelInput', placeholder: 'Funnel' },
        { id: 'courseInput', placeholder: 'Course' }
    ];

    inputs.forEach(input => {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = input.id;
        inputElement.className = 'form-control mb-2';
        inputElement.placeholder = input.placeholder;
        formContainer.appendChild(inputElement);
    });

    const addButton = document.createElement('button');
    addButton.className = 'btn btn-success';
    addButton.textContent = 'Add Data';
    addButton.onclick = addData;
    formContainer.appendChild(addButton);

    document.querySelector('.container').insertBefore(formContainer, document.querySelector('table'));

    // Crear barra de búsqueda
    const searchContainer = document.createElement('div');
    searchContainer.className = 'd-flex mt-3';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchInput';
    searchInput.className = 'form-control me-2';
    searchInput.placeholder = 'Search by ID, Name, Last Name, Whatsapp, Funnel, or Course';
    searchInput.addEventListener('input', filterData);

    const searchButton = document.createElement('button');
    searchButton.className = 'btn btn-primary';
    searchButton.textContent = 'Search';
    searchButton.onclick = filterData;

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    document.querySelector('.container').insertBefore(searchContainer, document.querySelector('table'));

    displayData(data); // Mostrar los datos al cargar la página
});

