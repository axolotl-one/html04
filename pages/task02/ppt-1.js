const radioUser = document.getElementById("modeUser");
const radioComputer = document.getElementById("modeComputer");
const radioStatusMenos1 = document.getElementById("statusMenos1Before");
const controlsUser = document.getElementById("controles-user");
const controlsComputer = document.getElementById("controles-computer");
const puntajes = [0,0,0,0];

radioUser.addEventListener("change", () => { changeControls(radioUser, controlsComputer, controlsUser) } );
radioComputer.addEventListener("change", () => { changeControls(radioComputer, controlsUser, controlsComputer) } );

//TODO Crear habilitado para skillLevel brutal, prototipo principal: funtion ComputerChooseBrutal(playerHandQuit)
//TODO Crear habilitado para modeGame hardcore, prototipo principal: funtion ProbabilityKill();

//Player vs Computer Active
document.getElementById("activarPiedra").addEventListener("click", () => AgregarMano("rock"));
document.getElementById("activarPapel").addEventListener("click", () => AgregarMano("paper"));
document.getElementById("activarTijeras").addEventListener("click", () => AgregarMano("scissors"));
document.getElementById("mano1Jugador1").addEventListener("click", () => MenosUnaJvC(true));
document.getElementById("mano2Jugador1").addEventListener("click", () => MenosUnaJvC(false));

//Computer vs Computer Active
document.getElementById("activarJuego").addEventListener("click", function () { ComputerChooseNormal(true); ComputerChooseNormal(false);});
document.getElementById("activarMenos1").addEventListener("click", ()=> {
    EvaluarResultado(ManoMenos((Math.floor(Math.random() * 3)%2) === 0, true), ManoMenos((Math.ceil(Math.random() * 21)%2) === 0, false))
    NuevaPartida();});

function AgregarMano(tiro){
    const imagen = document.createElement("img");
    imagen.src = "./assets/" + tiro + ".png"; imagen.alt = tiro;
    if(document.getElementById("mano1Jugador1").innerHTML === "") { document.getElementById("mano1Jugador1").appendChild(imagen); return; }
    if(document.getElementById("mano2Jugador1").innerHTML === "") { document.getElementById("mano2Jugador1").appendChild(imagen); 
        ComputerChooseNormal(false); }
}

function ComputerChooseNormal(esJ1){
    const random = Math.floor(Math.random() * 3);
    Seleccion(random, esJ1, true);
    const ahora = new Date
    ahora.getSeconds() % 2 === 0
        ? Seleccion((random + 1) % 3, esJ1, false)
        : Seleccion((random - 1) % 3, esJ1, false)
}

function MenosUnaJvC(esM1){
    const manosLanzadas = document.querySelectorAll(".manosLanzadas"); // Devuelve un NodeList
    // console.log(manosLanzadas); console.log(Array.from(manosLanzadas));
    const tirosCompletos = Array.from(manosLanzadas).every(mano => mano.innerHTML.trim() !== "");
    if(!tirosCompletos) { console.log("Faltan manos en la partida"); return }
    EvaluarResultado(ManoMenos(esM1, true), ManoMenos((Math.floor(Math.random() * 3)%2) === 0, false));
    NuevaPartida();
}

function ManoMenos(esM1, esJ1){
    document.getElementById("mano" + (esM1 ? 1 : 2) + "Jugador" + (esJ1 ? 1 : 2)).innerHTML = "";
    console.log("return" + document.getElementById("mano" + (esM1 ? 2 : 1) + "Jugador" + (esJ1 ? 1 : 2)).querySelector("img").alt)
    return document.getElementById("mano" + (esM1 ? 2 : 1) + "Jugador" + (esJ1 ? 1 : 2)).querySelector("img").alt;
}

/* TODO Probar cambiando el div mensaje por un parrafo interno */
function EvaluarResultado(manoFinalP1,manoFinalP2){
    document.getElementById("vista-winner").style.display = "block";
    const vistaWinner = document.getElementById("vista-winner-msj");
    const vistaScore = document.getElementById("tr-puntajes"); vistaScore.innerHTML = "";
    const partidas = document.createElement("td"); partidas.innerHTML = "" + ++puntajes[0];
    const victJ1 = document.createElement("td"); victJ1.innerHTML = "" + puntajes[1];
    const victJ2 = document.createElement("td"); victJ2.innerHTML = "" + puntajes[2];
    const empates = document.createElement("td"); empates.innerHTML = "" + puntajes[3];
    console.log(manoFinalP1 + " VS " + manoFinalP2);
    if(manoFinalP1 === manoFinalP2){
        console.log("Empate ");
        vistaWinner.innerHTML = "EMPATE";
        empates.innerHTML = "" + ++puntajes[3];
    }else if((manoFinalP1 === "rock" && manoFinalP2 === "scissors") || (manoFinalP1 === "paper" && manoFinalP2 === "rock") || (manoFinalP1 === "scissors" && manoFinalP2 === "paper")){
        console.log("Jugador 1 Gana ");
        vistaWinner.innerHTML = "El Jugador 001 gana esta ronda";
        victJ1.innerHTML = "" + ++puntajes[1];
    }else if((manoFinalP1 === "rock" && manoFinalP2 === "paper") || (manoFinalP1 === "paper" && manoFinalP2 === "scissors") || (manoFinalP1 === "scissors" && manoFinalP2 === "rock")){
        console.log("Jugador 2 Gana ");
        vistaWinner.innerHTML = "La Computadora gana esta ronda";
        victJ2.innerHTML = "" + ++puntajes[2];
    }
    vistaScore.append(partidas);
    vistaScore.append(victJ1);
    vistaScore.append(victJ2);
    vistaScore.append(empates);
}

function NuevaPartida(){
    setTimeout(() => {
        console.log("Tres segundos después...");
        const divsManosLanzadas = document.querySelectorAll(".manosLanzadas");
        document.getElementById("vista-winner-msj").innerHTML = "";
        document.getElementById("vista-winner").style.display = "none";
        divsManosLanzadas.forEach(caso => { caso.innerHTML = ""; });
    }, 3000);

}

function Seleccion(numero, esJugador1, esMano1){
    const imagen = document.createElement("img");
    let contenedor; 
    if(numero%3 === 0){
        imagen.src = "./assets/rock.png";
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
        imagen.src = "./assets/paper.png";
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
        imagen.src = "./assets/scissors.png";
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

function changeControls(radio, onControls, nextControls){
    if (radio.checked) {
        onControls.style.display = "none";
        nextControls.style.display = "inline";
        console.log("Cambio de Controles");
    }
}