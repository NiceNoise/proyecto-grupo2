function editRow(identifier) {
    // Obtener datos desde localStorage
    const tableData = JSON.parse(localStorage.getItem("leads")) || [];
    let rowData = null;
    let index = -1;

    // Buscar por ID si identifier es un string o número en formato string
    if (typeof identifier === "string" || typeof identifier === "number") {
        index = tableData.findIndex(item => item.id == identifier);
        if (index !== -1) {
            rowData = tableData[index];
        }
    }
    // Buscar por índice si identifier es un número y no se encontró por ID
    if (index === -1 && typeof identifier === "number" && identifier >= 0 && identifier < tableData.length) {
        index = identifier;
        rowData = tableData[index];
    }

    // Si no se encuentra la fila, mostrar alerta y salir
    if (!rowData) {
        alert("No se encontró la fila para editar.");
        return;
    }

    // Obtener elementos del formulario
    const editIndex = document.getElementById("editIndex");
    const editId = document.getElementById("editId");
    const editName = document.getElementById("editName");
    const editLastName = document.getElementById("editLastName");
    const editEmail = document.getElementById("editEmail");
    const editWhatsapp = document.getElementById("editWhatsapp");
    const editFunnel = document.getElementById("editFunnel");
    const editCourse = document.getElementById("editCourse");
    const modalElement = document.getElementById("editModal");

    // Validar que los elementos existen antes de continuar
    if (!modalElement || !editIndex || !editId || !editName || !editLastName || !editEmail || !editWhatsapp || !editFunnel || !editCourse) {
        alert("Error: No se pudieron cargar los campos del formulario. Por favor, recarga la página.");
        console.error("Error: No se encontraron algunos elementos del modal.");
        return;
    }

    // Guardar el índice en un campo oculto
    editIndex.value = index;

    // Llenar los campos con los datos actuales de la fila
    editId.value = rowData.id || "";
    editName.value = rowData.name || "";
    editLastName.value = rowData.lastName || "";
    editEmail.value = rowData.email || "";
    editWhatsapp.value = rowData.whatsapp || "";
    editFunnel.value = rowData.funnel || "";
    editCourse.value = rowData.course || "";

    // Crear instancia del modal
    let editModal;
    try {
        editModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    } catch (error) {
        console.error("Error al inicializar el modal:", error);
        alert("Error al abrir el formulario de edición. Por favor, recarga la página.");
        return;
    }

    // Limpiar eventos previos del modal antes de agregar uno nuevo
    function handleFocusFirstField() {
        if (!editId.disabled && !editId.readOnly) {
            editId.focus();
        } else {
            editName.focus();
        }
    }

    modalElement.removeEventListener("shown.bs.modal", handleFocusFirstField);
    modalElement.addEventListener("shown.bs.modal", handleFocusFirstField, { once: true });

    // Mostrar el modal
    editModal.show();
}