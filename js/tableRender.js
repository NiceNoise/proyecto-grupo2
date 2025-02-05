// Función para renderizar la tabla con los datos proporcionados
function renderTable(data) {
    const table = document.getElementById("data-table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    thead.innerHTML = ""; // Limpiar encabezado
    tbody.innerHTML = ""; // Limpiar cuerpo de la tabla

    if (data.length === 0) return; // Si no hay datos, no hacer nada

    // Crear encabezados manualmente
    const headerRow = document.createElement("tr");
    const headers = ["Id", "Name", "Last Name", "Email", "Whatsapp", "Funnel", "Course", "Actions"];

    // Crear y agregar cada celda de encabezado
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow); // Agregar fila de encabezados a la tabla

    // Listas de opciones para "Funnel" y "Course"
    const cursosDisponibles = ["HTML", "CSS", "JavaScript", "Java"];
    const estadosDisponibles = ["Inicio", "En progreso", "Terminado"];

    // Crear filas de datos
    data.forEach((rowData, rowIndex) => {
        const row = document.createElement("tr");

        // Rellenar las celdas con los datos, incluyendo la columna Id generada
        let idCell = document.createElement("td");
        idCell.textContent = rowIndex + 1; // Genera el Id secuencial
        row.appendChild(idCell);

        rowData.forEach((cellData, cellIndex) => {
            const td = document.createElement("td");
            td.textContent = cellData;
            row.appendChild(td);
        });

        // Agregar celdas con listas desplegables para "Funnel" y "Course"
        let funnelCell = document.createElement("td");
        const funnelSelect = document.createElement("select");
        estadosDisponibles.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            funnelSelect.appendChild(option);
        });
        funnelCell.appendChild(funnelSelect);
        row.appendChild(funnelCell);

        let courseCell = document.createElement("td");
        const courseSelect = document.createElement("select");
        cursosDisponibles.forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });
        courseCell.appendChild(courseSelect);
        row.appendChild(courseCell);

        // Crear botones de acción (Editar y Eliminar)
        const actionTd = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.className = "btn btn-warning";
        editBtn.addEventListener("click", () => openEditModal(rowIndex, row));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.className = "btn btn-danger";
        deleteBtn.addEventListener("click", () => deleteRow(rowIndex));

        actionTd.appendChild(editBtn);
        actionTd.appendChild(deleteBtn);
        row.appendChild(actionTd);

        tbody.appendChild(row); // Agregar la fila de datos a la tabla
    });
}

// Función para abrir el modal y rellenar los campos con los datos existentes
function openEditModal(rowIndex, row) {
    const cells = row.querySelectorAll("td");

    // Rellenar los campos del modal con los valores de la fila seleccionada
    document.getElementById("name").value = cells[1].textContent;
    document.getElementById("lastName").value = cells[2].textContent;
    document.getElementById("email").value = cells[3].textContent;
    document.getElementById("whatsapp").value = cells[4].textContent;

    // Rellenar el campo "Funnel" con la opción seleccionada
    const funnelSelect = cells[5].querySelector("select");
    document.getElementById("funnel").value = funnelSelect.value;

    // Rellenar el campo "Course" con la opción seleccionada
    const courseSelect = cells[6].querySelector("select");
    document.getElementById("course").value = courseSelect.value;

    // Mostrar el modal
    const modal = document.getElementById("editModal");
    modal.style.display = "block";

    // Guardar cambios al hacer clic en "Guardar Cambios"
    document.getElementById("saveChanges").onclick = function () {
        saveRow(rowIndex); // Guardar los cambios de la fila editada
    };
}

// Función para guardar los cambios realizados en el modal
function saveRow(rowIndex) {
    const row = document.querySelectorAll("#data-table tbody tr")[rowIndex];
    const cells = row.querySelectorAll("td");

    // Actualizar las celdas de la fila con los nuevos valores del modal
    cells[1].textContent = document.getElementById("name").value;
    cells[2].textContent = document.getElementById("lastName").value;
    cells[3].textContent = document.getElementById("email").value;
    cells[4].textContent = document.getElementById("whatsapp").value;

    // Actualizar el valor del "Funnel"
    const funnelSelect = document.getElementById("funnel");
    cells[5].textContent = funnelSelect.value;

    // Actualizar el valor del "Course"
    const courseSelect = document.getElementById("course");
    cells[6].textContent = courseSelect.value;

    // Ocultar el modal después de guardar
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

// Función para eliminar una fila
function deleteRow(index) {
    globalData.splice(index, 1); // Elimina la fila del array de datos
    renderTable(globalData); // Renderiza nuevamente la tabla sin la fila eliminada
}

// Cerrar el modal si se hace clic en la "X" o fuera del modal
document.querySelector(".close").onclick = function () {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById("editModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
