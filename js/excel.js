let data = [];

function loadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.split('\n')
            .map(line => line.split(',').map(value => value.trim())) // Elimina espacios en blanco extra
            .filter(line => line.length > 1 && line[0]); // Ignora líneas vacías

        data = lines.slice(1).map((line, index) => ({
            id: (index + 1).toString(), // Convierte ID a string para comparación exacta
            nombre: line[0] || '',
            apellido: line[1] || '',
            email: line[2] || '',
            whatsapp: line[3] || ''
        }));

        displayData(data);
    };
    reader.readAsText(file);
}

function searchData() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = loadFile;
    fileInput.click();
}

function displayData(list) {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = '';

    if (list.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No se encontraron resultados</td></tr>';
        return;
    }

    list.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.email}</td>
            <td>${item.whatsapp}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    // Filtra de manera exacta cuando se busca por ID
    const filteredData = data.filter(item =>
        item.id === searchTerm || // Búsqueda exacta por ID
        item.nombre.toLowerCase().includes(searchTerm) ||
        item.whatsapp.includes(searchTerm)
    );

    displayData(filteredData);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'd-flex mt-3';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchInput';
    searchInput.className = 'form-control me-2';
    searchInput.placeholder = 'Buscar por ID, Nombre o Whatsapp';
    searchInput.addEventListener('input', filterData);

    const searchButton = document.createElement('button');
    searchButton.className = 'btn btn-primary';
    searchButton.textContent = 'Buscar';
    searchButton.onclick = filterData;

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    document.querySelector('.container').insertBefore(searchContainer, document.querySelector('table'));
    displayData(data);
});
