import { rl } from './rl.js';
import { agregarTarea } from './agregarTarea.js';
import { ordenar } from './ordenar.js';
import { vertareas } from './Vertareas.js';
import { mostrar_segun_contenga } from './buscar.js';
import { editarPorIndice } from './EditarPorIndice.js';
import { cargarTareas } from './Leertareas.js';
import { guardarTareas } from './Guardartareas.js';

//FUNCION MAIN
async function main(){

// LECTURA: cargo las tareas desde tasks.json (valida y muestra el resumen)
const carga=await cargarTareas();
if(carga===null){
    // El archivo existe pero está mal: salgo sin tocarlo para no pisarlo con una lista vacía
    console.log("No se puede continuar. Corrija tasks.json y vuelva a ejecutar.");
    rl.close();
    return;
}
let arreglo=carga.tareas;          // tareas validas: con estas trabaja el programa
const invalidas=carga.invalidas;   // tareas invalidas: solo se conservan para volver a guardarlas
let op=[2];
console.log("*******BIENVENIDOS A MANEJO COMO CHANO TU ORGANIZADOR DE TAREAS*******\n");
do{

 console.log("Acontinucacion seleccione la operacion que desea realizar:\n");
 console.log("1.Para agregar una tarea");
 console.log("2-Para mostrar las tareas");
 console.log("3-Para buscar tareas");
 console.log("4-Para editar una tarea por su numero");
 console.log("5-Para salir");

 op[0]=Number(await rl.question(''));

 while(op[0]<1||op[0]>5){
    console.log("error ingrese un numero del 1 al 5\n");
    console.log("Acontinucacion seleccione la operacion que desea realizar:\n");
    console.log("1.Para agregar una tarea");
    console.log("2-Para mostrar las tareas");
    console.log("3-Para buscar tareas");
    console.log("4-Para editar una tarea por su numero");
    console.log("5-Para salir");
    op[0]=Number(await rl.question(''));
 }
 console.log("usted selecciono la opcion: "+op[0]+"esta seguro que desea continuar?\ningrese 1 para si\ningrese 2 para no\n");
 op[2]=Number(await rl.question(''));
 while(op[2]<1||op[2]>2){
    console.log("error ingrese el numero 1 o el numero 2\n");
    console.log("usted selecciono la opcion: "+op[0]+"\n esta seguro que desea continuar?\ningrese 1 para si\ningrese 2 para no\n");
    op[2]=Number(await rl.question(''));
 }
 if(op[2]==2){
    op[0]=6;
 }
 switch(op[0]){
    case 1:
            await agregarTarea(arreglo);
            ordenar(arreglo);
            await guardarTareas(arreglo,invalidas);   // ESCRITURA: guardo después de agregar
        break;
    case 2:
         if(arreglo.length===0){
            console.log("error opcion inviable en este momento,no hay tareas que mostrar");
         }else{
            await vertareas(arreglo);
            await guardarTareas(arreglo,invalidas);   // ESCRITURA: guardo por si se editó alguna tarea
         }
        break;
    case 3:
         if(arreglo.length===0){
            console.log("error opcion inviable en este momento,no hay tareas que mostrar");
         }else{
            await mostrar_segun_contenga(arreglo);
         }
        break;
    case 4:
         if(arreglo.length===0){
            console.log("error opcion inviable en este momento,no hay tareas que editar");
         }else{
            await editarPorIndice(arreglo);
            await guardarTareas(arreglo,invalidas);   // ESCRITURA: guardo después de editar
         }
        break;
    case 5:
          console.log("GRACIAS POR USAR MANEJO COMO CHANO TU ORGANIZADOR DE TAREAS, NOS VEMOS.....\n");
        break;

 }

}while(op[0]!=5);
rl.close();

}
main();