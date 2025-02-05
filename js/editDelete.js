// js/ui.js
import { usuarios, plantillas, registros } from './storage.js'; // Importar datos desde el módulo 'storage.js'

// Función para renderizar la lista de usuarios en la tabla
export function renderizarUsuarios() {
    const tbody = document.querySelector("#usuarios tbody"); // Seleccionar el cuerpo de la tabla de usuarios
    tbody.innerHTML = ""; // Limpiar el contenido de la tabla antes de renderizar nuevos datos
    usuarios.forEach(usuario => { // Iterar sobre el array de usuarios
        const row = document.createElement("tr"); // Crear una nueva fila para la tabla
        row.innerHTML = `
            <td>${usuario.nombre}</td> <!-- Mostrar el nombre del usuario -->
            <td>${usuario.apellido}</td> <!-- Mostrar el apellido del usuario -->
            <td>${usuario.whatsapp}</td> <!-- Mostrar el número de WhatsApp -->
            <td>${usuario.correo}</td> <!-- Mostrar el correo electrónico -->
            <td>${usuario.curso || "Curso: No especificado"}</td> <!-- Mostrar el curso del usuario, o un mensaje predeterminado si no está especificado -->
            <td>${usuario.estado || "Estado: No especificado"}</td> <!-- Mostrar el estado del usuario, o un mensaje predeterminado si no está especificado -->
            <td>
                <!-- Botones para editar y eliminar el usuario -->
                <button class="btn btn-warning btn-sm" onclick="cargarDatosEditar('${usuario.nombre}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.nombre}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row); // Añadir la fila creada al cuerpo de la tabla
    });
}

// Función para renderizar la lista de plantillas en la tabla
export function renderizarPlantillas() {
    const tbody = document.querySelector("#plantillas tbody"); // Seleccionar el cuerpo de la tabla de plantillas
    tbody.innerHTML = ""; // Limpiar el contenido de la tabla antes de renderizar nuevos datos
    plantillas.forEach(plantilla => { // Iterar sobre el array de plantillas
        const row = document.createElement("tr"); // Crear una nueva fila para la tabla
        row.innerHTML = `
            <td>${plantilla.nombre}</td> <!-- Mostrar el nombre de la plantilla -->
            <td>${plantilla.mensaje}</td> <!-- Mostrar el mensaje de la plantilla -->
            <td>
                <!-- Botones para editar y eliminar la plantilla -->
                <button class="btn btn-warning btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row); // Añadir la fila creada al cuerpo de la tabla
    });
}

// Función para renderizar la lista de registros en la tabla
export function renderizarRegistros() {
    const tbody = document.getElementById("registrosTableBody"); // Seleccionar el cuerpo de la tabla de registros
    tbody.innerHTML = ""; // Limpiar el contenido de la tabla antes de renderizar nuevos datos
    registros.forEach(registro => { // Iterar sobre el array de registros
        const row = document.createElement("tr"); // Crear una nueva fila para la tabla
        row.innerHTML = `
            <td>${registro.nombre}</td> <!-- Mostrar el nombre del registro -->
            <td>${registro.nombrePlantilla}</td> <!-- Mostrar el nombre de la plantilla asociada al registro -->
            <td>${registro.mensaje}</td> <!-- Mostrar el mensaje del registro -->
        `;
        tbody.appendChild(row); // Añadir la fila creada al cuerpo de la tabla
    });
}