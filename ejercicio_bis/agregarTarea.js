import { rl } from './rl.js';
import { tarea } from './Tarea.js';
import { ddmmaaaaAJson } from './fechas.js';

//PROCEDIMIENTO PARA AGREGAR UNA TAREA
export async function agregarTarea(arreglo){
    let titulo;
    let descripcion;
    let fechav;
    let correcto=false;
    let op;
    let dia;
    let mes;
    let año;
    do{
        dia=0;
        mes=0;
        año=0;
       //PIDO TITULO (obligatorio)
        correcto=false;
       while(correcto===false){
        try{
            titulo=await rl.question('Titulo:\t');
            if(titulo.trim()=== ""){
                throw new Error("error el titulo no puede estar vacio ni contener espacios\n");
            }

         correcto=true;
        }catch(error){
            console.log(error.message);
        }
       }

        //PIDO DESCRIPCION (opcional: si el usuario no escribe nada, se guarda null)
        descripcion=await rl.question('descripcion (Enter para dejarla vacia):\t');
        if(descripcion.trim()===""){
            descripcion=null;
        }else{
            descripcion=descripcion.trim();
        }

       //PIDO FECHA DE VENCIMIENTO (opcional: si el usuario no escribe nada, se guarda null)
       correcto=false;
        while(correcto===false){
        try{
            fechav=await rl.question('fecha de vencimiento en formato dd/mm/aaaa (Enter para dejarla vacia):\t');
            if(fechav.trim()===""){
                fechav=null;
                correcto=true;
                continue;
            }
            dia=(Number(fechav[0])*10)+(Number(fechav[1]));
            mes=(Number(fechav[3])*10)+(Number(fechav[4]));
            año=(Number(fechav[6]*1000))+(Number(fechav[7])*100)+(Number(fechav[8])*10)+(Number(fechav[9]));

            if((fechav.length!=10) || (fechav[2]!="/") || (fechav[5]!="/") || (fechav.includes(" "))||
                dia<1||dia>31||mes<1||mes>12||año<=2026||
                (dia>29&&mes===2)||(dia>30&&mes===4)||(dia>30&&mes===6)||(dia>30&&mes===9)||(dia>30&&mes===11)){
                throw new Error("error ingrese correctamente la fecha \n");
            }

         correcto=true;
        }catch(error){
            console.log(error.message);
        }
       }

       // Ya no se pide ID: tasks.json no tiene ese campo.
       // Si hay fecha, la convierto de dd/mm/aaaa al formato del JSON.
       if(fechav!==null){
            fechav=ddmmaaaaAJson(fechav);
       }

       const tareaNueva=new tarea(titulo,descripcion,fechav);
       arreglo.push(tareaNueva);
       console.log("tarea agregada correctamente\n");
       console.log("ingrese 1 si desea agregar otra tarea\ningrese 2 si desea dejar de agregar tareas\n");
       op=Number(await rl.question(''));
       while(op<1||op>2){
            console.log("error ingrese el numero 1 o el numero 2\n");
            console.log("ingrese 1 si desea agregar otra tarea\ningrese 2 si desea dejar de agregar tareas\n");
            op=Number(await rl.question(''));
        }


    }while(op!=2);
}