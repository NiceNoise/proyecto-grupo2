document.getElementById('excel-file').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0]; // Selecciona la primera hoja
        const sheet = workbook.Sheets[sheetName];

        globalData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (globalData.length === 0) {
            alert("El archivo Excel está vacío o no es válido.");
            return;
        }

        renderTable(globalData);
    };

    reader.readAsArrayBuffer(file);
});
