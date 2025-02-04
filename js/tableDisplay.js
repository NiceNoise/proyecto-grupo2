// Función para escapar caracteres especiales en HTML
function escapeHtml(str) {
    if (!str) return "";
    return str.toString()
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// Función para renderizar la tabla con los datos almacenados en localStorage
function renderTable() {
    const tableBody = document.getElementById("dataTable");
    if (!tableBody) {
        console.error("Error: No se encontró el elemento 'dataTable'.");
        return;
    }

    tableBody.innerHTML = ""; // Limpiar el contenido actual de la tabla

    // Obtener los datos de la tabla desde el localStorage o inicializar con un array vacío si no hay datos
    let tableData = [];
    try {
        tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    } catch (error) {
        console.error("Error al parsear los datos de localStorage:", error);
        alert("Error al cargar los datos. Por favor, verifica que los datos sean válidos.");
        return;
    }

    // Construir el contenido de la tabla
    let tableContent = "";
    tableData.forEach((row, index) => {
        tableContent += `<tr>
            <td>${escapeHtml(row.id)}</td>
            <td>${escapeHtml(row.name)}</td>
            <td>${escapeHtml(row.lastName)}</td>
            <td>${escapeHtml(row.email)}</td>
            <td>${escapeHtml(row.whatsapp)}</td>
            <td>${escapeHtml(row.funnel)}</td>
            <td>${escapeHtml(row.course)}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editRow(${index})">Edit</button></td>
        </tr>`;
    });

    // Insertar el contenido en la tabla
    tableBody.innerHTML = tableContent;
}

// Agregar un evento al botón de cargar CSV que renderiza la tabla cuando se hace clic en el botón
const loadCsvBtn = document.getElementById("loadCsvBtn");
if (loadCsvBtn) {
    loadCsvBtn.addEventListener("click", () => {
        renderTable();
    });
} else {
    console.error("Error: No se encontró el botón 'loadCsvBtn'.");
}