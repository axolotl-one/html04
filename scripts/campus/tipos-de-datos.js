let mensaje;
let salida = document.getElementById("captura");
let temax = document.getElementById("tema");
temax.textContent = "Practica 1: Tipos de Datos en Java Script";

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

//hardcoding
let nulo = null;
console.log("Este es un valor nulo: " + nulo);
let inasignado;
console.log("Este es un valor sin asignar: " + inasignado);
let booleano = true;
console.log("Este es un valor booleano: " + booleano);
let scape = "\"";
console.log("Este es un valor de escape de caracter de sintaxis: " + scape);