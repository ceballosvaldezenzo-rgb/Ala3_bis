// Formato de fecha que usa tasks.json: "2025-10-15T23:59:00"
const FORMATO_JSON = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

// Devuelve true si el texto tiene el formato del JSON y es una fecha real
export function esFechaValida(texto) {
    if (typeof texto !== "string" || !FORMATO_JSON.test(texto)) {
        return false;
    }
    return !isNaN(new Date(texto)); // new Date("fecha rara") da "Invalid Date"
}

// Agrega un cero adelante si hace falta: 5 -> "05"
function dosDigitos(n) {
    return String(n).padStart(2, "0");
}

// Devuelve la fecha y hora de ahora con el formato del JSON
export function fechaActual() {
    const d = new Date();
    return d.getFullYear() + "-" + dosDigitos(d.getMonth() + 1) + "-" + dosDigitos(d.getDate()) +
           "T" + dosDigitos(d.getHours()) + ":" + dosDigitos(d.getMinutes()) + ":" + dosDigitos(d.getSeconds());
}

// Convierte lo que escribe el usuario ("dd/mm/aaaa") al formato del JSON.
// Como el usuario no ingresa hora, usamos 23:59 (igual que las tareas del archivo).
export function ddmmaaaaAJson(fechav) {
    const dia = fechav.slice(0, 2);
    const mes = fechav.slice(3, 5);
    const año = fechav.slice(6, 10);
    return año + "-" + mes + "-" + dia + "T23:59:00";
}

// Convierte la fecha del JSON a algo legible para mostrar en pantalla.
// Si la fecha es null devuelve el texto que le pasemos.
export function jsonALegible(fechaJson, sinFecha = "Sin fecha") {
    if (fechaJson === null) {
        return sinFecha;
    }
    return new Date(fechaJson).toLocaleString();
}