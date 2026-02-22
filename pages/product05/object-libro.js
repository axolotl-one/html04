const librosRegistrados = [];

document.getElementById("capturarObjetoClase").addEventListener("click", ()=>LibroObjetoClase());

document.getElementById("capturarObjetoConstructor").addEventListener("click", ()=>LibroObjetoConstructor());

document.getElementById("capturarObjetoLiteral").addEventListener("click", ()=>LibroObjetoLiteral());

document.getElementById("mostrarLista").addEventListener("click", ()=>MostrarLibrosLeidos());

function AgregarLibro(objetoLibro)
{
    const contenedorPadre = document.getElementById("librosRegistrados");
    const contenedorHijo = document.createElement("div");
    const imagen = document.createElement("img");
    const etiqueta = document.createElement("i");
    etiqueta.append(objetoLibro.titulo);
    contenedorHijo.className = "libroCapturado"
    librosRegistrados.push(objetoLibro.titulo);
    if(objetoLibro.genero === "science"){
        imagen.src = "../assets/libros/physics.png";
    }else if(objetoLibro.genero === "fiction"){
        imagen.src = "../assets/libros/fiction.png";
    }else if(objetoLibro.genero === "law"){
        imagen.src = "../assets/libros/law.png";
    }else if(objetoLibro.genero === "didactic"){
        imagen.src = "../assets/libros/didactic.png";
    }else if(objetoLibro.genero === "fairytale"){
        imagen.src = "../assets/libros/fairytale.png";
    }else if(objetoLibro.genero === "code"){
        imagen.src = "../assets/libros/code.png";
    }else if(objetoLibro.genero === "maths"){
        imagen.src = "../assets/libros/maths.png";
    }else if(objetoLibro.genero === "romance"){
        imagen.src = "../assets/libros/romance.png";
    }else{
        imagen.src = "../assets/libros/generic.png";
    }
    contenedorHijo.append(imagen);
    contenedorHijo.append(etiqueta);
    contenedorPadre.appendChild(contenedorHijo);
    alert(objetoLibro.MostrarInfo());
}

function LibroObjetoLiteral()
{
    const libroLiteral = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        anio: document.getElementById("anio").value,
        genero: document.getElementById("generos").value,
        estado: document.getElementById("estado").value,
        editorial: document.getElementById("editorial").value,

        MostrarInfo: function(){
            let info = "Objeto Literal:\nTitulo: " + this.titulo + "\nAutor: " + this.autor + "\nAño: " + 
                        this.anio + "\nGénero: " + this.genero + "\nEstado: " + this.estado + "\nEditorial: " + this.editorial;
            console.log(info);
            return info;
        }
    };

    AgregarLibro(libroLiteral);
}

function LibroObjetoConstructor()
{
    const libroConstructor = new Object();
    libroConstructor.titulo = document.getElementById("titulo").value;
    libroConstructor.autor = document.getElementById("autor").value;
    libroConstructor.anio = document.getElementById("anio").value;
    libroConstructor.genero = document.getElementById("generos").value;
    libroConstructor.estado = document.getElementById("estado").value;
    libroConstructor.editorial = document.getElementById("editorial").value;
    libroConstructor.MostrarInfo = function(){
        let info = "Objeto Constructor Genérico:\nTitulo: " + this.titulo + "\nAutor: " + this.autor + "\nAño: " + 
        this.anio + "\nGénero: " + this.genero + "\nEstado: " + this.estado + "\nEditorial: " + this.editorial;
        console.log(info);
        return info;
    }

    AgregarLibro(libroConstructor);
}

function LibroObjetoClase()
{
    const libroClase = new LibroClase(
        document.getElementById("titulo").value,
        document.getElementById("autor").value,
        document.getElementById("anio").value,
        document.getElementById("generos").value,
        document.getElementById("estado").value,
        document.getElementById("editorial").value,
    );

    AgregarLibro(libroClase);
}

class LibroClase{
    constructor(titulo, autor, anio, genero, estado, editorial)
    {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.genero = genero;
        this.estado = estado;
        this.editorial = editorial;
    }

    MostrarInfo(){
        let info = "Objeto Constructor Clase:\nTitulo: " + this.titulo + "\nAutor: " + this.autor + "\nAño: " + 
                    this.anio + "\nGénero: " + this.genero + "\nEstado: " + this.estado + "\nEditorial: " + this.editorial;
        console.log(info);
        return info;
    }
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