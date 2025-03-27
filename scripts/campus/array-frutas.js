const frutasRegistradas = [];
// Seleccionar todos los divs con la clase 'frutas'
const divsDeFrutas = document.querySelectorAll(".frutas");

// Agregar evento a cada div
divsDeFrutas.forEach(div => {
    div.addEventListener("click", function() {
        // Obtener el id del div (nombre de la fruta)
        const nombreFruta = div.id;

        // Agregar la fruta al arreglo
        frutasRegistradas.push(nombreFruta);
        console.log(nombreFruta);
    });
});

document.getElementById("mostrarLista").addEventListener("click", function () {
    let lista = "";
    for(let i = 0; i<frutasRegistradas.length; i++)
        lista += (i+1) + ": " + frutasRegistradas[i] + "\n";
    lista += "total de frutas: " + frutasRegistradas.length;
    lista = lista.toUpperCase();
    alert(lista);
    console.log(lista);
});