import { rl } from './rl.js';
import { fechaActual, ddmmaaaaAJson } from './fechas.js';

//EDITAR TAREAS
// Regla del menú de edición:
//   Enter solo         -> mantiene el valor actual
//   un espacio (" ")   -> deja el campo vacío (null), solo en los campos opcionales
//   cualquier otro dato-> reemplaza el valor
export async function editar(tarea){
    let descripcion;
    let fechav;
    let estado;
    let dificultad;
    let dia;
    let mes;
    let año;
    let correcto=false;

    console.log('estas editando la tarea: '+tarea.titulo+'');
    console.log('- Si deseas mantener los valores de un atributo, simplemente dejalo en blanco.\n');
    console.log('-Si deseas dejar en blanco un atributo,escribe un espacio\n');

    // DESCRIPCION (opcional)
    descripcion=await rl.question('Edite descripcion: ');
    if(descripcion===""){
      // Enter: no se toca
    }else if(descripcion.trim()===""){
        tarea.descripcion=null;       // un espacio: queda vacía (null en el JSON)
    }else{
        tarea.descripcion=descripcion.trim();

    }

    // FECHA DE VENCIMIENTO (opcional)
    while(correcto===false){
        try{
            fechav=await rl.question('Edite fecha de vencimiento (dd/mm/aaaa):');

            if(fechav === "" || fechav.trim() === ""){
            correcto = true; // Enter o espacio son válidos
        }
        else {
            dia=(Number(fechav[0])*10)+(Number(fechav[1]));
            mes=(Number(fechav[3])*10)+(Number(fechav[4]));
            año=(Number(fechav[6]*1000))+(Number(fechav[7])*100)+(Number(fechav[8])*10)+(Number(fechav[9]));
            if((fechav.length!=10) || (fechav[2]!="/") || (fechav[5]!="/") || (fechav.includes(" "))||
                dia<1||dia>31||mes<1||mes>12||año<=2026||
                (dia>29&&mes===2)||(dia>30&&mes===4)||(dia>30&&mes===6)||(dia>30&&mes===9)||(dia>30&&mes===11)){
                throw new Error("error ingrese correctamente la fecha \n");
            }
        }
         correcto=true;
        }catch(error){
            console.log(error.message);
        }
    }
    if(fechav===""){
      // Enter: no se toca
    }else if(fechav.trim()===""){
        tarea.vencimiento=null;       // un espacio: sin vencimiento
    }else{
        tarea.vencimiento=ddmmaaaaAJson(fechav);  // se guarda en el formato del JSON

    }

    // ESTADO (obligatorio: nunca puede quedar vacío)
    estado=await rl.question('Edite el estado([P]endiente / [E]n curso / [T]erminada / [C]ancelada):')
    while(estado.toUpperCase()!="P"&&estado.toUpperCase()!="E"&&estado.toUpperCase()!="T"&&estado.toUpperCase()!="C"&&estado!=""){
        console.log("Error");
         estado=await rl.question('Edite el estado([P]endiente / [E]n curso / [T]erminada / [C]ancelada):')
    }
    // Se guarda el valor que usa el JSON (en inglés)
    switch(estado.toUpperCase()){
        case "P":
             tarea.estado="PENDING";
            break;
        case "E":
             tarea.estado="IN-PROGRESS";
            break;
        case "T":
             tarea.estado="FINISHED";
            break;
        case "C":
              tarea.estado="CANCELED";
            break;
    }

    // DIFICULTAD (obligatoria: se guarda como número 1, 2 o 3)
    dificultad=await rl.question('Edite la dificultad,ingrese [1]Facil,[2]Dificil,[3]Muy dificil: ');
    while(dificultad !== "1" && dificultad !== "2" && dificultad !== "3" && dificultad !== ""){
        console.log("Error");
         dificultad=await rl.question('Edite la dificultad,ingrese [1]Facil,[2]Dificil,[3]Muy dificil: ');
    }
    if(dificultad!==""){
        tarea.dificultad=Number(dificultad);
    }

    // Registro cuándo se editó por última vez (mismo formato que el JSON)
    tarea.ultimaEdicion = fechaActual();
    console.log("Datos guardados correctamente");
    await rl.question('Presionte una tecla para continuar....');

}