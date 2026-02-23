document.getElementById("tema").textContent = "Producto 02: Estructuras de Selección de JavaScript";

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nota = document.getElementById("inputNota").value;
    const salida = document.createElement("pre");
    //Selección de if-else
    if(isNaN(nota)){
        console.log("El valor ingresado no es un número.");
        salida.textContent = "\nEl valor ingresado no es un número.";
    }else if(nota<0 || nota > 100){
        console.log("La nota " + nota + " se encuentra fuera del rango");
        salida.textContent = "\nLa nota " + nota + " se encuentra fuera del rango.";
    }else if(nota<60){
        console.log("La nota " + nota + " es: \"Insuficiente\"");
        salida.textContent = "\nLa nota " + nota + " es: \"Insuficiente\".";
    }else if(nota<75){
        console.log("La nota es: \"Suficiente\"");
        salida.textContent = "\nLa nota " + nota + " es: \"Suficiente\".";
    }else if(nota<90){
        console.log("La nota es: \"Buena\"");
        salida.textContent = "\nLa nota " + nota + " es: \"Buena\".";
    }else if(nota<100){
        console.log("La nota es: \"Excelente\"");
        salida.textContent = "\nLa nota " + nota + " es: \"Excelente\".";
    }else{
        console.log("La nota " + nota + " es: \"Máxima\"");
        salida.textContent = "\nLa nota " + nota + " es: \"Máxima\".";
    }
    document.getElementById("main").appendChild(salida);
});

