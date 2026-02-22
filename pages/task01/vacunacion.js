let curp = "";
let nacimiento = "";
while(true){
    curp = window.prompt("Ingresa tu CURP:");
    curp = curp.toUpperCase();
    nacimiento = curp.substring(4,9);
    if(parseInt(curp.length) !== 18 )
        alert("TU CURP NO CONTIENE LOS 18 CARACTERES");
    else if((curp.charAt(10)!=="H" && curp.charAt(10)!=="M") || isNaN(nacimiento))
        alert("TU CURP NO ES VALIDA");
    else
        break;
}

console.log("CURP OBTENIDA: " + curp);
let edad = calcularEdad();
alert("TU EDAD PARA 2025 ES DE: " + edad)
if(edad<18){
    console.log("USUARIO RECHAZADO: NO CUMPLE LA EDAD MINIMA REQUERIDA.");
    alert("HAZ SIDO RECHAZADO, NO CUMPLES LA EDAD MINIMA PARA SER VACUNADO");
}else if(edad<30){
    let resp = window.prompt("RESPONDE CON \"SIMONTL\" SI VIVES EN LA ZONA FRONTERIZA:")
    if(resp === "SIMONTL"){
        alert("ENVIA COMPROBANTE DE DOMICILIO PARA PROCESAR TU SOLICITUD");
        console.log("SOLICITUD PENDIENTE");
    }
    else if(curp.charAt(10)==="M"){
        resp = window.prompt("RESPONDE CON \"EI\" SI TE ENCUENTRAS EMBARAZADA");
        if(resp === "EI"){
            alert("TU SOLICITUD HA SIDO ACEPTADA.");
            console.log("USUARIO APROBADO POR PERIODO DE GESTACION");
        }else{
            alert("HAZ SIDO RECHAZADA, AUN NO CUMPLES CON ALGUNO DE LOS REQUISITOS DISPONIBLES");
            console.log("USUARIO RECHAZADO: NO SE ENCUENTRA EN PERIODO DE GESTACION");
        }
    }else{
        alert("HAZ SIDO RECHAZADO, AUN NO CUMPLES CON ALGUNO DE LOS REQUISITOS DISPONIBLES");
        console.log("USUARIO RECHAZADO POR FALTA DE REQUISITOS PARA JOVENES ENTRE 18 Y 29 AÑOS");
    }
}else{
    alert("TU SOLICITUD HA SIDO ACEPTADA.");
    console.log("USUARIO APROBADO POR MAYORIA DE EDAD REQUERIDA");
}

function calcularEdad()
{
    let edad = 0;
    if(isNaN(curp.charAt(16)))
    {
        let anio = "20" + curp.charAt(4) + curp.charAt(5);
        edad = 2025-parseInt(anio);
    }else{
        let anio = "19" + curp.charAt(4) + curp.charAt(5);
        edad = 2025-parseInt(anio);
    }
    return edad;
}