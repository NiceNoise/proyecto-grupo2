function searchTable() {
    // Obtener el valor ingresado en el campo de búsqueda y convertirlo a minúsculas
    const input = document.getElementById("searchInput").value.toLowerCase();
    
    // Seleccionar todas las filas de la tabla (dentro de tbody)
    const rows = document.querySelectorAll("#dataTable tr");

    // Iterar sobre cada fila de la tabla
    rows.forEach(row => {
        // Seleccionar todas las celdas (td) de la fila actual
        const cells = row.querySelectorAll("td");

        // Inicializar la variable que indicará si hay una coincidencia en alguna celda
        let match = false;

        // Iterar sobre cada celda de la fila
        cells.forEach(cell => {
            // Verificar si el contenido de la celda incluye el texto de búsqueda
            if (cell.textContent.toLowerCase().includes(input)) {
                // Si hay coincidencia, cambiar match a true
                match = true;
            }
        });

        // Si hay una coincidencia en alguna celda, mostrar la fila, de lo contrario, ocultarla
        row.style.display = match ? "" : "none";
    });
}
