import { ESTADOS, ESTRELLAS } from './constantes.js';
import { jsonALegible } from './fechas.js';
 
//DEVUELVE UNA TAREA UNA POR UNA
// Traduce los valores del JSON (PENDING, 2, null...) a algo legible para el usuario.
export function mostrar(tareasfiltradas){
    const t=`titulo: ${tareasfiltradas.titulo}
             Estado: ${ESTADOS[tareasfiltradas.estado]}
             Descripcion: ${tareasfiltradas.descripcion ?? "Sin descripcion"}
             Dificultad: ${ESTRELLAS[tareasfiltradas.dificultad]}
             Fecha creacion: ${jsonALegible(tareasfiltradas.creacion)}
             Fecha de edicion: ${jsonALegible(tareasfiltradas.ultimaEdicion, "Sin ediciones")}
             Fecha de vencimiento: ${jsonALegible(tareasfiltradas.vencimiento, "Sin vencimiento")}`;
             return t;
}
 