// Función constructora para el objeto Lead
function Lead(nombre, apellido, correo, whatsapp, funnel = 0, curso = '') {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.whatsapp = whatsapp;
    this.funnel = funnel;
    this.curso = curso;
}