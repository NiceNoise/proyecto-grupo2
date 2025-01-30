

// Función para mostrar los datos en la tabla
function displayData(dataToDisplay) {
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = ""; // Limpiar tabla

    if (dataToDisplay.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='8' class='text-center'>No results found</td></tr>";
    } else {
        dataToDisplay.forEach(item => {
            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.lastName}</td>
                    <td>${item.email}</td>
                    <td>${item.whatsapp}</td>
                    <td>${item.funnel}</td>
                    <td>${item.course}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editRow(${item.id})">Edit</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

// Función de búsqueda en la tabla
function searchTable() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = data.filter(item =>
        item.id.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.whatsapp.toLowerCase().includes(searchTerm) ||
        item.funnel.toLowerCase().includes(searchTerm) ||
        item.course.toLowerCase().includes(searchTerm)
    );
    displayData(filteredData);
}

// Mostrar los datos al cargar la página
window.onload = () => {
    displayData(data);
};
