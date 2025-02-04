// Función para escapar caracteres especiales en HTML y prevenir inyección de código
function escapeHtml(str) {
    if (!str) return "";
    return str.toString()
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// Función para cargar un archivo CSV
function loadFile(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Por favor, seleccione un archivo CSV.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const contents = e.target.result;
        parseCSV(contents);
    };
    reader.readAsText(file);
}

// Función para procesar el CSV y mostrarlo en la tabla
function parseCSV(data) {
    // Usar Papa.parse para procesar correctamente el CSV
    const result = Papa.parse(data.trim(), {
        skipEmptyLines: true,  // Ignorar líneas vacías
        delimiter: detectDelimiter(data),  // Detectar delimitador automáticamente
    });

    const rows = result.data;
    if (rows.length === 0) {
        console.error("El archivo CSV está vacío o no tiene datos.");
        return;
    }

    const tableBody = document.getElementById("dataTable");
    if (!tableBody) {
        console.error("Error: No se encontró el elemento 'dataTable'.");
        return;
    }

    tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    let tableContent = "";
    const tableData = []; // Array para almacenar los datos en localStorage

    rows.forEach((row, index) => {
        // Saltar la primera fila (encabezados)
        if (index === 0) return;

        // Validar que la fila tenga al menos 7 columnas
        if (row.length < 7) {
            console.warn(`Fila ${index} tiene menos de 7 columnas. Se ignorará.`);
            return;
        }

        // Crear objeto con los datos de la fila
        const rowData = {
            id: escapeHtml(row[0]),
            name: escapeHtml(row[1]),
            lastName: escapeHtml(row[2]),
            email: escapeHtml(row[3]),
            whatsapp: escapeHtml(row[4]),
            funnel: escapeHtml(row[5]),
            course: escapeHtml(row[6]),
        };

        tableData.push(rowData); // Guardar en array para localStorage

        // Agregar la fila a la tabla con un botón de edición
        tableContent += `<tr>
            <td>${index}</td>
            <td>${rowData.id}</td>
            <td>${rowData.name}</td>
            <td>${rowData.lastName}</td>
            <td>${rowData.email}</td>
            <td>${rowData.whatsapp}</td>
            <td>${rowData.funnel}</td>
            <td>${rowData.course}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRow(${index})">Editar</button>
            </td>
        </tr>`;
    });

    tableBody.innerHTML = tableContent;
    
    // Guardar los datos en localStorage para edición
    localStorage.setItem("leads", JSON.stringify(tableData));
}

// Detectar el delimitador (coma, punto y coma o tabulación)
function detectDelimiter(csvString) {
    const delimiters = [",", ";", "\t"];
    const counts = delimiters.map(d => (csvString.split(d).length - 1));
    return delimiters[counts.indexOf(Math.max(...counts))];
}

// Función para editar una fila (se puede expandir)
function editRow(index) {
    console.log("Editando fila:", index);
    alert(`Edición de la fila ${index} aún no implementada.`);
}
