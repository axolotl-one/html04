const frutasRegistradas = [];
// Seleccionar todos las imgs con la clase 'frutas'
const imagesFrutas = document.querySelectorAll(".frutas");

// Agregar evento a cada div
imagesFrutas.forEach(img => {
    img.addEventListener("click", function() {
        // Obtener el id del div (nombre de la fruta)
        const nombreFruta = img.id;
        // Agregar la fruta al arreglo
        frutasRegistradas.push(nombreFruta);
        document.getElementById("input-captura").value = frutasRegistradas.length + ". " + nombreFruta + " capturado";
        console.log(nombreFruta);
    });
});

document.getElementById("btn-mostrar-lista").addEventListener("click", () => {
    const msj = document.getElementById("vista-arr-msj");
    msj.innerHTML = "";
    for(let i = 0; i<frutasRegistradas.length; i++)
        msj.innerHTML += "<p>" + (i+1) + ". " + frutasRegistradas[i].toUpperCase() + "</p>";
    msj.innerHTML += "<p>TOTAL DE FRUTAS REGISTRADAS: " + frutasRegistradas.length + "</p>";
    document.getElementById("vista-arreglo").style.display = "block";
    console.log(frutasRegistradas);
});

document.getElementById("btn-borrar-lista").addEventListener("click", () => {
    const max = frutasRegistradas.length
    for(let i = 0; i<max; i++){frutasRegistradas.pop(); console.log(frutasRegistradas)}
    document.getElementById("input-captura").value = "La lista se ha borrado correctamente";
})

document.getElementById("btn-vista-fuera").addEventListener("click", () => {
    document.getElementById("vista-arreglo").style.display = "none";
})