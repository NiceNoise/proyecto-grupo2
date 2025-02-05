document.addEventListener("DOMContentLoaded", function () {
    let hasChanges = false; // Detectar cambios en la tabla

    // Ocultar tabla por defecto si existe
    let defaultTable = document.getElementById("default-table");
    if (defaultTable) {
        defaultTable.style.display = "none";
    }

    // Función para renderizar la tabla
    function renderTable(data) {
        let tableBody = document.querySelector("#data-table tbody");
        tableBody.innerHTML = ""; // Limpiar tabla

        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='7'>No data available</td></tr>";
            return;
        }

        data.forEach((rowData) => {
            let row = document.createElement("tr");

            ['id', 'name', 'lastName', 'email', 'whatsapp', 'funnel', 'course'].forEach(key => {
                let cell = document.createElement("td");
                cell.innerText = rowData[key];
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    }

    // Cargar datos desde localStorage
    function loadTableData() {
        let savedData = localStorage.getItem("tableData");
        if (savedData) {
            let data = JSON.parse(savedData);
            renderTable(data);
        } else {
            renderTable([]);
        }
    }

    // Guardar datos en localStorage y marcar cambios
    function saveTableData(data) {
        localStorage.setItem("tableData", JSON.stringify(data));
        hasChanges = true; // Se realizaron cambios
    }

    // Cargar archivos Excel o CSV
    document.getElementById("file-input").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                let parsedData = [];

                if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                } else if (file.name.endsWith('.csv')) {
                    parsedData = Papa.parse(e.target.result, { header: true, skipEmptyLines: true }).data;
                }

                if (parsedData.length > 0) {
                    let formattedData = parsedData.map((row, index) => ({
                        id: index + 1,
                        name: row['Name'] || '',
                        lastName: row['Last Name'] || '',
                        email: row['Email'] || '',
                        whatsapp: row['Whatsapp'] || '',
                        funnel: row['Funnel'] || '',
                        course: row['Course'] || '',
                    }));

                    renderTable(formattedData);
                    saveTableData(formattedData);
                }
            };

            if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }
        }
    });

    // Detectar cambios en los datos de la tabla
    document.addEventListener("input", function () {
        hasChanges = true;
    });

    // Detectar cambios en el archivo cargado
    document.getElementById("file-input").addEventListener("change", function () {
        hasChanges = true;
    });

    // Advertencia antes de salir si hay cambios
    window.addEventListener("beforeunload", function (event) {
        if (hasChanges) {
            event.preventDefault(); // Necesario en algunos navegadores
            event.returnValue = "¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.";
        }
    });

    // Cargar datos al inicio
    loadTableData();
});
