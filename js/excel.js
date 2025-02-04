let data = []; // Array que contendrá los datos del archivo

// Función para cargar y procesar el archivo CSV
function loadFile(event) {
    const file = event.target.files[0]; // Obtenemos el archivo
    if (!file) return; // Si no hay archivo, salir

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result; // Contenido del archivo CSV

        // Procesar el contenido del CSV y convertirlo en un array de objetos
        const lines = fileContent.split("\n").map(line => line.split(",").map(value => value.trim()));

        // Crear un array de objetos desde las filas
        data = lines.slice(1).map((line, index) => ({
            id: (index + 1).toString(),
            name: line[0] || '',
            lastName: line[1] || '',
            email: line[2] || '',
            whatsapp: line[3] || '',
            funnel: line[4] || '',
            course: line[5] || ''
        }));

        // Mostrar los datos en la tabla
        displayData(data);
    };
    reader.readAsText(file); // Leer archivo como texto
}
