
class Usuario{
    constructor(id, nombre, apellido, nip, apertura)
    {
        this.idUsuario = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nip = nip;
        this.saldo = apertura;
    }
}

let intentos = 0;
const ListaUsuarios = [];
const user01 = new Usuario("cliente01","Horacio","Tacubeño","0456",5000);
const user02 = new Usuario("cliente02","Marisol","Hernandez","1010",4000);
const user03 = new Usuario("cliente03","Marcela","Camacho","2021",3000);
ListaUsuarios.push(user01);
ListaUsuarios.push(user02);
ListaUsuarios.push(user03);
const sectionLogin = document.getElementById("login");
const sectionMenu = document.getElementById("menu");
const daddymain = document.querySelector("main");
const divStatus = document.getElementById("bannerStatus");
const divMovs = document.getElementById("bannerAcciones");

document.getElementById("btnLogin").addEventListener("click", ()=> Validate())

function Validate(){
    const inputUsuario = document.getElementById("loginIdUser");
    const inputNip = document.getElementById("loginNip");
    console.log(inputUsuario.value)
    console.log(inputNip.value)
    for(let i = 0; i<ListaUsuarios.length;i++){
        if(ListaUsuarios[i].idUsuario === inputUsuario.value && ListaUsuarios[i].nip === inputNip.value)
            OpenMenu(ListaUsuarios[i]);
    }
    intentos++;
    console.log("intentos " + intentos)
    if(intentos >= 3)
        blocked();
}

function OpenMenu(user){
    sectionLogin.style.display = "none";
    sectionMenu.style.display = "flex";
    OpenStatus(user.nombre, user.saldo);
}

function OpenStatus(nombre, saldo){
    const h1Saludo = document.createElement("h1");
    const h2Saldo = document.createElement("h2");
    h1Saludo.innerHTML = "Hola de nuevo, " + nombre;
    h2Saldo.innerHTML = "Tu saldo actual: " + saldo;
    divStatus.appendChild(h1Saludo);
    divStatus.appendChild(h2Saldo);
}

function OpenMovs(){

}

function blocked(){
    sectionLogin.style.display = "none";
    const sectionBlocked = document.createElement("blocked");
    const h1Blocked = document.createElement("blocked");
    sectionBlocked.id = "blocked";
    h1Blocked.innerHTML = "Se ha bloqueado la página por exceso de intentos."
    sectionBlocked.appendChild(h1Blocked);
    daddymain.appendChild(sectionBlocked);
}