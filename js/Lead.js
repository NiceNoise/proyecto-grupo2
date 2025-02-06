// Función constructora para el objeto Lead
function Lead(id,nombre, apellido, correo, whatsapp, funnel = 1, curso = 0) {
    this.id=id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.whatsapp = whatsapp;
    this.funnel = funnel;
    this.curso = curso;
}