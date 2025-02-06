// Store users
let users = [];

// Load data when the page is ready
document.addEventListener("DOMContentLoaded", () => {
    loadCSVData(); // Load data from localStorage or predefined

    // Listen for CSV file selection
    document.getElementById("csvFileInput").addEventListener("change", handleFileSelect, false);

    // Delegate events for editing and deleting users
    document.querySelector("#usersTable").addEventListener("click", function (event) {
        const id = parseInt(event.target.getAttribute("data-id"));
        if (event.target.classList.contains("btn-editar")) editUser(id);
        if (event.target.classList.contains("btn-eliminar")) deleteUser(id);
    });

    // Handle saving changes in edit modal
    document.getElementById("saveChangesBtn").addEventListener("click", saveUserChanges);

    // Listen for search input
    document.getElementById("searchInput").addEventListener("input", filterUsers);
});

// Filter users in the table
function filterUsers() {
    let filter = this.value.toLowerCase();
    document.querySelectorAll("#usersTable tbody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
}

// Handle CSV file upload
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            users = parseCSV(e.target.result);
            saveToLocalStorage(); // Save to localStorage
            loadUsers(users);
        };
        reader.readAsText(file);
    } else {
        alert("Please select a valid CSV file.");
    }
}

// Convert CSV text to an array of users
function parseCSV(csvText) {
    return csvText.split("\n").filter(row => row.trim() !== "").map(row => {
        const cols = row.split(",").map(col => col.trim());
        return {
            code: generateCode(),
            firstName: cols[0] || "",
            lastName: cols[1] || "",
            email: cols[2] || "",
            whatsapp: cols[3] || "",
            funnel: cols[4] || "Funnel process",
            course: cols[5] || "Course process"
        };
    });
}

// Generate sequential user code
function generateCode() {
    let lastCode = localStorage.getItem("lastUserCode");
    let newCode = lastCode ? parseInt(lastCode) + 1 : 25001;
    localStorage.setItem("lastUserCode", newCode);
    return newCode;
}

// Load users into the table
function loadUsers(users) {
    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = ""; // Clear table

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.code}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.whatsapp}</td>
            <td>${user.funnel}</td>
            <td>${user.course}</td>
            <td>
                <button class="btn btn-warning btn-editar" data-id="${user.code}">Edit</button>
                <button class="btn btn-danger btn-eliminar" data-id="${user.code}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Save users to localStorage
function saveToLocalStorage() {
    localStorage.setItem("usersData", JSON.stringify(users));
}

// Load saved data from localStorage
function loadCSVData() {
    const savedUsers = localStorage.getItem("usersData");
    if (savedUsers) {
        users = JSON.parse(savedUsers);
        loadUsers(users);
    }
}

// Open edit modal with user data
function editUser(code) {
    const user = users.find(u => u.code === code);
    if (user) {
        const editModal = new bootstrap.Modal(document.getElementById("editModal"));
        editModal.show();

        // Fill modal fields
        document.getElementById("nameInput").value = user.firstName;
        document.getElementById("lastnameInput").value = user.lastName;
        document.getElementById("emailInput").value = user.email;
        document.getElementById("whatsappInput").value = user.whatsapp;
        document.getElementById("funnelInput").value = user.funnel;
        document.getElementById("coursesInput").value = user.course;

        // Store user code in modal
        document.getElementById("saveChangesBtn").setAttribute("data-id", user.code);
    }
}

// Save changes of an edited user
function saveUserChanges() {
    const id = parseInt(document.getElementById("saveChangesBtn").getAttribute("data-id"));
    const user = users.find(u => u.code === id);
    if (user) {
        user.firstName = document.getElementById("nameInput").value;
        user.lastName = document.getElementById("lastnameInput").value;
        user.email = document.getElementById("emailInput").value;
        user.whatsapp = document.getElementById("whatsappInput").value;
        user.funnel = document.getElementById("funnelInput").value;
        user.course = document.getElementById("coursesInput").value;

        saveToLocalStorage(); // Save changes to localStorage
        loadUsers(users);

        // Close modal
        bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    }
}

// Delete a user
function deleteUser(code) {
    if (confirm("Are you sure you want to delete this user?")) {
        users = users.filter(user => user.code !== code);
        saveToLocalStorage(); // Save changes to localStorage
        loadUsers(users);
    }
}
