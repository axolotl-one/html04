const entidades = await cargarDatos("./entidades-federativas.json")
const selectEDO = document.getElementById("select-edo");
const inputMunp = document.getElementById("input-municipio");
const inputCurp = document.getElementById("input-curp");
const lblgest = document.getElementById("lbl-gestacion");
const claveCurp = ["a","v","a","a","n","n","b","n","t","n","s","e","f","c","c","c","x","n"]
const curpError = document.getElementById("curp-error");
cargarSelectEDO();

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();  // Validación de la solicitud
    const msj = document.getElementById("vista-estado-vacunacion-msj")
    document.getElementById("vista-estado-vacunacion").style.display = "block";
    if(inputCurp.value.length !== 18) { console.log(inputCurp.value.length); msj.innerHTML = "<p>CURP no válida.</p><p>La CURP debe contener 18 caracteres."; return }
    if(curpError.innerHTML !== "") { msj.innerHTML = "<p>CURP no válida.</p><p>Por favor, revisa los parámetros solicitados.</p>"; return }
    if(!selectEDO.value) { msj.innerHTML = "<p>Se requiere el Estado de residencia para continuar.</p>"; selectEDO.focus(); return }
    //if(subformError.innerHTML !== "") { msj.innerHTML = "<p>Se requiere completar algunos datos adicionales.</p>"; return }
    const ok = "<p>Tu solicitud ha sido aceptada.</p><p>Se te asignó la vacuna ";
    const edad = calcularEdad();
    if(edad>=70) { msj.innerHTML = ok + "PATRIA</p>"; return}
    if(edad>=55) { msj.innerHTML = ok + "CANSINO</p>"; return }
    if(edad>=50) { msj.innerHTML = ok + "SINOPHARM</p>"; return }
    if(edad>=30) { msj.innerHTML = ok + "SINOVAC</p>"; return }
    if(edad< 12) { msj.innerHTML = "<p>Tu solicitud permanece en espera de nuevos lotes.</p><p>Procura mantener tu sana distancia.</p>"; return }
    if(document.getElementById("checkbox-gestacion").checked) { msj.innerHTML = ok + "SPUTNIK-V</p>"; return }
    const vacunaLocal = entidades.find(edo => edo.clave === selectEDO.value) .municipios.find( element => element.municipio === inputMunp.value)
    if(!vacunaLocal) { msj.innerHTML = "<p>Tu solicitud permanece en espera de nuevos lotes.</p><p>Procura mantener tu sana distancia.</p>"; return};
    if(vacunaLocal["zona-libre-norte"] && selectEDO.value === "BC" && edad < 18) { msj.innerHTML = ok + "JOHNSON&JOHNSON</p>"; return }
    if(vacunaLocal["zona-libre-norte"] && selectEDO.value === "SR") { msj.innerHTML = ok + "JONHSON&JOHNSON</p>"; return }
    if(vacunaLocal["zona-libre-norte"]) { msj.innerHTML = ok + "MODERNA</p>"; return }
    if(vacunaLocal && selectEDO.value === "MC") { msj.innerHTML = ok + "PFIZER</p>"; return }
    if(vacunaLocal) { msj.innerHTML = ok + "AZTRA patrocinada por Slim"; return }
    
})

inputCurp.addEventListener("keyup", () => { //Validación curp
    curpError.innerHTML = "";
    inputCurp.value = inputCurp.value.toUpperCase();
    const curp = inputCurp.value;
    for(let i = 0; i < inputCurp.value.length; i++)
        if(!esCaracterValido(claveCurp[i], curp[i]))
            curpError.innerHTML += "<p>Carácter \"" + curp[i] + "\" no válido para la " + error(i) + "</p>"
    if(inputCurp.value.length === 18) { if(calcularEdad()<30) { 
        lblgest.style.display = curp[10] === "M" ? "inline-block" : "none";
        selectEDO.style.display = "inline-block";
        return
    } }
    lblgest.style.display = "none"; selectEDO.style.display = "none";
})

selectEDO.addEventListener("change", () => {
    if(document.getElementById("op-edo-null")) { document.getElementById("op-edo-null").remove() }
    inputMunp.value = "";
    inputMunp.style.display = "inline-block";
})

inputMunp.addEventListener("keyup", e => e.target.value = e.target.value.toUpperCase())

document.getElementById("btn-vista-fuera-01").addEventListener("click", () => { document.getElementById("vista-estado-vacunacion").style.display = "none"; })
document.getElementById("btn-vista-fuera-02").addEventListener("click", () => { document.getElementById("vista-data-curp").style.display = "none"; })

function esCaracterValido(tipo, char) {
    if(tipo === "a" || tipo === "e" || tipo === "f") // Alfabeto
        return /^[A-Za-zñÑ]+$/.test(char); // ^: inicio, [A-Za-z]: letras, +: uno o más, $: fin
    if(tipo === "n") // Digitos
        return /\d/.test(char); // /\d/ busca de 0-9, .test(str) retorna true si encuentra uno en str
    if(tipo === "s") // Sexo
        return char === "H" || char === "M" ? true : false;
    if(tipo === "b") // 0 o 1
        return char === "0" || char === "1" ? true : false;
    if(tipo === "t") // 0, 1, 2 o 3
        return char === "0" || char === "1" || char === "2" || char === "3" ? true : false;
    if(tipo === "c") // Consonantes
        return /^[B-DF-HJ-NP-TV-ZÑ]+$/.test(char);
    if(tipo === "v") // Vocales
        return /^[AEIOU]+$/.test(char);
    if(tipo === "x") // Alfabeto o digitos
        return /^[a-zA-Z0-9]+$/.test(char);
    return false;
}

function error(i) {
    if(i===0) return "primera posición que corresponde a la inicial del Apellido Paterno";
    if(i===1) return "segunda posición que corresponde a la primera vocal del Apellido Paterno";
    if(i===2) return "tercera posición que corresponde a la inicial del Apellido Materno";
    if(i===3) return "cuarta posición que corresponde a la incial del Primer Nombre";
    if(i===4) return "quinta posición que corresponde al tercer digito del Año de Nacimiento";
    if(i===5) return "sexta posición que corresponde al cuarto digito del Año de Nacimiento";
    if(i===6) return "séptima posición que corresponde al primer digito del Mes de Nacimiento";
    if(i===7) return "octava posición que corresponde al segundo digito del Mes de Nacimiento";
    if(i===8) return "novena posición que corresponde al primer digito del Día de Nacimiento";
    if(i===9) return "décima posición que corresponde al segundo digito del Día de Nacimiento";
    if(i===10) return "décimo primera posición que corresponde a la inicial género: (H) Hombre o (M) Mujer";
    if(i===11) return "décimo segunda posición que corresponde a la primera inicial de la Entidad Federativa de Nacimiento";
    if(i===12) return "décimo tercera posición que corresponde a la segunda inicial de la Entidad Federativa de Nacimiento";
    if(i===13) return "décimo cuarta posición que corresponde a la primera consonante interna del Apellido Paterno";
    if(i===14) return "décimo quinta posición que corresponde a la primera consonante interna del Apellido Materno";
    if(i===15) return "décimo sexta posición que corresponde a la primera consonante interna del Primer Nombre";
    if(i===16) return "décimo séptima posición que corresponde al diferenciador: numérico para nacidos en el Siglo XX; alfabético para nacidos en el Siglo XXI";
    if(i===17) return "décimo octava posición que corresponde al identificador numérico";
    return
}

function calcularEdad(){
    const curp  = inputCurp.value;
    if(isNaN(curp.charAt(16)))
        return 2026-parseInt("20" + curp.charAt(4) + curp.charAt(5));
    return 2026-parseInt("19" + curp.charAt(4) + curp.charAt(5));
}

async function cargarDatos(ruta) {
    const respuesta = await fetch(ruta);
    const data = await respuesta.json();
    return data;
}

async function cargarSelectEDO() {
    await entidades.forEach((edo) => {
        if(edo.clave==="NE") return;
        const op = document.createElement("option");
        op.value = edo.clave; op.textContent = edo.estado;
        selectEDO.append(op);
    })
}

document.getElementById("btn-data-curp").addEventListener("click", () => {
    const curp = inputCurp.value
    const nacimiento = [curp[4]+curp[5], curp[6]+curp[7], curp[8]+curp[9]];
    const esSigloXXI = isNaN(curp[16]);
    const meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
    const msjDataCurp = document.getElementById("vista-data-curp-msj");
    msjDataCurp.innerHTML = 
        "<p>FECHA DE NACIMIENTO:</p>" +
        "<p>" + nacimiento[2] + " DE " + (parseInt(nacimiento[1]) <= 12 ? meses[parseInt(nacimiento[1]-1)] : "QUIENSABE CUANDO") + 
            " DE " +  (esSigloXXI ? "20" : "19") + nacimiento[0] + "</p>" +
        "<p>GÉNERO: " + (curp[10] === "H" ? "HOMBRE" : "MUJER");
    document.getElementById("vista-data-curp").style.display = "block";
})

//TODO: Mejorar funcionalidad con el sub-form