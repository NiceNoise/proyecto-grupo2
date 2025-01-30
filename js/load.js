// Función para abrir el explorador de archivos al presionar "Load"
document.getElementById('loadBtn').addEventListener('click', function() {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = '.csv';
    inputFile.style.display = 'none';
    document.body.appendChild(inputFile);
    inputFile.click();

    inputFile.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById('filePath').value = file.name; // Muestra el nombre del archivo en el textbox
            readCSVFile(file); // Llama a la función para leer el archivo CSV
        }
    });
});

// Función para leer el archivo CSV y llenar la tabla
function readCSVFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const csvData = event.target.result;
        parseCSV(csvData); // Llamar a la función para analizar los datos CSV
    };
    
    reader.readAsText(file);
}

// Función para analizar los datos CSV y crear los objetos Lead
function parseCSV(csvData) {
    Papa.parse(csvData, {
        complete: function(results) {
            leads = []; // Limpiar el arreglo de leads antes de llenarlo

            results.data.forEach(function(row) {
                if (row.length >= 4) {
                    const lead = new Lead(row[0], row[1], row[2], row[3]);
                    leads.push(lead);
                }
            });
            
            localStorage.setItem("leads", JSON.stringify(leads));
            updateTable(); // Llamar a la función para actualizar la tabla
        },
        header: false
    });
}

// Función para actualizar la tabla con los datos de los leads
function updateTable() {
    const tableBody = document.getElementById('leadTableBody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos datos

    leads.forEach(function(lead) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.nombre}</td>
            <td>${lead.apellido}</td>
            <td>${lead.correo}</td>
            <td>${lead.whatsapp}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para redirigir al usuario al presionar el botón "Home"
document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirige a la misma página
});
