document.addEventListener("DOMContentLoaded", function () {
    let hasChanges = false; // Detectar cambios en la tabla

    // Ocultar la tabla por defecto si existe
    let defaultTable = document.getElementById("default-table");
    if (defaultTable) {
        defaultTable.style.display = "none"; // Esconde la tabla por defecto
    }

    // Función para renderizar la tabla con los datos proporcionados
    function renderTable(data) {
        let tableBody = document.querySelector("#data-table tbody");
        tableBody.innerHTML = ""; // Limpiar el contenido previo de la tabla

        // Mostrar mensaje si no hay datos disponibles
        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='7'>No data available</td></tr>";
            return;
        }

        // Crear filas de la tabla para cada fila de datos
        data.forEach((rowData) => {
            let row = document.createElement("tr");

            // Recorrer las propiedades de cada fila y crear celdas para la tabla
            ['id', 'name', 'lastName', 'email', 'whatsapp', 'funnel', 'course'].forEach(key => {
                let cell = document.createElement("td");
                cell.innerText = rowData[key]; // Insertar los datos en la celda
                row.appendChild(cell);
            });

            tableBody.appendChild(row); // Añadir la fila completa al cuerpo de la tabla
        });
    }

    // Función para cargar los datos guardados en localStorage
    function loadTableData() {
        let savedData = localStorage.getItem("tableData"); // Obtener datos almacenados
        if (savedData) {
            let data = JSON.parse(savedData); // Convertir datos de texto a objeto
            renderTable(data); // Renderizar la tabla con los datos guardados
        } else {
            renderTable([]); // Si no hay datos, mostrar tabla vacía
        }
    }

    // Función para guardar los datos en localStorage y marcar cambios
    function saveTableData(data) {
        localStorage.setItem("tableData", JSON.stringify(data)); // Guardar datos como texto
        hasChanges = true; // Indicar que se hicieron cambios
    }

    // Cargar y procesar archivos Excel o CSV
    document.getElementById("file-input").addEventListener("change", function (event) {
        const file = event.target.files[0]; // Obtener el archivo cargado
        if (file) {
            const reader = new FileReader();

            // Función que se ejecuta cuando el archivo se ha leído
            reader.onload = function (e) {
                let parsedData = []; // Array para almacenar datos procesados

                // Procesar archivos Excel (.xlsx o .xls)
                if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0]; // Obtener el nombre de la primera hoja
                    const sheet = workbook.Sheets[sheetName]; // Obtener la hoja
                    parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convertir a JSON
                } 
                // Procesar archivos CSV
                else if (file.name.endsWith('.csv')) {
                    parsedData = Papa.parse(e.target.result, { header: true, skipEmptyLines: true }).data;
                }

                // Si se encuentran datos, formatearlos y renderizarlos
                if (parsedData.length > 0) {
                    let formattedData = parsedData.map((row, index) => ({
                        id: index + 1,
                        name: row['Name'] || '', // Asegurarse de que no haya campos vacíos
                        lastName: row['Last Name'] || '',
                        email: row['Email'] || '',
                        whatsapp: row['Whatsapp'] || '',
                        funnel: row['Funnel'] || '',
                        course: row['Course'] || '',
                    }));

                    renderTable(formattedData); // Renderizar la tabla con los datos formateados
                    saveTableData(formattedData); // Guardar los datos en localStorage
                }
            };

            // Leer archivo según el tipo (Excel o CSV)
            if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                reader.readAsArrayBuffer(file); // Leer archivos Excel como array de bytes
            } else {
                reader.readAsText(file); // Leer archivos CSV como texto
            }
        }
    });

    // Detectar cambios en los datos de la tabla (cualquier input en la página)
    document.addEventListener("input", function () {
        hasChanges = true; // Marcar que se han realizado cambios
    });

    // Detectar cambios cuando se carga un archivo
    document.getElementById("file-input").addEventListener("change", function () {
        hasChanges = true; // Marcar que se ha cargado un archivo
    });

    // Advertencia al usuario antes de abandonar la página si hay cambios no guardados
    window.addEventListener("beforeunload", function (event) {
        if (hasChanges) {
            event.preventDefault(); // Necesario para algunos navegadores antiguos
            event.returnValue = "¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.";
        }
    });

    // Cargar los datos guardados cuando la página se carga inicialmente
    loadTableData();
});
