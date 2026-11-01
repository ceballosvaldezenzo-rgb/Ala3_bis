import fs from 'fs/promises';

// Escribe las tareas en tasks.json.
//   arreglo:   las tareas válidas (las que se pueden agregar y editar)
//   invalidas: las tareas que no pasaron la validación al cargar.
//              Se vuelven a escribir sin tocarlas, para no perder datos.
export async function guardarTareas(arreglo, invalidas = [], ruta = 'tasks.json') {
    try {
        // Junto las dos listas en un solo array
        const todas = [...arreglo, ...invalidas];

        // JSON.stringify convierte el array en texto.
        // El "2" indica que se indente con 2 espacios (igual que el archivo original).
        // Los valores null se escriben como null, así que se conservan tal cual.
        const texto = JSON.stringify(todas, null, 2);

        await fs.writeFile(ruta, texto, 'utf-8');
        console.log("Cambios guardados en " + ruta + " (" + todas.length + " tareas)");
    } catch (error) {
        console.log("No se pudo guardar " + ruta + ": " + error.message);
    }
}
