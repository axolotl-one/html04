const librosRegistrados = [];

document.getElementById("capturarLibro").addEventListener("click", ()=>AgregarLibro());

document.getElementById("mostrarLista").addEventListener("click", ()=>MostrarLibrosLeidos());

function AgregarLibro()
{
    const contenedorPadre = document.getElementById("librosRegistrados");
    const contenedorHijo = document.createElement("div");
    const imagen = document.createElement("img");
    const etiqueta = document.createElement("i");
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("generos").value;
    etiqueta.append(titulo);
    contenedorHijo.className = "libroCapturado"
    librosRegistrados.push(titulo);
    if(genero === "science"){
        imagen.src = "../assets/libros/physics.png";
    }else if(genero === "fiction"){
        imagen.src = "../assets/libros/fiction.png";
    }else if(genero === "law"){
        imagen.src = "../assets/libros/law.png";
    }else if(genero === "didactic"){
        imagen.src = "../assets/libros/didactic.png";
    }else if(genero === "fairytale"){
        imagen.src = "../assets/libros/fairytale.png";
    }else if(genero === "code"){
        imagen.src = "../assets/libros/code.png";
    }else if(genero === "maths"){
        imagen.src = "../assets/libros/maths.png";
    }else if(genero === "romance"){
        imagen.src = "../assets/libros/romance.png";
    }else{
        imagen.src = "../assets/libros/generic.png";
    }
    contenedorHijo.append(imagen);
    contenedorHijo.append(etiqueta);
    contenedorPadre.appendChild(contenedorHijo);
}

function MostrarLibrosLeidos()
{
    let lista = "";
    for(let i = 0; i<librosRegistrados.length; i++)
        lista += (i+1) + ": " + librosRegistrados[i] + "\n";
    lista += "total de libros: " + librosRegistrados.length;
    lista = lista.toUpperCase();
    alert(lista);
    console.log(lista);
}