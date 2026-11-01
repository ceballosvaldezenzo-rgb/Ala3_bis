import { rl } from './rl.js';
import { editar } from './Editar.js';
import { mostrar } from './Mostrar.js';

//EDITAR UNA TAREA ELIGIENDOLA POR SU NUMERO (indice)
// El numero es la posicion en la lista completa: es el mismo [n] que se ve en
// "Mostrar las tareas > Ver todas" y en "Buscar tareas".
export async function editarPorIndice(arreglo){
    console.log("Ingrese el numero de la tarea a editar (1 a "+arreglo.length+") o 0 para volver:");
    let n=Number(await rl.question(''));

    // Valido que sea un numero entero dentro del rango
    while(!Number.isInteger(n)||n<0||n>arreglo.length){
        console.log("Error ingrese un numero entre 1 y "+arreglo.length+" (o 0 para volver):");
        n=Number(await rl.question(''));
    }

    if(n===0){
        console.log("Usted esta volviendo al menu");
        return;
    }

    // El usuario cuenta desde 1, pero el arreglo cuenta desde 0: por eso n-1
    const tareaElegida=arreglo[n-1];
    console.log(mostrar(tareaElegida));
    await editar(tareaElegida);   // editar modifica la tarea directamente en el arreglo
}