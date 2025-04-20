class Transaccion{
    constructor(id, tipo, monto)
    {
        this.id = id;
        this.tipo = tipo;
        this.monto = monto;
        const ahora = new Date();
        this.fecha = ahora.toISOString();
    }
}

class Usuario{
    constructor(id, nombre, apellido, nip)
    {
        this.idUsuario = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nip = nip;
        this.saldo = 0;
        this.fails = 0;
        this.listTransacc = [];
    }
    
    deposito(monto){
        this.saldo += monto;
        const transacc = new Transaccion(this.listTransacc.length + 1, "Depósito: + $ ", monto);
        this.listTransacc.unshift(transacc);
    }

    retiro(monto){
        this.saldo -= monto;
        const transacc = new Transaccion(this.listTransacc.length + 1, "Retiro: - $ ", monto);
        this.listTransacc.unshift(transacc);
    }

    apertura(monto){
        this.saldo += monto;
        const transacc = new Transaccion(this.listTransacc.length + 1, "Apertura: + $ ", monto);
        this.listTransacc.unshift(transacc);
    }
}


const ListaUsuarios = [];
const ListaListeners = [];
const sectionSignup = document.getElementById("signup");
const sectionLogin = document.getElementById("login");
const sectionMenu = document.getElementById("menu");

requestAnimationFrame(() => { sectionLogin.classList.add("active"); })

document.getElementById("loginform").addEventListener("submit", function(e){
    e.preventDefault();
    generarUsuarios();
    ValidateLogin();
});

document.getElementById("btnOpenSignup").addEventListener("click", () => OpenSignup());

function ValidateLogin(){
    const inputUsuario = document.getElementById("loginIdUser");
    const inputNip = document.getElementById("loginNip");
    for(let i = 0; i < ListaUsuarios.length; i++){
        if(ListaUsuarios[i].idUsuario === inputUsuario.value){
            if(ListaUsuarios[i].nip === inputNip.value){
                OpenMenu(ListaUsuarios[i], sectionLogin, "submitLogin");
                warningCase("loginWarning");
                return;
            }else{
                ListaUsuarios[i].fails++;
                warningCase("loginWarning", "El NIP es incorrecto");
                if(ListaUsuarios[i].fails >= 3)
                    blocked();
                return;
            }
        }
    }
    warningCase("loginWarning", "El Usuario no existe");
}

function addListenerLocal(elemento, tipo, funcion){
    elemento.addEventListener(tipo, funcion);
    ListaListeners.push({ elemento, tipo, funcion });
}
  
function removerListenersLocales(){
    ListaListeners.forEach(listener => {
        listener.elemento.removeEventListener(listener.tipo, listener.funcion);
        ListaListeners.pop(listener);
    });
}

function OpenMenu(user, sectionType, btnClose){  //Solicita el usuario, el login/signup y idboton con que inicio 
    OpenSection(sectionMenu, sectionType, btnClose);
    const h1Saludo = document.getElementById("saludo");
    h1Saludo.innerHTML = "Hola de nuevo, " + user.nombre;
    const sectionSaldo = document.getElementById("panelSaldo");
    const sectionDepositar = document.getElementById("panelDeposito");
    const sectionRetirar = document.getElementById("panelRetiro");
    const sectionTransacc = document.getElementById("panelHistorial");
    const btnOpenSaldo = document.getElementById("btnOpenPanelSaldo");
    const btnOpenDeposito = document.getElementById("btnOpenDeposito");
    const btnOpenRetiro = document.getElementById("btnOpenRetiro");
    const btnOpenHistorial = document.getElementById("btnOpenHistorial");
    const btnCloseHistorial = document.getElementById("btnCloseHistorial");
    const btnCloseSaldo = document.getElementById("btnCloseSaldo");
    const formDeposito = document.getElementById("depositoform");
    const formRetiro = document.getElementById("retiroform");
    const ulHist = document.getElementById("listTransacc");
    const pSaldo = document.getElementById("saldo");
    addListenerLocal(btnOpenDeposito, "click", () => OpenSection(sectionDepositar, sectionMenu, "btnOpenDeposito"));
    addListenerLocal(btnOpenRetiro, "click", () => OpenSection(sectionRetirar, sectionMenu, "btnOpenRetiro"));
    addListenerLocal(formDeposito, "submit", (e) => actTransacc(e, user, sectionDepositar, "submitDeposito", "depoMonto", "depoWarning", "El deposito excede el saldo máximo permitido de $ 990."));
    addListenerLocal(formRetiro, "submit", (e) => actTransacc(e, user, sectionRetirar, "submitRetiro", "retiroMonto", "retiroWarning", "Retiro denegado. Debe tener al menos $ 10 de saldo en cuenta"));
    addListenerLocal(formDeposito, "reset", () => { warningCase("depoWarning"); OpenSection(sectionMenu, sectionDepositar, "resetDeposito"); });
    addListenerLocal(formRetiro, "reset", () => { warningCase("retiroWarning"); OpenSection(sectionMenu, sectionRetirar, "resetRetiro"); });
    addListenerLocal(btnOpenHistorial, "click", () => actHistorialTransacc(user, sectionTransacc));
    addListenerLocal(btnCloseHistorial, "click", () => { OpenSection(sectionMenu, sectionTransacc, "btnCloseHistorial"); ulHist.textContent = ""; });
    addListenerLocal(btnCloseSaldo, "click", () => OpenSection(sectionMenu, sectionSaldo, "btnCloseSaldo"));
    addListenerLocal(btnOpenSaldo, "click", () => { OpenSection(sectionSaldo, sectionMenu, "btnOpenPanelSaldo");
        pSaldo.textContent = user.nombre + ", Tu saldo es de: $ " + user.saldo;});
    document.getElementById("btnLogout").addEventListener("click", () => {
        removerListenersLocales();
        OpenSection(sectionLogin, sectionMenu, "btnLogout");
        ListaUsuarios.forEach(user => { user.fails = 0; });
    });
}

function actHistorialTransacc(user, sectionLocal){
    OpenSection(sectionLocal, sectionMenu, "btnOpenHistorial");
    const ulTransacc = document.getElementById("listTransacc");
    ulTransacc.textContent = "";
    user.listTransacc.forEach(transacc => {
        const liTransacc = document.createElement("li");
        liTransacc.innerHTML = "De: " + user.nombre + ". " + transacc.id + ". | " + transacc.fecha + " | " + transacc.tipo + transacc.monto;
        ulTransacc.appendChild(liTransacc);
    });
}

function actTransacc(e, user, sectionLocal, idSubmit, idInput, idWarninglabel, msjWarning){
    e.preventDefault();
    const input1 = document.getElementById(idInput);
    if(((parseInt(input1.value) + user.saldo) <= 990 ) && (idSubmit === "submitDeposito")){
        user.deposito(parseInt(input1.value));
    }else if(((user.saldo - parseInt(input1.value)) >= 10) && (idSubmit === "submitRetiro")){
        user.retiro(parseInt(input1.value));
    }else{ warningCase(idWarninglabel, msjWarning); return; }
    OpenSection(sectionMenu, sectionLocal, idSubmit);
    warningCase(idWarninglabel);
    input1.value = "";
}

function OpenSignup(){
    OpenSection(sectionSignup, sectionLogin, "btnOpenSignup");
    const inputUser = document.getElementById("signupUser");
    const inputNipX = document.getElementById("signupNIPX");
    const inputNipZ = document.getElementById("signupNIPY");
    const inputName = document.getElementById("signupNombre");
    const inputLast = document.getElementById("signupApellido");
    inputUser.addEventListener("keyup", () => confirmacionUser(inputUser));
    inputNipX.addEventListener("keyup", () => confirmacionNIP(inputNipX, inputNipZ));
    inputNipZ.addEventListener("keyup", () => confirmacionNIP(inputNipZ, inputNipX));
    inputName.addEventListener("keyup", () => confirmarNombre(inputName));
    inputLast.addEventListener("keyup", () => confirmarNombre(inputLast));
    document.getElementById("signupform").addEventListener("submit", function(e){
        e.preventDefault();
        if(!allgreen([inputUser, inputName, inputLast, inputNipX])){
            warningCase("signupWarning", "Los campos no se han llenado correctamente");
            return;
        }
        newUser = new Usuario(inputUser.value, inputName.value, inputLast.value, inputNipX.value);
        newUser.apertura(100);
        ListaUsuarios.push(newUser);
        OpenMenu(ListaUsuarios[ListaUsuarios.length - 1], sectionSignup, "submitSignup");
        setTimeout(() => { allImputsClean([inputUser, inputName, inputLast, inputNipX, inputNipZ]) }, 2200);
    });
    document.getElementById("signupform").addEventListener("reset", () => {
        warningCase("signupWarning");
        OpenSection(sectionLogin, sectionSignup, "resetSignup");
    });
}

function confirmarNombre(input1){
    if(!input1.value || !isNaN(input1.value) || isNumber(input1.value)){
        input1.style.borderColor = "#aa1111";
        !input1.value
            ? warningCase("signupWarning", "Completa el campo marcado")
            : warningCase("signupWarning", "El campo no acepta números");
    }else{
        input1.style.borderColor = "#11aa11";
        warningCase("signupWarning");
    }
}

function confirmacionUser(input1){
    if(!input1.value || !input1.value.trim()){
        input1.style.borderColor = "#aa1111";
        warningCase("signupWarning", "Completa el campo marcado");
        return;
    }

    for(let i = 0; i < ListaUsuarios.length; i++){
        if( ListaUsuarios[i].idUsuario === input1.value){
            input1.style.borderColor = "#aa1111";
            warningCase("signupWarning", "El Usuario ya existe"); 
            return;
        }else{
            input1.style.borderColor = "#11aa11";
            warningCase("signupWarning")
        }
    }
}

function confirmacionNIP(input1, input2){
    if(input1.value !== input2.value || input1.value.length < 4 || isNaN(input1.value)){
        input1.style.borderColor = "#aa1111";
        if(isNaN(input1.value)) { warningCase("signupWarning", "El NIP solo acepta digitos del 0 al 9"); return; }
        if(input1.value.length < 4) { warningCase("signupWarning", "Ingresa al menos 4 numeros para el NIP"); return; }
        input2.style.borderColor = "#aa1111";
        warningCase("signupWarning", "El NIP no coincide con la confirmación");
        return;
    }else{
        warningCase("signupWarning");
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

function generarUsuarios(){
    const nombres = ["Horacio", "Marisol", "Marcela", "Tacubeño", "Hernández", "Camacho"];
    for(let i = 0; i < 3; i++){
        const newUser = new Usuario("cliente0" + (i + 1), nombres[i], nombres[i + 3], "" + (2050 - i * 25));
        newUser.apertura(927 - 43 * i);
        ListaUsuarios.push(newUser);
    }
}

function blocked(){
    document.querySelectorAll("section").forEach(secc => {
        if(secc.id === "blocked")
            secc.style.display = "flex";
        else
            secc.remove();
    })
}

function OpenSection(sectionOpen, sectionClose, buttonCloseTemp){
    disabledElementTemp(buttonCloseTemp);
    sectionClose.classList.remove("active");
    sectionClose.addEventListener("transitionend", () => {
        sectionClose.style.display = "none";
        setTimeout(() => {
            sectionOpen.style.display = "flex";
            requestAnimationFrame(() => { sectionOpen.classList.add("active"); });
        }, 0);
    }, { once: true });
}

function disabledElementTemp(idInput){
    const input1 = document.getElementById(idInput);
    input1.disabled = true;
    setTimeout(() => { input1.disabled = false }, 2000);
}

function warningCase(idLabel, error){
    const labelWarning = document.getElementById(idLabel);
    labelWarning.style.color = "#aa1111";
    error ? labelWarning.innerHTML = error : labelWarning.textContent = "";
}

function allImputsClean(inputs){
    inputs.forEach(input1 => { input1.value = ""; input1.style.borderColor = ""; })
}

function isNumber(str){
    return /\d/.test(str); // /\d/ busca de 0-9, .test(str) retorna true si encuentra uno en str
}