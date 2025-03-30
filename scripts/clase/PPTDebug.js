const radioUser = document.getElementById("modeUser");
const radioComputer = document.getElementById("modeComputer");
const radioStatusMenos1 = document.getElementById("statusMenos1Before");
const divUser = document.getElementById("elementsUser");
const divComputer = document.getElementById("elementsComputer");

radioUser.addEventListener("change", ()=>{
    if (radioUser.checked) {
        divUser.style.display = "inline";
        divComputer.style.display = "none";
        console.log("Cambio a User");
    }
    console.log(radioUser.checked);
});

radioComputer.addEventListener("change", ()=> {
    if (radioComputer.checked) {
        divComputer.style.display = "inline";
        divUser.style.display = "none";
        console.log("Cambio a Computer cx");
    }
    console.log(radioUser.checked);
});

//TODO Crear habilitado para skillLevel brutal, prototipo principal: funtion ComputerChooseBrutal(playerHandQuit)
//TODO Crear habilitado para modeGame hardcore, prototipo principal: funtion ProbabilityKill();

//Player vs Computer Active

document.getElementById("activarPiedra").addEventListener("click", ()=>AgregarMano("rock"));

document.getElementById("activarPapel").addEventListener("click", ()=>AgregarMano("paper"));

document.getElementById("activarTijeras").addEventListener("click", ()=>AgregarMano("scissors"));

document.getElementById("mano1Jugador1").addEventListener("click", ()=>MenosUna(1));

document.getElementById("mano2Jugador1").addEventListener("click", ()=>MenosUna(2));

//Computer vs Computer Active

document.getElementById("activarJuego").addEventListener("click", function () {
    ComputerChooseNormal(true);
    ComputerChooseNormal(false);
});

document.getElementById("activarMenos1").addEventListener("click", ()=> MenosUna(3))

function AgregarMano(tiro){
    const imagen = document.createElement("img");
    imagen.src = "../assets/manos/" + tiro + ".png";
    imagen.alt = tiro;
    const contenedor1 = document.getElementById("mano1Jugador1");
    const contenedor2 = document.getElementById("mano2Jugador1");
    if(contenedor1.innerHTML === ""){
        contenedor1.appendChild(imagen);
    }else if(contenedor2.innerHTML === ""){
        contenedor2.appendChild(imagen);
        ComputerChooseNormal(false);
    }
}

function ComputerChooseNormal(esJugador1){
    const random1 = Math.floor(Math.random() * 3);
    Seleccion(random1,esJugador1,true);
    const ahora = new Date;
    if(ahora.getSeconds()%2 === 0){
        Seleccion((random1 + 1), esJugador1, false);
    }else{
        Seleccion((random1 - 1), esJugador1, false);
    }
}


function MenosUna(manoJugador1){
    let tirosCompletos = true;
    const divsManosLanzadas = document.querySelectorAll(".manosLanzadas")
    divsManosLanzadas.forEach(caso => {
        if(caso.innerHTML === ""){
            tirosCompletos = false;
            return; //Solo cierra la funcion anonima interna
        }
    });

    if(tirosCompletos === true){
        let mano1P1Quit;
        let mano1P2Quit = MenosUnaLocal((Math.floor(Math.random() * 3)%2 + 1), 2);
        if( manoJugador1 === 3)
            mano1P1Quit = MenosUnaLocal((Math.floor(Math.random() * 21)%2 + 1), 1);
        else
            mano1P1Quit = MenosUnaLocal(manoJugador1, 1);
        //Trabajar con la mano NO quitada (!mano1PQuit)
        if(!mano1P1Quit === true){
            const divMano1Player1 = document.getElementById("mano1Jugador1");
            imagenContenida1 = divMano1Player1.querySelector("img");
        }else{
            const divMano2Player1 = document.getElementById("mano2Jugador1");
            imagenContenida1 = divMano2Player1.querySelector("img");
        }
        if(!mano1P2Quit === true){
            const divMano1Player2 = document.getElementById("mano1Jugador2");
            imagenContenida2 = divMano1Player2.querySelector("img");
        }else{
            const divMano1Player2 = document.getElementById("mano2Jugador2");
            imagenContenida2 = divMano1Player2.querySelector("img");
        }
        EvaluarResultado(imagenContenida1.alt, imagenContenida2.alt);
        setTimeout(() => {
            console.log("Tres segundos después...");       
            NuevaPartida();
            // Aquí continúa el resto del código
          }, 3000);
    }else{
        console.log("faltan elementos")
    }
}

function MenosUnaLocal(mano, jugador){  //Retorna mano quitada, true si es la 1, false si es la 2
    let contenedor;
    let esMano1 = true;
    if(mano == 1){
        contenedor = document.getElementById("mano" + mano +"Jugador" + jugador);
    }else if(mano == 2){
        contenedor = document.getElementById("mano" + mano + "Jugador" + jugador);
        esMano1 = false;
    }else{
        console.log("mano:" + mano);
        console.log("jUGADOR" + jugador);
        return;
    }
    contenedor.innerHTML = "";
    return esMano1;
}

/* TODO Probar cambiando el div mensaje por un parrafo interno */
function EvaluarResultado(manoFinalP1,manoFinalP2){
    const divMensaje = document.getElementById("mensaje");
    divMensaje.style.display = "block"
    console.log(manoFinalP1 + " VS " + manoFinalP2);
    if(manoFinalP1 === manoFinalP2){
        console.log("Empate");
        divMensaje.innerHTML = "EMPATE";
    }else if((manoFinalP1 === "rock" && manoFinalP2 === "scissors") || (manoFinalP1 === "paper" && manoFinalP2 === "rock") || (manoFinalP1 === "scissors" && manoFinalP2 === "paper")){
        console.log("Jugador 1 Gana");
        divMensaje.innerHTML = "El Jugador 001 gana esta ronda";
    }else if((manoFinalP1 === "rock" && manoFinalP2 === "paper") || (manoFinalP1 === "paper" && manoFinalP2 === "scissors") || (manoFinalP1 === "scissors" && manoFinalP2 === "rock")){
        console.log("Jugador 2 Gana");
        divMensaje.innerHTML = "La Computadora gana esta ronda";
    }
}

function NuevaPartida(){
    const divsManosLanzadas = document.querySelectorAll(".manosLanzadas");
    const divMensaje = document.getElementById("mensaje");
    divMensaje.innerHTML = "";
    divMensaje.style.display = "none";
    divsManosLanzadas.forEach(caso => {
        caso.innerHTML = "";
    });
}

function Seleccion(numero, esJugador1, esMano1){
    const imagen = document.createElement("img");
    let contenedor; 
    if(numero%3 === 0){
        imagen.src = "../assets/manos/rock.png";
        imagen.alt = "rock";
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
        imagen.src = "../assets/manos/paper.png";
        imagen.alt = "paper";
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
        imagen.src = "../assets/manos/scissors.png";
        imagen.alt = "scissors";
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