document.getElementById("activarJuego").addEventListener("click", function () {
    let op1Jugador1 = Math.floor(Math.random() * 7);
    let op2Jugador1 = Math.ceil(Math.random() * 7);
    if(op1Jugador1%3===op2Jugador1%3){
        op2Jugador1++;
    }
    let op1Jugador2 = Math.floor(Math.random() * 13);
    let op2Jugador2 = Math.ceil(Math.random() * 13);
    if(op1Jugador2%3===op2Jugador2%3){
        op2Jugador2++;
    }
    Seleccion(op1Jugador1,true,true);
    Seleccion(op2Jugador1,true,false);
    Seleccion(op1Jugador2,false,true);
    Seleccion(op2Jugador2,false,false);
});

document.getElementById("activarMenos1").addEventListener("click", function () {
    MenosUna();
});

function MenosUna(){
    let contenedor;
    let aleatorio = Math.floor(Math.random() * 7);
    if(aleatorio%2 === 0){
        contenedor = document.getElementById("mano1Jugador1");
    }else{
        contenedor = document.getElementById("mano2Jugador1");
    }
    contenedor.innerHTML = "";

    aleatorio = Math.ceil(Math.random() * 13)
    if(aleatorio%2 === 0){
        contenedor = document.getElementById("mano1Jugador2");
    }else{
        contenedor = document.getElementById("mano2Jugador2");
    }
    contenedor.innerHTML = "";
}

function Seleccion(numero, esJugador1, esMano1){
    const imagen = document.createElement("img");
    let contenedor; 
    if(numero%3 === 0){
        imagen.src = "../assets/PPTPiedra.png";
        imagen.alt = "piedra";
        if(esJugador1 === true){
            if(esMano1 === true){
                contenedor = document.getElementById("mano1Jugador1");
            }else{
                contenedor = document.getElementById("mano2Jugador1");
            }
        }else{
            if(esMano1 === true){
                contenedor = document.getElementById("mano1Jugador2");
            }else{
                contenedor = document.getElementById("mano2Jugador2");
            }
        }
    }else if(numero%3 === 1){
        imagen.src = "../assets/PPTPapel.png";
        imagen.alt = "papel";
        if(esJugador1 === true){
            if(esMano1 === true){
                contenedor = document.getElementById("mano1Jugador1");
            }else{
                contenedor = document.getElementById("mano2Jugador1");
            }
        }else{
            if(esMano1 === true){
                contenedor = document.getElementById("mano1Jugador2");
            }else{
                contenedor = document.getElementById("mano2Jugador2");
            }
        }
    }else{
        imagen.src = "../assets/PPTTijeras.png";
        imagen.alt = "tijeras";
        if(esJugador1 === true){
            if(esMano1 === true){
                contenedor = document.getElementById("mano1Jugador1");
            }else{
                contenedor = document.getElementById("mano2Jugador1");
            }
        }else{
            if(esMano1 === true){
                contenedor = document.getElementById("mano1Jugador2");
            }else{
                contenedor = document.getElementById("mano2Jugador2");
            }
        }
    }
    contenedor.innerHTML = "";
    contenedor.appendChild(imagen);
}