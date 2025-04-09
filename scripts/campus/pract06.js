//DOM para enviar comentarios y borrar comentarios
class GetComentarios{
    constructor(id){
        this.id = id;
    }

    SetNuevoComentario(contenido){
        this.id++;
        this.ahora = new Date();
        this.contenido = contenido;
        const fecha = new Date();
        this.ahora = fecha.getHours() + ":" + fecha.getMinutes() + " " + fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    }
}

const getComentario = new GetComentarios(1);

document.getElementById("setComentV01").addEventListener("click", ()=>AgregarComentario(1));

document.getElementById("setComentV02").addEventListener("click",()=>AgregarComentario(2));

/* TODO Crear una clase para setComent# y usar queryselectorall como en fieldsetcajas */

/* const cajaVideo01 = document.getElementById("cajaVideo1")

cajaVideo01.addEventListener('click', function(event) {
    // Verifica si el elemento clickeado es un input de tipo submit con la clase "inputBorrar"
    if (event.target.type === 'submit' && event.target.classList.contains('inputBorrar')) {
        const botonId = event.target.id; // Obtiene el ID del botón clickeado (ej: "borrar1")
        BorrarComentario(botonId); // Llama a tu función con el ID del botón
    }
}); */

const fieldsetCajas = document.querySelectorAll(".cajasComentarios");

fieldsetCajas.forEach(fieldset => {
    fieldset.addEventListener("click", function(event) {
        // Verifica si el elemento clickeado es un input de tipo submit con la clase "inputBorrar"
        if (event.target.type === "submit" && event.target.classList.contains("inputBorrar")) {
            const botonId = event.target.id; // Obtiene el ID del botón clickeado (ej: "borrar1")
            BorrarComentario(botonId); // Llama a tu función con el ID del botón
        }
    });
})

function AgregarComentario(videoID){
    const caja = document.getElementById("cajaVideo" + videoID);
    const inputComentario = document.getElementById("getComentV" + videoID);
    if(inputComentario.value == "")
        alert("No haz ingresado un comentario");
    else{
        const h4ToRemove = caja.querySelector("h4"); // Busca el primer h4 en el DOM
        if (h4ToRemove) {
            h4ToRemove.remove(); // Remueve el elemento h4 si se encuentra
            console.log('Etiqueta h4 removida.');
        }
        getComentario.SetNuevoComentario(inputComentario.value);
        inputComentario.value = "";
        const parrafo = document.createElement("p");
        const fecha = document.createElement("small");
        fecha.textContent = getComentario.ahora;
        fecha.style.color = "#777777";
        parrafo.appendChild(fecha);
        parrafo.id = "comentario"+getComentario.id;
        parrafo.innerHTML += " | " + getComentario.contenido;  //innerHTML respeta etiquetas
        caja.appendChild(parrafo);
        const botonBorrar = document.createElement("input");
        botonBorrar.type = "submit";
        botonBorrar.value = "Borrar Comentario";
        botonBorrar.id = "borrar"+getComentario.id;
        botonBorrar.classList.add("inputBorrar")
        caja.appendChild(botonBorrar);
        console.log("ID del comentario" + getComentario.id);
        console.log("ID del boton borrar: " + botonBorrar.id);
        console.log("Clase del boton borrar: " + botonBorrar.classList)
    }
}

function BorrarComentario(id){
    let regex = /(\d+)/g;  // /(\d+) obtiene solo numeros, /g indica de toda la string
    console.log("BorrarComentario ejecutandose con el ID: " + id);
    console.log("Parte numerica del ID: " + id.match(regex))
    console.log("comentario"+id.match(regex));
    const inputBorrar = document.getElementById(id);
    const comentarioBorrar = document.getElementById("comentario"+id.match(regex));
    comentarioBorrar.style.color = "#aaaaaa";
    comentarioBorrar.style.fontStyle = "italic";
    comentarioBorrar.innerHTML = "Borrando Comentario...";
    setTimeout(() => {  //Retención de 2s antes de eliminar
        comentarioBorrar.remove();
        inputBorrar.remove();
    }, 2000);
}

