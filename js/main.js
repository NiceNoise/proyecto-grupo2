let users = []; // Almacena los usuarios cargados

document.addEventListener("DOMContentLoaded", () => {
    loadCSVData(); // Cargar datos desde localStorage o predefinidos

    // Escuchar el evento de selección de archivo CSV
    document.getElementById("csvFileInput").addEventListener("change", handleFileSelect, false);

    // Delegar eventos en la tabla para editar y eliminar
    document.querySelector("#usersTable").addEventListener("click", function (event) {
        const id = parseInt(event.target.getAttribute("data-id"));
        if (event.target.classList.contains("btn-editar")) editUser(id);
        if (event.target.classList.contains("btn-eliminar")) deleteUser(id);
    });

    // Manejar el guardado de cambios en el modal de edición
    document.getElementById("saveChangesBtn").addEventListener("click", saveUserChanges);

    // Escuchar evento de búsqueda
    document.getElementById("searchInput").addEventListener("input", filterUsers);
});

// Filtrar usuarios en la tabla
function filterUsers() {
    let filter = this.value.toLowerCase();
    document.querySelectorAll("#usersTable tbody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
}

// Manejar la carga del archivo CSV
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            users = parseCSV(e.target.result);
            saveToLocalStorage(); // Guardar en localStorage
            loadUsers(users);
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, selecciona un archivo CSV válido.");
    }
}

// Convertir CSV en un array de usuarios
function parseCSV(csvText) {
    return csvText.split("\n").filter(row => row.trim() !== "").map(row => {
        const cols = row.split(",").map(col => col.trim());
        return {
            code: generateCode(),
            nombre: cols[0] || "",
            apellido: cols[1] || "",
            correo: cols[2] || "",
            whatsapp: cols[3] || "",
            funnel: cols[4] || "Funnel process",
            course: cols[5] || "Course process"
        };
    });
}

// Generar un código único de usuario
function generateCode() {
    return Math.floor(Math.random() * 100000);
}

// Cargar los usuarios en la tabla
function loadUsers(users) {
    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.code}</td>
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.correo}</td>
            <td>${user.whatsapp}</td>
            <td>${user.funnel}</td>
            <td>${user.course}</td>
            <td>
                <button class="btn btn-warning btn-editar" data-id="${user.code}">Editar</button>
                <button class="btn btn-danger btn-eliminar" data-id="${user.code}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Guardar en localStorage
function saveToLocalStorage() {
    localStorage.setItem("usersData", JSON.stringify(users));
}

// Cargar datos guardados en localStorage
function loadCSVData() {
    const savedUsers = localStorage.getItem("usersData");
    if (savedUsers) {
        users = JSON.parse(savedUsers);
        loadUsers(users);
    }
}

// Abrir el modal de edición con datos del usuario
function editUser(code) {
    const user = users.find(u => u.code === code);
    if (user) {
        const editModal = new bootstrap.Modal(document.getElementById("editModal"));
        editModal.show();

        // Rellenar los campos del modal
        document.getElementById("nameInput").value = user.nombre;
        document.getElementById("lastnameInput").value = user.apellido;
        document.getElementById("emailInput").value = user.correo;
        document.getElementById("whatsappInput").value = user.whatsapp;
        document.getElementById("funnelInput").value = user.funnel;
        document.getElementById("coursesInput").value = user.course;

        // Guardar el código del usuario en el modal
        document.getElementById("saveChangesBtn").setAttribute("data-id", user.code);
    }
}

// Guardar los cambios de un usuario editado
function saveUserChanges() {
    const id = parseInt(document.getElementById("saveChangesBtn").getAttribute("data-id"));
    const user = users.find(u => u.code === id);
    if (user) {
        user.nombre = document.getElementById("nameInput").value;
        user.apellido = document.getElementById("lastnameInput").value;
        user.correo = document.getElementById("emailInput").value;
        user.whatsapp = document.getElementById("whatsappInput").value;
        user.funnel = document.getElementById("funnelInput").value;
        user.course = document.getElementById("coursesInput").value;

        saveToLocalStorage(); // Guardar cambios en localStorage
        loadUsers(users);

        // Cerrar el modal
        bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    }
}

// Eliminar un usuario
function deleteUser(code) {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        users = users.filter(user => user.code !== code);
        saveToLocalStorage(); // Guardar cambios en localStorage
        loadUsers(users);
    }
}
