import { ESTADOS } from './constantes.js';
import { esFechaValida } from './fechas.js';

// Revisa UNA tarea y devuelve una lista con los problemas que encontró.
// Si la lista queda vacía, la tarea es válida.
export function validarTarea(t) {
    const errores = [];

    // Primero: ¿es realmente un objeto? (evita errores si hay un null o un número en el array)
    if (typeof t !== "object" || t === null || Array.isArray(t)) {
        return ["no es un objeto"];
    }

    // CAMPOS OBLIGATORIOS: titulo y creacion
    if (typeof t.titulo !== "string" || t.titulo.trim() === "") {
        errores.push("titulo obligatorio (texto no vacío)");
    }
    if (!esFechaValida(t.creacion)) {
        errores.push("creacion obligatoria (fecha válida)");
    }

    // CAMPOS OPCIONALES: pueden ser null, pero si tienen valor, el valor tiene que ser correcto
    if (t.descripcion !== null && typeof t.descripcion !== "string") {
        errores.push("descripcion debe ser texto o null");
    }
    if (t.ultimaEdicion !== null && !esFechaValida(t.ultimaEdicion)) {
        errores.push("ultimaEdicion debe ser fecha válida o null");
    }
    if (t.vencimiento !== null && !esFechaValida(t.vencimiento)) {
        errores.push("vencimiento debe ser fecha válida o null");
    }

    // CAMPOS CON VALORES FIJOS
    if (!Object.keys(ESTADOS).includes(t.estado)) {
        errores.push("estado debe ser PENDING, IN-PROGRESS, FINISHED o CANCELED");
    }
    if (![1, 2, 3].includes(t.dificultad)) {
        errores.push("dificultad debe ser 1, 2 o 3");
    }

    return errores;
}