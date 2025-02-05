document.getElementById('excel-file').addEventListener('change', function (e) {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (!file) return; // Si no hay archivo seleccionado, salir de la función

    const reader = new FileReader(); // Crear un nuevo objeto FileReader para leer el archivo
    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result); // Convertir el contenido del archivo a un array de bytes
        const workbook = XLSX.read(data, { type: 'array' }); // Leer el archivo Excel como un libro de trabajo

        const sheetName = workbook.SheetNames[0]; // Selecciona la primera hoja del libro de trabajo
        const sheet = workbook.Sheets[sheetName]; // Accede a la hoja por su nombre

        globalData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convierte la hoja a un arreglo de objetos JSON, con la primera fila como encabezado

        // Si los datos están vacíos o no son válidos, muestra una alerta y detiene la ejecución
        if (globalData.length === 0) {
            alert("El archivo Excel está vacío o no es válido.");
            return;
        }

        renderTable(globalData); // Llama a la función para renderizar la tabla con los datos obtenidos
    };

    reader.readAsArrayBuffer(file); // Lee el archivo como un array de bytes (para archivos Excel)
});