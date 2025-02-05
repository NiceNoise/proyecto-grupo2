// Función debounce para optimizar búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.getElementById("search-input").addEventListener("input", debounce(function () {
    const filter = this.value.toLowerCase().trim();
    const rows = document.querySelectorAll("#data-table tbody tr");
    let hasResults = false;

    // Mostrar indicador de búsqueda
    const searchIndicator = document.getElementById('searchIndicator');
    if (searchIndicator) searchIndicator.style.display = 'block';

    try {
        rows.forEach(row => {
            const cells = row.getElementsByTagName("td");
            let found = false;

            Array.from(cells).forEach(cell => {
                if (cell.textContent.toLowerCase().includes(filter)) {
                    found = true;
                }
            });

            row.style.display = found ? "" : "none";
            if (found) hasResults = true;
        });

        // Mostrar mensaje si no hay resultados
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = hasResults || !filter ? 'none' : 'block';
        }

    } catch (error) {
        console.error('Error en la búsqueda:', error);
    } finally {
        if (searchIndicator) searchIndicator.style.display = 'none';
    }
}, 300)); // 300ms de debounce
