document.addEventListener("DOMContentLoaded", function () {
    let hasChanges = false;
    let tableContainer = document.getElementById("table-container");
    let fileInput = document.getElementById("excel-file");
    let loadingSpinner = document.getElementById('loadingSpinner');

    if (!fileInput) {
        console.error("No se encontró el input de archivo.");
        return;
    }

    fileInput.addEventListener("change", async function(event) {
        const file = event.target.files[0];
        
        try {
            if (!file) throw new Error("No se ha seleccionado ningún archivo");

            const fileName = file.name.toLowerCase();
            const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
            const isCSV = fileName.endsWith('.csv');

            if (!isExcel && !isCSV) {
                throw new Error("Por favor, seleccione un archivo Excel (.xlsx, .xls) o CSV");
            }

            if (loadingSpinner) loadingSpinner.classList.remove('d-none');

            const reader = new FileReader();
            
            reader.onload = async function(e) {
                try {
                    let dataBySheet = {};

                    if (isExcel) {
                        const workbook = XLSX.read(e.target.result, { type: 'array' });
                        
                        workbook.SheetNames.forEach(sheetName => {
                            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

                            if (sheetData.length > 1) {
                                let headers = sheetData[0];
                                let rows = sheetData.slice(1).map(row => {
                                    let obj = {};
                                    headers.forEach((header, index) => {
                                        obj[header] = row[index] || "-"; // Manejo de valores vacíos
                                    });
                                    return obj;
                                });

                                dataBySheet[sheetName] = rows;
                            }
                        });

                    } else { // Es un CSV
                        Papa.parse(e.target.result, {
                            header: true,
                            dynamicTyping: true,
                            complete: function(results) {
                                dataBySheet["Hoja CSV"] = results.data;
                                saveAndRender(dataBySheet);
                            }
                        });
                        return;
                    }

                    saveAndRender(dataBySheet);

                } catch (error) {
                    console.error("Error procesando archivo:", error);
                    showMessage("Error al procesar el archivo", "error");
                } finally {
                    if (loadingSpinner) loadingSpinner.classList.add('d-none');
                }
            };

            if (isExcel) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }

        } catch (error) {
            console.error("Error:", error);
            showMessage(error.message, "error");
            if (loadingSpinner) loadingSpinner.classList.add('d-none');
        }
    });

    function saveAndRender(dataBySheet) {
        localStorage.setItem("tableData", JSON.stringify(dataBySheet));
        renderTables(dataBySheet);
        showMessage("Archivo cargado exitosamente", "success");
    }

    function renderTables(dataBySheet) {
        tableContainer.innerHTML = ""; // Limpiar contenido previo

        Object.keys(dataBySheet).forEach((sheetName, index) => {
            let tableId = `data-table-${index}`;
            let tableHTML = `
                <h3>${sheetName}</h3>
                <table id="${tableId}" class="table table-striped">
                    <thead><tr></tr></thead>
                    <tbody></tbody>
                </table>
            `;
            tableContainer.innerHTML += tableHTML;

            let tableBody = document.querySelector(`#${tableId} tbody`);
            let tableHead = document.querySelector(`#${tableId} thead tr`);
            let data = dataBySheet[sheetName];

            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='100%'>No data available</td></tr>";
                return;
            }

            Object.keys(data[0]).forEach(key => {
                let th = document.createElement("th");
                th.innerText = key;
                tableHead.appendChild(th);
            });

            data.forEach(rowData => {
                let row = document.createElement("tr");

                Object.keys(rowData).forEach(key => {
                    let cell = document.createElement("td");
                    cell.textContent = rowData[key] || "-";
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        });
    }

    function showMessage(message, type) {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        if (!alertPlaceholder) return;
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        alertPlaceholder.append(wrapper);
    }

    function loadTableData() {
        let savedData = localStorage.getItem("tableData");
        if (savedData) {
            renderTables(JSON.parse(savedData));
        }
    }

    window.addEventListener("beforeunload", function (event) {
        if (hasChanges) {
            event.preventDefault();
            event.returnValue = "¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.";
        }
    });

    loadTableData();
});
