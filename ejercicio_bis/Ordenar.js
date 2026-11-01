//ORDENO ALFABETICAMENTE LAS TAREAS
export function ordenar(arreglo){
    arreglo.sort((a,b)=> a.titulo.localeCompare(b.titulo));
}