import fs from 'fs/promises';
import { validarTarea } from './Validar.js';

// Lee tasks.json, valida cada tarea y devuelve un objeto con dos listas:
//   tareas:    las tareas válidas (con las que trabaja el programa)
//   invalidas: las tareas que no pasaron la validación (se guardan aparte para no perderlas)
// Devuelve null si el archivo existe pero no se puede usar (así main.js no lo pisa).
export async function cargarTareas(ruta = 'tasks.json') {
    let texto;

    // PASO 1: leer el archivo como texto
    try {
        texto = await fs.readFile(ruta, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            // ENOENT = "Error NO ENTry": el archivo no existe
            console.log("No se encontró " + ruta + ". Se empieza con una lista vacía.");
            return { tareas: [], invalidas: [] };
        }
        console.log("No se pudo leer " + ruta + ": " + error.message);
        return null;
    }

    // PASO 2: convertir el texto en un array de JavaScript
    let datos;
    try {
        datos = JSON.parse(texto);
    } catch (error) {
        // SyntaxError: al JSON le falta una coma, una llave, etc.
        console.log("El archivo " + ruta + " está mal formado: " + error.message);
        return null;
    }

    // El enunciado dice que el archivo es un array
    if (!Array.isArray(datos)) {
        console.log("El archivo " + ruta + " debería contener un array de tareas.");
        return null;
    }

    // PASO 3: validar cada tarea y separar las buenas de las malas
    const validas = [];
    const invalidas = [];
    for (let i = 0; i < datos.length; i++) {
        const errores = validarTarea(datos[i]);
        if (errores.length === 0) {
            validas.push(datos[i]);
        } else {
            invalidas.push(datos[i]);
            console.log("Tarea en posición " + (i + 1) + " inválida: " + errores.join("; "));
        }
    }

    // PASO 4: resumen
    console.log("\n--- Resumen de carga ---");
    console.log("Tareas leídas:     " + datos.length);
    console.log("Tareas cargadas:   " + validas.length);
    console.log("Tareas inválidas:  " + invalidas.length);
    if (invalidas.length > 0) {
        console.log("(Las inválidas no se pueden usar, pero se conservan sin cambios al guardar)");
    }
    console.log("");

    return { tareas: validas, invalidas: invalidas };
}