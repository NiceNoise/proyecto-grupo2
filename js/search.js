document.getElementById("search-input").addEventListener("input", function () {
    const filter = this.value.toLowerCase(); // Obtener el valor del campo de búsqueda y convertirlo a minúsculas
    const rows = document.querySelectorAll("#data-table tbody tr"); // Obtener todas las filas de la tabla

    rows.forEach(row => { // Iterar sobre cada fila de la tabla
        const text = row.textContent.toLowerCase(); // Obtener el texto completo de la fila y convertirlo a minúsculas
        // Si el texto de la fila incluye el valor del filtro de búsqueda, mostrarla, de lo contrario, ocultarla
        row.style.display = text.includes(filter) ? "" : "none";
    });
});
