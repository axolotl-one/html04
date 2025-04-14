
class Usuario{
    constructor(id, nombre, apellido, nip, apertura)
    {
        this.idUsuario = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nip = nip;
        this.saldo = apertura;
        this.fails = 0;
    }
}


const ListaUsuarios = [];
const user01 = new Usuario("cliente01","Horacio","Tacubeño","0456",5000);
const user02 = new Usuario("cliente02","Marisol","Hernandez","1010",4000);
const user03 = new Usuario("cliente03","Marcela","Camacho","2021",3000);
ListaUsuarios.push(user01);
ListaUsuarios.push(user02);
ListaUsuarios.push(user03);
const sectionSignup = document.getElementById("signup");
const sectionLogin = document.getElementById("login");
const sectionMenu = document.getElementById("menu");
const daddymain = document.querySelector("main");
const divStatus = document.getElementById("bannerStatus");
const divMovs = document.getElementById("bannerAcciones");

//addEventListener("transitionend", () => { sectionLogin.classList.add() })

requestAnimationFrame(() => { sectionLogin.classList.add("active"); })

document.getElementById("btnLogin").addEventListener("click", () => Validate());

document.getElementById("btnDepositar").addEventListener("click", () => OpenDepositar());

document.getElementById("btnLogout").addEventListener("click", () => CloseMenu());

document.getElementById("btnOpenSignup").addEventListener("click", () => OpenSignup());

function Validate(){
    const inputUsuario = document.getElementById("loginIdUser");
    const inputNip = document.getElementById("loginNip");
    console.log(inputUsuario.value)
    console.log(inputNip.value)
    for(let i = 0; i<ListaUsuarios.length;i++){
        if(ListaUsuarios[i].idUsuario === inputUsuario.value){
            if(ListaUsuarios[i].nip === inputNip.value){            
                OpenMenu(ListaUsuarios[i]);
                return;
            }else{
                ListaUsuarios[i].fails++;
                warningBlocked(true);
                if(ListaUsuarios[i].fails >= 3)
                    blocked();
                return;
            }
        }
    }
    warningBlocked(false); //el usuario no existe
}

function OpenMenu(user){
    sectionLogin.classList.remove("active");
    sectionLogin.addEventListener("transitionend", () => {
        sectionLogin.style.display = "none";
        setTimeout(() => {
            sectionMenu.style.display = "flex";
            requestAnimationFrame(() => { sectionMenu.classList.add("active");});
        }, 0);
    }, { once: true });
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

function OpenSignup(){
    sectionLogin.classList.remove("active");
    sectionLogin.addEventListener("transitionend", () => {
        sectionLogin.style.display = "none";
        setTimeout(() => {
            sectionSignup.style.display = "flex";
            requestAnimationFrame(() => { sectionSignup.classList.add("active");});
        }, 0);
    }, { once: true });
}

function blocked(){
    sectionLogin.style.display = "none";
    const sectionBlocked = document.createElement("section");
    const divIcon = document.createElement("div")
    const h1Blocked = document.createElement("h1");
    sectionBlocked.id = "blocked";
    h1Blocked.innerHTML = "Se ha bloqueado el usuario por exceso de intentos.";
    sectionBlocked.appendChild(divIcon)
    sectionBlocked.appendChild(h1Blocked);
    daddymain.appendChild(sectionBlocked);
}

function warningBlocked(errorEnPassword){
    const labelWarning = document.getElementById("loginWarning");
    labelWarning.style.color = "#aa1111";
    errorEnPassword //Operadores ternarios para este estado
        ? labelWarning.innerHTML = "El NIP es incorrecto"
        : labelWarning.innerHTML = "El usuario no existe";
}

function CloseMenu(){
    sectionMenu.classList.remove("active");
    sectionMenu.addEventListener("transitionend", () => {
        sectionMenu.style.display = "none";
        setTimeout(() => {
            sectionLogin.style.display = "flex";
            requestAnimationFrame(() => sectionLogin.classList.add("active"))
        }, 0)
        const labelWarning = document.getElementById("loginWarning");
        labelWarning.innerHTML = ""; //respeta etiquetas al limpiar
        divStatus.textContent = "";  //no respeta etiquetas al limpiar
    }, { once: true });
    ListaUsuarios.forEach(user => { user.fails = 0; })
}