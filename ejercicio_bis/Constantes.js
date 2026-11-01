// Valores permitidos según el enunciado del práctico.
// En el JSON el estado se guarda en inglés (PENDING, etc.),
// pero al usuario le mostramos el nombre en español.
export const ESTADOS = {
    "PENDING": "Pendiente",
    "IN-PROGRESS": "En curso",
    "FINISHED": "Terminada",
    "CANCELED": "Cancelada"
};

// En el JSON la dificultad es un número (1, 2 o 3).
// Las estrellas son solo una forma de mostrarlo en pantalla.
export const ESTRELLAS = {
    1: "⭐ ☆ ☆",
    2: "⭐ ⭐ ☆",
    3: "⭐ ⭐ ⭐"
};