import { rl } from './rl.js';
import { mostrar } from './Mostrar.js';
import { editar } from './Editar.js';

//FUNCION VER TAREAS
export async function vertareas(arreglo){
    let op=[3];
    let n;
    let tareasfiltradas=arreglo;
    do{
      console.log("Acontinuacion se desplegara un meno en donde se le indicara con un numero sus acciones\n");
      console.log("¿Que tareas desea visualizar?");
      console.log("[1]-Para ver todas");
      console.log("[2]-Para ver las tareas pendientes");
      console.log("[3]-Para ver las tareas en curso");
      console.log("[4]-Para ver las tareas terminadas");
      console.log("[5]-Para ver las tareas canceladas");
      console.log("[6]-Para volver al menu principal");

      op[0]=Number(await rl.question(''));
      while(op[0]<0||op[0]>6){
        console.log("Error ingrese un numero valido del menu");
        console.log("[1]-Para ver todas");
        console.log("[2]-Para ver las tareas pendientes");
        console.log("[3]-Para ver las tareas en curso");
        console.log("[4]-Para ver las tareas terminadas");
        console.log("[5]-Para ver las tareas canceladas");
        console.log("[6]-Para volver al menu principal");

        op[0]=Number(await rl.question(''));
      }

      switch(op[0]){
        case 1:
             tareasfiltradas=arreglo; // volver a la lista completa (si no, queda filtrada por la opción anterior)
             for(let i=0;i<tareasfiltradas.length;i++){
                console.log("["+(i+1)+"]"+" "+tareasfiltradas[i].titulo);
                console.log("Desea verla al detalle?:");
                console.log("Ingrese 1 para si o 2 para no");
                op[1]=Number(await rl.question(''));
                while(op[1]<1||op[1]>2){
                    console.log("error ingrese un numero valido");
                     console.log("Desea verla al detalle?:");
                     console.log("Ingrese 1 para si o 2 para no");
                     op[1]=Number(await rl.question(''));
                }
                if(op[1]===1){
                    console.log(mostrar(tareasfiltradas[i]));
                    console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                    op[2]=await rl.question('');
                     while(op[2]!="E"&&op[2]!="e"&&op[2]!="0"){
                        console.log("Error ingrese una opcion valida");
                        console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                        op[2]=await rl.question('');
                     }
                    switch(op[2]){
                        case "E":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "e":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "0":
                             await rl.question('Presione una tecla para continuar....\n');
                            break;
                    }
                }


             }
            break;
        case 2:
            tareasfiltradas = arreglo.filter(t => t.estado === "PENDING");
            for(let i = 0; i < tareasfiltradas.length; i++){
                console.log("["+(i+1)+"] "+tareasfiltradas[i].titulo);
                console.log("Desea verla al detalle?:");
                console.log("Ingrese 1 para si o 2 para no");
                op[1] = Number(await rl.question(''));
                while(op[1] < 1 || op[1] > 2){
                    console.log("error ingrese un numero valido");
                    console.log("Desea verla al detalle?:");
                    console.log("Ingrese 1 para si o 2 para no");
                    op[1] = Number(await rl.question(''));
                }
                if(op[1] === 1){
                    console.log(mostrar(tareasfiltradas[i]));
                    console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                    op[2] = await rl.question('');
                    while(op[2] != "E" && op[2] != "e" && op[2] != "0"){
                        console.log("Error ingrese una opcion valida");
                        console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                        op[2] = await rl.question('');
                    }
                    switch(op[2].toUpperCase()){
                        case "E":
                            await editar(tareasfiltradas[i]);
                            break;
                        case "0":
                            await rl.question('Presione una tecla para continuar....\n');
                            break;
                    }
                }
            }
        break;
        case 3:
              tareasfiltradas=arreglo.filter(t => t.estado === "IN-PROGRESS");
             for(let i=0;i<tareasfiltradas.length;i++){
                console.log("["+(i+1)+"]"+" "+tareasfiltradas[i].titulo);
                console.log("Desea verla al detalle?:");
                console.log("Ingrese 1 para si o 2 para no");
                op[1]=Number(await rl.question(''));
                while(op[1]<1||op[1]>2){
                    console.log("error ingrese un numero valido");
                     console.log("Desea verla al detalle?:");
                     console.log("Ingrese 1 para si o 2 para no");
                     op[1]=Number(await rl.question(''));
                }
                if(op[1]===1){
                    console.log(mostrar(tareasfiltradas[i]));
                    console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                    op[2]=await rl.question('');
                     while(op[2]!="E"&&op[2]!="e"&&op[2]!="0"){
                        console.log("Error ingrese una opcion valida");
                        console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                        op[2]=await rl.question('');
                     }
                    switch(op[2]){
                        case "E":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "e":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "0":
                             await rl.question('Presione una tecla para continuar....\n');
                            break;
                    }
                }

            }
            break;
        case 4:
            tareasfiltradas=arreglo.filter(t => t.estado === "FINISHED");
             for(let i=0;i<tareasfiltradas.length;i++){
                console.log("["+(i+1)+"]"+" "+tareasfiltradas[i].titulo);
                console.log("Desea verla al detalle?:");
                console.log("Ingrese 1 para si o 2 para no");
                op[1]=Number(await rl.question(''));
                while(op[1]<1||op[1]>2){
                    console.log("error ingrese un numero valido");
                     console.log("Desea verla al detalle?:");
                     console.log("Ingrese 1 para si o 2 para no");
                     op[1]=Number(await rl.question(''));
                }
                if(op[1]===1){
                    console.log(mostrar(tareasfiltradas[i]));
                    console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                    op[2]=await rl.question('');
                     while(op[2]!="E"&&op[2]!="e"&&op[2]!="0"){
                        console.log("Error ingrese una opcion valida");
                        console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                        op[2]=await rl.question('');
                     }
                    switch(op[2]){
                        case "E":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "e":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "0":
                             await rl.question('Presione una tecla para continuar....\n');
                            break;
                    }
                }

            }
            break;
        case 5:
            tareasfiltradas=arreglo.filter(t => t.estado === "CANCELED");
             for(let i=0;i<tareasfiltradas.length;i++){
                console.log("["+(i+1)+"]"+" "+tareasfiltradas[i].titulo);
                console.log("Desea verla al detalle?:");
                console.log("Ingrese 1 para si o 2 para no");
                op[1]=Number(await rl.question(''));
                while(op[1]<1||op[1]>2){
                    console.log("error ingrese un numero valido");
                     console.log("Desea verla al detalle?:");
                     console.log("Ingrese 1 para si o 2 para no");
                     op[1]=Number(await rl.question(''));
                }
                if(op[1]===1){
                    console.log(mostrar(tareasfiltradas[i]));
                    console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                    op[2]=await rl.question('');
                     while(op[2]!="E"&&op[2]!="e"&&op[2]!="0"){
                        console.log("Error ingrese una opcion valida");
                        console.log("Desea editarla?\nIngrese E para editar\nIngrese 0 para continuar");
                        op[2]=await rl.question('');
                     }
                    switch(op[2]){
                        case "E":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "e":
                             await editar(tareasfiltradas[i]);
                            break;
                        case "0":
                             await rl.question('Presione una tecla para continuar....\n');
                            break;
                    }
                }

            }
            break;
        case 6:
              console.log("Usted esta volviendo al menu");
            break;
      }


    }while(op[0]!=6);

}