
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

document.getElementById("loginform").addEventListener("submit", function(e){
    e.preventDefault();
    Validate();
});

document.getElementById("btnDepositar").addEventListener("click", () => OpenDepositar());

document.getElementById("btnLogout").addEventListener("click", () => CloseMenu());

document.getElementById("btnOpenSignup").addEventListener("click", () => OpenSignup());

function Validate(){
    const inputUsuario = document.getElementById("loginIdUser");
    const inputNip = document.getElementById("loginNip");
    for(let i = 0; i<ListaUsuarios.length;i++){
        if(ListaUsuarios[i].idUsuario === inputUsuario.value){
            if(ListaUsuarios[i].nip === inputNip.value){            
                OpenMenu(ListaUsuarios[i],sectionLogin);
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

function OpenMenu(user, sectionType){
    sectionType.classList.remove("active");
    sectionType.addEventListener("transitionend", () => {
        sectionType.style.display = "none";
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
            const inputUser = document.getElementById("signupUser");
            const inputNipX = document.getElementById("signupNIPX");
            const inputNipZ = document.getElementById("signupNIPY");
            const inputName = document.getElementById("signupNombre");
            const inputLast = document.getElementById("signupApellido");
            inputUser.addEventListener("keyup", () => confirmacionUser(inputUser));
            inputNipX.addEventListener("keyup", () => confirmacionNIP(inputNipX,inputNipZ));
            inputNipZ.addEventListener("keyup", () => confirmacionNIP(inputNipZ,inputNipX));
            inputName.addEventListener("keyup", () => confirmarNombre(inputName));
            inputLast.addEventListener("keyup", () => confirmarNombre(inputLast));
            document.getElementById("signupform").addEventListener("submit", function(e){
                e.preventDefault();
                if(allgreen([inputUser, inputName, inputLast, inputNipX])){
                    btnSignup = document.getElementById("btnSignup");
                    btnSignup.disabled = true;
                    newUser = new Usuario(inputUser.value, inputName.value, inputLast.value, inputNipX.value, 1000);
                    ListaUsuarios.push(newUser);
                    OpenMenu(ListaUsuarios[ListaUsuarios.length-1],sectionSignup);
                    setTimeout(() => { allImputsClean([inputUser, inputName, inputLast, inputNipX, inputNipZ]); btnSignup.disabled = false },2200);
                }else{
                    warningSignup(7);
                }
            });
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

function warningSignup(error){
    const labelWarning = document.getElementById("signupWarning");
    labelWarning.style.color = "#aa1111";
    error === 1 ? labelWarning.innerHTML = "El Usuario ya existe"
    : error === 2 ? labelWarning.innerHTML = "Completa el campo marcado"
    : error === 3 ? labelWarning.innerHTML = "El campo no acepta números"
    : error === 4 ? labelWarning.innerHTML = "El NIP no coincide con la confirmación"
    : error === 5 ? labelWarning.innerHTML = "Ingresa al menos 4 numeros para el NIP"
    : error === 6 ? labelWarning.innerHTML = "El NIP solo acepta digitos del 0 al 9"
    : error === 7 ? labelWarning.innerHTML = "Los campos no se han llenado correctamente"
    : labelWarning.textContent = "";
}

function confirmarNombre(input1){
    if(!input1.value || !isNaN(input1.value) || isNumber(input1.value)){
        input1.style.borderColor = "#aa1111";
        !input1.value
            ? warningSignup(2)
            : warningSignup(3);
    }else{
        input1.style.borderColor = "#11aa11";
        warningSignup(0);
    }
}

function confirmacionUser(input1){
    if(!input1.value || !input1.value.trim()){
        input1.style.borderColor = "#aa1111";
        warningSignup(2);
        return;
    }

    for(let i = 0; i < ListaUsuarios.length; i++)
    {
        if( ListaUsuarios[i].idUsuario === input1.value){
            input1.style.borderColor = "#aa1111";
            warningSignup(1); 
            return;
        }else{
            input1.style.borderColor = "#11aa11";
            warningSignup(0);
        }
    }
}

function confirmacionNIP(input1, input2){
    console.log(input1.value + " " + input2.value);
    if(input1.value !== input2.value || input1.value.length < 4 || isNaN(input1.value)){
        input1.style.borderColor = "#aa1111";
        if(isNaN(input1.value)) { warningSignup(6); return; }
        if(input1.value.length < 4) { warningSignup(5); return; }
        input2.style.borderColor = "#aa1111";
        warningSignup(4);
        return;
    }else{
        warningSignup(0);
        input1.style.borderColor = "#11aa11";
        input2.style.borderColor = "#11aa11";
    }
}

function allgreen(inputs){
    for(let i = 0; i < inputs.length; i++)
        if(inputs[i].style.borderColor !== "rgb(17, 170, 17)")
            return false;
    return true;
}

function allImputsClean(inputs){
    inputs.forEach(input1 => { input1.value = ""; input1.style.borderColor = ""; })
}

function isNumber(str){
    return /\d/.test(str); // /\d/ busca de 0-9, .test(str) retorna true si encuentra uno en str
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