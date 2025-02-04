// Función para guardar los cambios realizados en el formulario de edición
function saveChanges() {
    // Obtener los valores del formulario de edición
    const id = document.getElementById("editId").value;
    const name = document.getElementById("editName").value;
    const lastName = document.getElementById("editLastName").value;
    const email = document.getElementById("editEmail").value;
    const whatsapp = document.getElementById("editWhatsapp").value;
    const funnel = document.getElementById("editFunnel").value;
    const course = document.getElementById("editCourse").value;

    // Obtener los datos de la tabla desde el localStorage (si no existen, inicializar como un array vacío)
    const tableData = JSON.parse(localStorage.getItem("tableData")) || [];

    // Verificar si el ID es nuevo o no existe en la tabla. Si es así, agregar una nueva fila
    if (id === '' || isNaN(id) || id >= tableData.length) {
        tableData.push({ id: tableData.length, name, lastName, email, whatsapp, funnel, course });
    } else {
        // Si el ID ya existe, actualizar los datos correspondientes
        tableData[id] = { id, name, lastName, email, whatsapp, funnel, course };
    }

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem("tableData", JSON.stringify(tableData));
    
    // Recargar la tabla con los nuevos datos
    renderTable();
    
    // Limpiar el formulario después de guardar los cambios
    clearForm();
}

// Función para limpiar los campos del formulario de edición
function clearForm() {
    // Limpiar todos los campos del formulario
    document.getElementById("editId").value = '';
    document.getElementById("editName").value = '';
    document.getElementById("editLastName").value = '';
    document.getElementById("editEmail").value = '';
    document.getElementById("editWhatsapp").value = '';
    document.getElementById("editFunnel").value = '';
    document.getElementById("editCourse").value = '';
}

// Función para cargar los datos almacenados en la tabla desde el localStorage
function loadTableData() {
    // Obtener los datos de la tabla desde el localStorage (si no existen, inicializar como un array vacío)
    const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    
    // Seleccionar el cuerpo de la tabla donde se mostrarán los datos
    const tableBody = document.getElementById("dataTable");
    
    // Limpiar la tabla antes de cargar nuevos datos
    tableBody.innerHTML = "";

    // Recorrer los datos de la tabla y generar las filas en HTML
    tableData.forEach((row, index) => {
        const rowHTML = `<tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.lastName}</td>
            <td>${row.email}</td>
            <td>${row.whatsapp}</td>
            <td>${row.funnel}</td>
            <td>${row.course}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editRow(${index})">Edit</button></td>
        </tr>`;
        // Insertar la fila generada en el cuerpo de la tabla
        tableBody.insertAdjacentHTML("beforeend", rowHTML);
    });
}

// Función que se ejecuta cuando la página se carga
window.onload = function () {
    // Cargar los datos de la tabla desde el localStorage
    loadTableData();
};
