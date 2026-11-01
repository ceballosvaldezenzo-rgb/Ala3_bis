# Organizador de tareas (Node.js)

Programa de consola para gestionar una lista de tareas. Las tareas se **leen** y se **guardan** en un archivo JSON (`tasks.json`), por lo que no se pierden al cerrar el programa.

Está dividido en módulos usando `import` / `export` (ES Modules).

## Funcionalidades

- Cargar las tareas desde `tasks.json` al iniciar, validando cada una y mostrando un resumen.
- Agregar tareas nuevas.
- Ver las tareas (todas o filtradas por estado) y editarlas.
- Buscar tareas por una palabra o frase del título.
- Editar una tarea eligiéndola por su número (índice).
- Guardar automáticamente los cambios en `tasks.json`, conservando los campos `null`.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior.

No hay dependencias que instalar.

## Cómo ejecutarlo

1. Abrí una terminal **dentro de la carpeta del proyecto** (donde están `main.js`, `package.json` y `tasks.json`).
2. Ejecutá:

```
node main.js
```

Al iniciar se muestra el resumen de carga:

```
--- Resumen de carga ---
Tareas leídas:     100
Tareas cargadas:   100
Tareas inválidas:  0
```

## Menú principal

| Opción | Acción |
|---|---|
| 1 | Agregar una tarea |
| 2 | Mostrar las tareas (todas, o por estado) y editarlas |
| 3 | Buscar tareas por título |
| 4 | Editar una tarea por su número |
| 5 | Salir |

El número de tarea que se usa en la opción 4 es el mismo `[n]` que se ve en las opciones 2 y 3.

## Formato de `tasks.json`

El archivo es un array de objetos con esta estructura:

```json
{
  "titulo": "string",
  "descripcion": "string | null",
  "estado": "PENDING | IN-PROGRESS | FINISHED | CANCELED",
  "creacion": "2025-10-01T09:00:00",
  "ultimaEdicion": "2025-10-01T09:00:00 | null",
  "vencimiento": "2025-10-15T23:59:00 | null",
  "dificultad": 1
}
```

- **Obligatorios:** `titulo` y `creacion`.
- **Opcionales (pueden ser `null`):** `descripcion`, `ultimaEdicion` y `vencimiento`.
- `dificultad` es un número: 1, 2 o 3 (en pantalla se muestra con estrellas).
- Las tareas no tienen ID: se identifican por su posición (índice).

## Manejo de errores y datos

- Si `tasks.json` **no existe**, el programa arranca con una lista vacía y lo crea al guardar.
- Si `tasks.json` está **mal formado** (JSON inválido), el programa avisa y se cierra **sin modificar el archivo**.
- Si alguna tarea **no pasa la validación**, se informa por consola, no se puede usar, pero **se conserva sin cambios** al guardar (al final del archivo).

## Estructura del proyecto

| Archivo | Responsabilidad |
|---|---|
| `main.js` | Menú principal y flujo del programa |
| `rl.js` | Interfaz de `readline` compartida por todos los módulos |
| `leerTareas.js` | Lee `tasks.json`, valida y muestra el resumen |
| `validar.js` | Valida los campos de una tarea |
| `guardarTareas.js` | Escribe las tareas en `tasks.json` |
| `tarea.js` | Constructor de una tarea nueva |
| `agregarTarea.js` | Pide los datos y agrega una tarea |
| `editar.js` | Edita los campos de una tarea |
| `editarPorIndice.js` | Elige una tarea por su número y la edita |
| `vertareas.js` | Lista las tareas, con filtro por estado |
| `buscar.js` | Busca tareas por palabra en el título |
| `mostrar.js` | Muestra el detalle de una tarea |
| `ordenar.js` | Ordena las tareas alfabéticamente por título |
| `fechas.js` | Conversión y validación de fechas |
| `constantes.js` | Traducción de estados y estrellas de dificultad |

## Limitaciones conocidas

- Al ingresar una fecha de vencimiento, la validación solo acepta años posteriores a 2026.
- Al agregar una tarea, la lista se reordena alfabéticamente, por lo que el orden en el archivo puede cambiar.
