document.getElementById("tema").textContent = "Producto 01: Tipos de Datos en JavaScript";
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const captura = document.createElement('pre');
    captura.textContent += "\n" + document.getElementById("inputInt").value + " es un tipo de dato entero\n";
    isNaN(document.getElementById("inputFloat").value)
        ? captura.textContent += document.getElementById("inputFloat").value + " no es un tipo de dato flotante\n"
        : captura.textContent += document.getElementById("inputFloat").value + " es un tipo de dato flotante\n";
    captura.textContent += document.getElementById("inputString").value + " es una cadena de caracteres";
    captura.textContent += "\n\ntexto hardcoding:";
    let nulo = null;
    let inasignado;
    let booleano = true;
    let scape = "\\";
    captura.textContent += "\nlet nulo = null;\nEste es un valor nulo e imprime: " + nulo;
    captura.textContent += "\nlet inasignado;\nEste es un valor sin asignar e imprime: " + inasignado;
    captura.textContent += "\nlet booleano = true;\nEste es un valor booleano e imprime: " + booleano;
    captura.textContent += "\nlet scape = '\\\\';\nEste es un valor de escape de caracter de sintaxis: " + scape;
    document.getElementById('main').appendChild(captura);
})

/*
let entero = parseInt(window.prompt("Ingresa un número:"));
mensaje = "El entero recibido es de: " + entero + '\n';
console.log(mensaje);
salida.textContent = mensaje;
let frcc = parseFloat(window.prompt("Ingresa un número decimal:"));
mensaje = "El decimal recibido es de: " + frcc + '\n';
console.log(mensaje);
salida.textContent += mensaje;
let palabra  = window.prompt("Ingresa una palabra:");
mensaje = "La palabra recibida fue: " + palabra;
console.log(mensaje);
salida.textContent += mensaje;
*/