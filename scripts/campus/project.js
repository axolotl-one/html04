
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
const user01 = new Usuario("cliente01","Horacio","Tacubeño","0456",950);
const user02 = new Usuario("cliente02","Marisol","Hernandez","1010",800);
const user03 = new Usuario("cliente03","Marcela","Camacho","2021",790);
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

function OpenMenu(user, sectionType){  //Solicita el usuario y el login/signup con que inicio
    sectionType.classList.remove("active");
    sectionType.addEventListener("transitionend", () => {
        sectionType.style.display = "none";
        setTimeout(() => {
            sectionMenu.style.display = "flex";
            requestAnimationFrame(() => { sectionMenu.classList.add("active");});
        }, 0);
    }, { once: true });
    OpenStatus(user.nombre, user.saldo);
    OpenMovs(user);
}

function OpenStatus(nombre, saldo){
    const h1Saludo = document.createElement("h1");
    const h2Saldo = document.createElement("h2");
    h1Saludo.innerHTML = "Hola de nuevo, " + nombre;
    //h2Saldo.innerHTML = "Tu saldo actual: " + saldo;
    divStatus.appendChild(h1Saludo);
    //divStatus.appendChild(h2Saldo);
}

function OpenMovs(user){
    const sectionSaldo = document.getElementById("consultarSaldo");
    const sectionDepositar = document.getElementById("depositar");
    const sectionRetirar = document.getElementById("retirar");
    // TODO: const sectionTransacc = document.getElementById("transacc");
    document.getElementById("btnConsultarSaldo").addEventListener("click", () => {
        OpenSection(sectionSaldo, sectionMenu);
        actConsultarSaldo(user, sectionSaldo);
    });
    document.getElementById("btnOpenDeposito").addEventListener("click", () => { 
        OpenSection(sectionDepositar, sectionMenu);
        actDeposito(user, sectionDepositar);
    });
    document.getElementById("btnOpenRetiro").addEventListener("click", () => { 
        OpenSection(sectionRetirar, sectionMenu);
        actRetiro(user, sectionRetirar);
    });
}

function OpenSection(sectionOpen, sectionClose){  // :TODO: Aplicar la funcion para todos los OpenSeccion; p.e. OpenMenu
    sectionClose.classList.remove("active");
    console.log("Close class active of " + sectionClose.id);
    console.log("Waiting transition end of " + sectionClose.id);
    sectionClose.addEventListener("transitionend", () => {
        sectionClose.style.display = "none";
        console.log("Close display to none of " + sectionClose.id);
        setTimeout(() => {
            sectionOpen.style.display = "flex";
            console.log("Open display flex of " + sectionOpen.id)
            requestAnimationFrame(() => { sectionOpen.classList.add("active"); console.log("Open Class of " + sectionOpen.id)})
        }, 0);
    }, { once: true });
}

function actConsultarSaldo(user, sectionClose){
    document.getElementById("btnCloseSaldo").addEventListener("click", () => OpenSection(sectionMenu, sectionClose));
    const pSaldo = document.getElementById("saldo");
    pSaldo.textContent = "Tu saldo es de: $ " + user.saldo;
}

function actDeposito(user, sectionClose){
    document.getElementById("depositoform").addEventListener("submit", function(e){
        e.preventDefault();
        const inputDepo = document.getElementById("depoMonto");
        if((parseInt(inputDepo.value) + user.saldo) <= 990){
            document.getElementById("btnDepositar").disabled = true;
            setTimeout(() => { document.getElementById("btnDepositar").disabled = false; }, 2000);
            user.saldo += parseInt(inputDepo.value);
            inputDepo.value = "";
            warningCase("depoWarning",3,0);
            OpenSection(sectionMenu, sectionClose);
            return;
        }
        else
            warningCase("depoWarning",3,31);
    });
    document.getElementById("depositoform").addEventListener("reset", function(e) {
        e.preventDefault();
        OpenSection(sectionMenu, sectionClose);
    });
}

function actRetiro(user, sectionClose){
    document.getElementById("retiroform").addEventListener("submit", function(e){
        e.preventDefault();
        const inputRetiro = document.getElementById("retiroMonto");
        if((user.saldo - parseInt(inputRetiro.value)) >= 10){
            document.getElementById("btnRetirar").disabled = true;
            setTimeout(() => { document.getElementById("btnDepositar").disabled = false; }, 2000);
            user.saldo -= parseInt(inputRetiro.value);
            inputRetiro.value = "";
            warningCase("retiroWarning",3,0);
            OpenSection(sectionMenu, sectionClose);
            return;
        }
        else
            warningCase("retiroWarning",3,32);
    });
    document.getElementById("retiroform").addEventListener("reset", function(e) {
        e.preventDefault();
        OpenSection(sectionMenu, sectionClose);
    });
}

function warningCase(idLabel, numSection, error){  // TODO: Aplicar la funcion para todos los warninglabel; p.e. warningSignup
    const labelWarning = document.getElementById(idLabel);
    labelWarning.style.color = "#aa1111";
    error === 1 ? labelWarning.innerHTML = "Error indefinido"
    : error === 31 ? labelWarning.innerHTML = "El deposito excede el saldo máximo permitido de $ 990."
    : error === 32 ? labelWarning.innerHTML = "Retiro denegado. Debe tener al menos $ 10 de saldo en cuenta"
    : error === 33 ? labelWarning.innerHTML = "El NIP no coincide con la confirmación"
    : error === 34 ? labelWarning.innerHTML = "Ingresa al menos 4 numeros para el NIP"
    : error === 35 ? labelWarning.innerHTML = "El NIP solo acepta digitos del 0 al 9"
    : error === 36 ? labelWarning.innerHTML = "Los campos no se han llenado correctamente"
    : labelWarning.textContent = "";
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
                    newUser = new Usuario(inputUser.value, inputName.value, inputLast.value, inputNipX.value, 100);
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


/* Cambio de opacity de 0 a 1 cuando el display cambia de none a flex
~~~~~~~~~~~~~
#elemento {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

#elemento.activo {
  opacity: 1;
}
~~~~~~~
const elemento = document.getElementById("elemento");

function activarElemento() {
  elemento.style.display = "flex";
  requestAnimationFrame(() => {
    element.classList.add("activo"); //crea la clase
  });
}

function desactivarElemento() {
  element.classList.remove("activo"); //elimina la clase
  element.addEventListener('transitionend', () => {
    element.style.display = 'none';  //espera el fin de la transicion para desactivar el display
  }, { once: true });
}*/