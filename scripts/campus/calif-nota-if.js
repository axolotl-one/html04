let mensaje;
let salida = document.getElementById("captura");
let temax = document.getElementById("tema");
temax.textContent = "Practica 2: Estructuras de Selección de Java Script";
let nota = parseInt(window.prompt("Ingresa tu calificación:"));

//Selección de if-else
if(isNaN(nota)){
    console.log("El valor ingresado no es un número.");
    salida.textContent = "El valor ingresado no es un número";
}else if(nota<0 || nota > 100){
    console.log("La nota " + nota + " se encuentra fuera del rango");
    salida.textContent = "La nota " + nota + " se encuentra fuera del rango";
}else if(nota<60){
    console.log("La nota " + nota + " es: \"Insuficiente\"");
    salida.textContent = "La nota " + nota + " es: \"Insuficiente\"";
}else if(nota<75){
    console.log("La nota es: \"Suficiente\"");
    salida.textContent = "La nota es: \"Suficiente\"";
}else if(nota<90){
    console.log("La nota es: \"Buena\"");
    salida.textContent = "La nota es: \"Buena\"";
}else if(nota<100){
    console.log("La nota es: \"Excelente\"");
    salida.textContent = "La nota es: \"Excelente\"";
}else{
    console.log("La nota " + nota + " es: \"Máxima\"");
    salida.textContent = "La nota " + nota + " es: \"Máxima\"";
}