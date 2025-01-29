## **Historia de Usuario: Cargar leads desde un archivo CSV**

### Tareas

1. **Diseñar y desarrollar el formulario de carga de archivos:**
   - Crear un componente frontend para subir archivos CSV.
   - Asegurar que el formulario permita seleccionar y enviar archivos.

2. **Implementar el validador de CSV:**
   - Validar que el archivo tenga el formato correcto (columnas: nombre, apellido, correo, WhatsApp).
   - Mostrar mensajes de error si el archivo no cumple con el formato esperado.

3. **Integrar con el backend para procesar el archivo:**
   - Crear un endpoint en el backend para recibir y procesar el archivo CSV.
   - Parsear el archivo CSV y validar los datos antes de almacenarlos.

4. **Almacenar los datos en la tabla de usuarios:**
   - Crear o actualizar el modelo de datos `Lead` en la base de datos.
   - Guardar los datos de los leads en la tabla correspondiente.

5. **Mostrar confirmación o error al usuario:**
   - Notificar al usuario si la carga fue exitosa o si hubo errores.

---

## **Historia de Usuario: Enviar mensajes predeterminados en WhatsApp**

### Tareas

1. **Desarrollar el botón de envío de mensajes:**
   - Crear un botón en la interfaz de usuario para enviar mensajes a un lead seleccionado.

2. **Integrar con la API de WhatsApp:**
   - Configurar la integración con la API de WhatsApp para abrir el chat con un mensaje predefinido.
   - Asegurar que el mensaje predeterminado se cargue correctamente.

3. **Implementar el editor de mensajes:**
   - Permitir al usuario editar el mensaje predeterminado antes de enviarlo.
   - Validar que el mensaje editado se envíe correctamente.

4. **Probar la funcionalidad completa:**
   - Verificar que el flujo de envío de mensajes funcione correctamente en diferentes escenarios.

---

## **Historia de Usuario: Etiquetar leads según su etapa en el funnel**

### Tareas

1. **Diseñar el menú de etiquetas:**
   - Crear un menú en la interfaz de usuario para seleccionar etiquetas.
   - Incluir opciones como "Contactado" y "Interesado en curso".

2. **Implementar el selector de cursos:**
   - Permitir al usuario asociar un lead con un curso específico.

3. **Actualizar la base de datos con las etiquetas:**
   - Modificar el modelo de datos `Lead` para incluir las etiquetas.
   - Guardar las etiquetas asignadas en la base de datos.

4. **Mostrar las etiquetas en la interfaz de usuario:**
   - Actualizar la tabla de usuarios para reflejar las etiquetas asignadas.

---

## **Historia de Usuario: Ver estadísticas de mensajes enviados**

### Tareas

1. **Diseñar la página de estadísticas:**
   - Crear una página en la interfaz de usuario para mostrar gráficos y datos.

2. **Implementar gráficos interactivos:**
   - Usar una librería de gráficos (como Chart.js o D3.js) para mostrar el número de mensajes enviados y respuestas recibidas.

3. **Agregar filtros de fecha:**
   - Permitir al usuario seleccionar un rango de fechas para filtrar los datos.

4. **Consultar la base de datos para generar reportes:**
   - Crear consultas en el backend para obtener los datos de mensajes y respuestas.
   - Mostrar los datos en tiempo real en los gráficos.

---

## **Historia de Usuario: Crear y editar plantillas de mensajes**

### Tareas

1. **Diseñar el formulario de creación/edición de plantillas:**
   - Crear un formulario para ingresar el contenido de la plantilla y seleccionar la etapa del funnel.

2. **Validar el contenido de la plantilla:**
   - Asegurar que el contenido no esté vacío y cumpla con los requisitos mínimos.

3. **Guardar las plantillas en la base de datos:**
   - Crear o actualizar el modelo de datos `PlantillaMensaje`.
   - Almacenar las plantillas en la base de datos.

4. **Mostrar la lista de plantillas disponibles:**
   - Crear una sección en la interfaz de usuario para listar las plantillas existentes.

---

## **Historia de Usuario: Registrar mensajes enviados automáticamente**

### Tareas

1. **Implementar el registro de mensajes:**
   - Crear un modelo de datos `Mensaje` para almacenar el historial de mensajes enviados.

2. **Integrar con la API de WhatsApp:**
   - Registrar automáticamente los mensajes enviados en la base de datos.
   - Manejar errores y notificar al usuario si el mensaje no se pudo enviar.

3. **Mostrar notificaciones de errores:**
   - Notificar al usuario si ocurre un error durante el envío del mensaje.

4. **Probar la funcionalidad completa:**
   - Verificar que los mensajes se registren correctamente en el historial del lead.