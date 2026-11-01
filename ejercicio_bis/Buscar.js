import { rl } from './rl.js';

//FUNCION PARA BUSCAR Y MOSTRAR SEGUN CONTENGA LA PALABRA EN EL TITULO LA TAREA
export async function mostrar_segun_contenga(arreglo){
   let op;
   let titulo;
   let correcto=false;
   do{
    correcto=false;
     console.log("Ingrese el titulo de la tarea que esta buscando:");
     titulo=await rl.question('');
     while(titulo.trim()===""){
        console.log("Error ingreso invalido");
        console.log("Ingrese el titulo de la tarea que esta buscando:");
        titulo=await rl.question('');
     }
      for(let i=0;i<arreglo.length;i++){
        if(arreglo[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
            correcto=true;

        }
     }
    if(correcto===true){
     for(let i=0;i<arreglo.length;i++){
        if(arreglo[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
            console.log("["+(i+1)+"]"+" "+arreglo[i].titulo);
        }
     }
    }else{
       console.log("No hay tareas que contengan la palabra "+titulo+" en su titulo");
    }
     console.log("Desea buscar otra tarea que contenga alguna palabra o frase?\nIngrese 1 para si o un 2 para no");
     op=Number(await rl.question(''));
     while(op<1||op>2){
        console.log("Error ingrese un numero valido");
         console.log("Desea buscar otra tarea que contenga alguna palabra o frase?\nIngrese 1 para si o un 2 para no");
     op=Number(await rl.question(''));
     }
   }while(op!=2);
}