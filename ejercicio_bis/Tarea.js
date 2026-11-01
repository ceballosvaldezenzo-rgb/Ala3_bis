import { fechaActual } from './fechas.js';
 
//struct tarea
// Ahora usa EXACTAMENTE los mismos nombres y orden de campos que tasks.json.
// Ya no hay "id": el JSON no lo tiene, así que a las tareas se las identifica por su posición (índice).
// descripcion y vencimiento son opcionales: si el usuario no los carga, vale null.
export function tarea(titulo,descripcion,vencimiento){
   this.titulo=titulo;
   this.descripcion=descripcion;
   this.estado="PENDING";
   this.creacion=fechaActual();
   this.ultimaEdicion=null;      // todavía nadie la editó
   this.vencimiento=vencimiento;
   this.dificultad=1;
}
 