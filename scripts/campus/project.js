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
        const transacc = new Transaccion(this.listTransacc.length+1, "Depósito: + $ ", monto);
        this.listTransacc.unshift(transacc);
    }

    retiro(monto){
        this.saldo -= monto;
        const transacc = new Transaccion(this.listTransacc.length+1, "Retiro: - $ ", monto);
        this.listTransacc.unshift(transacc);
    }

    apertura(monto){
        this.saldo += monto;
        const transacc = new Transaccion(this.listTransacc.length+1, "Apertura: + $ ", monto);
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
                warningCase("loginWarning", 1, 0);
                OpenMenu(ListaUsuarios[i], sectionLogin);
                return;
            }else{
                ListaUsuarios[i].fails++;
                warningCase("loginWarning", 1, 12);
                if(ListaUsuarios[i].fails >= 3)
                    blocked();
                return;
            }
        }
    }
    warningCase("loginWarning", 1, 11); //el usuario no existe
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

function OpenMenu(user, sectionType){  //Solicita el usuario y el login/signup con que inicio
    OpenSection(sectionMenu, sectionType);
    const h1Saludo = document.getElementById("saludo");
    h1Saludo.innerHTML = "Hola de nuevo, " + user.nombre;
    const sectionSaldo = document.getElementById("consultarSaldo");
    const sectionDepositar = document.getElementById("depositar");
    const sectionRetirar = document.getElementById("retirar");
    const sectionTransacc = document.getElementById("transacc");
    const btnOpenSaldo = document.getElementById("btnConsultarSaldo");
    const btnOpenDeposito = document.getElementById("btnOpenDeposito");
    const btnOpenRetiro = document.getElementById("btnOpenRetiro");
    const btnOpenHistorial = document.getElementById("btnOpenTransacc");
    const btnCloseHistorial = document.getElementById("btnCloseHistorial");
    const btnCloseSaldo = document.getElementById("btnCloseSaldo");
    const formDeposito = document.getElementById("depositoform");
    const formRetiro = document.getElementById("retiroform");
    const ulTransacc = document.getElementById("listTransacc");
    const pSaldo = document.getElementById("saldo");
    addListenerLocal(btnOpenDeposito, "click", () => { OpenSection(sectionDepositar, sectionMenu); disabledElementTemp("btnOpenDeposito"); });
    addListenerLocal(btnOpenRetiro, "click", () => { OpenSection(sectionRetirar, sectionMenu); disabledElementTemp("btnOpenRetiro"); });
    addListenerLocal(formDeposito, "submit", (e) => actTransacc(e, user, "submitDeposito", "depoMonto", "depoWarning", 31, sectionDepositar));
    addListenerLocal(formRetiro, "submit", (e) => actTransacc(e, user, "submitRetiro", "retiroMonto", "retiroWarning", 32, sectionRetirar));
    addListenerLocal(formDeposito, "reset", () => { warningCase("depoWarning", 4, 0); OpenSection(sectionMenu, sectionDepositar); });
    addListenerLocal(formRetiro, "reset", () => { warningCase("retiroWarning", 4, 0); OpenSection(sectionMenu, sectionRetirar); });
    addListenerLocal(btnOpenHistorial, "click", () => actHistorialTransacc(user, sectionTransacc));
    addListenerLocal(btnCloseHistorial, "click", () => { OpenSection(sectionMenu, sectionTransacc); ulTransacc.textContent = ""; });
    addListenerLocal(btnCloseSaldo, "click", () => OpenSection(sectionMenu, sectionSaldo));
    addListenerLocal(btnOpenSaldo, "click", () => { OpenSection(sectionSaldo, sectionMenu);
        pSaldo.textContent = user.nombre + ", Tu saldo es de: $ " + user.saldo;});
    document.getElementById("btnLogout").addEventListener("click", () => {
        disabledElementTemp("btnLogout");
        console.log(ListaListeners.forEach(listener => {listener.elemento + " ";}));
        removerListenersLocales();
        OpenSection(sectionLogin, sectionMenu);
        ListaUsuarios.forEach(user => { user.fails = 0; });
    });
}

function actHistorialTransacc(user, sectionLocal){
    disabledElementTemp("btnOpenTransacc");
    OpenSection(sectionLocal, sectionMenu);
    const ulTransacc = document.getElementById("listTransacc");
    ulTransacc.textContent = "";
    user.listTransacc.forEach(transacc => {
        const liTransacc = document.createElement("li");
        liTransacc.innerHTML = "De: " + user.nombre + ". " + transacc.id + ". | " + transacc.fecha + " | " + transacc.tipo + transacc.monto;
        ulTransacc.appendChild(liTransacc);
    });
}

function actTransacc(e, user, idSubmit, idInput, idWarninglabel, idWarningCase, sectionLocal){
    e.preventDefault();
    const input1 = document.getElementById(idInput);
    if(((parseInt(input1.value) + user.saldo) <= 990 ) && (idSubmit === "submitDeposito")){
        user.deposito(parseInt(input1.value)); console.log("Entrada: " + input1.value + " | saldo: " + user.saldo);
    }else if(((user.saldo - parseInt(input1.value)) >= 10) && (idSubmit === "submitRetiro")){
        user.retiro(parseInt(input1.value)); console.log("Entrada: " + input1.value + " | saldo: " + user.saldo);
    }else{ warningCase(idWarninglabel, 4, idWarningCase); console.log("Entrada: " + input1.value + " | saldo: " + user.saldo); return; }
    disabledElementTemp(idSubmit);
    input1.value = "";
    warningCase(idWarninglabel, 4, 0);
    OpenSection(sectionMenu, sectionLocal);
}

function OpenSignup(){
    OpenSection(sectionSignup, sectionLogin);
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
        if(!allgreen([inputUser, inputName, inputLast, inputNipX])){
            warningCase("signupWarning", 4, 27);
            return;
        }
        disabledElementTemp("submitSignup");
        newUser = new Usuario(inputUser.value, inputName.value, inputLast.value, inputNipX.value);
        newUser.apertura(100);
        ListaUsuarios.push(newUser);
        OpenMenu(ListaUsuarios[ListaUsuarios.length - 1], sectionSignup);
        setTimeout(() => { allImputsClean([inputUser, inputName, inputLast, inputNipX, inputNipZ]) }, 2200);
    });
    document.getElementById("signupform").addEventListener("reset", () => {
        warningCase("signupWarning", 4, 0);
        OpenSection(sectionLogin, sectionSignup);
    });
}

function confirmarNombre(input1){
    if(!input1.value || !isNaN(input1.value) || isNumber(input1.value)){
        input1.style.borderColor = "#aa1111";
        !input1.value
            ? warningCase("signupWarning", 4, 21)
            : warningCase("signupWarning", 4, 23);
    }else{
        input1.style.borderColor = "#11aa11";
        warningCase("signupWarning", 4, 0);
    }
}

function confirmacionUser(input1){
    if(!input1.value || !input1.value.trim()){
        input1.style.borderColor = "#aa1111";
        warningCase("signupWarning", 4, 21);
        return;
    }

    for(let i = 0; i < ListaUsuarios.length; i++){
        if( ListaUsuarios[i].idUsuario === input1.value){
            input1.style.borderColor = "#aa1111";
            warningCase("signupWarning", 4, 22); 
            return;
        }else{
            input1.style.borderColor = "#11aa11";
            warningCase("signupWarning", 4, 0)
        }
    }
}

function confirmacionNIP(input1, input2){
    console.log(input1.value + " " + input2.value);
    if(input1.value !== input2.value || input1.value.length < 4 || isNaN(input1.value)){
        input1.style.borderColor = "#aa1111";
        if(isNaN(input1.value)) { warningCase("signupWarning", 4, 26); return; }
        if(input1.value.length < 4) { warningCase("signupWarning", 4, 25); return; }
        input2.style.borderColor = "#aa1111";
        warningCase("signupWarning", 4, 24);
        return;
    }else{
        warningCase("signupWarning", 4, 0);
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
    const nombres = ["Horacio", "Marisol", "Marcela","Tacubeño","Hernández", "Camacho"];
    for(let i = 0; i<3; i++){
        const newUser = new Usuario("cliente0" + (i + 1),nombres[i], nombres[i + 3], "" + (2050 - i * 25));
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

function OpenSection(sectionOpen, sectionClose){
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

function disabledElementTemp(idInput){
    const input1 = document.getElementById(idInput);
    input1.disabled = true;
    setTimeout(() => { input1.disabled = false }, 2000);
}

function warningCase(idLabel, numSection, error){  // 1.Login 2.Signup 3.Menu 4.Operaciones
    const labelWarning = document.getElementById(idLabel);
    labelWarning.style.color = "#aa1111";
    error === 1 ? labelWarning.innerHTML = "Error indefinido"
    : error === 11 ? labelWarning.innerHTML = "El Usuario no existe"
    : error === 12 ? labelWarning.innerHTML = "El NIP es incorrecto"
    : error === 21 ? labelWarning.innerHTML = "Completa el campo marcado"
    : error === 22 ? labelWarning.innerHTML = "El Usuario ya existe"
    : error === 23 ? labelWarning.innerHTML = "El campo no acepta números"
    : error === 24 ? labelWarning.innerHTML = "El NIP no coincide con la confirmación"
    : error === 25 ? labelWarning.innerHTML = "Ingresa al menos 4 numeros para el NIP"
    : error === 26 ? labelWarning.innerHTML = "El NIP solo acepta digitos del 0 al 9"
    : error === 27 ? labelWarning.innerHTML = "Los campos no se han llenado correctamente"
    : error === 31 ? labelWarning.innerHTML = "El deposito excede el saldo máximo permitido de $ 990."
    : error === 32 ? labelWarning.innerHTML = "Retiro denegado. Debe tener al menos $ 10 de saldo en cuenta"
    : labelWarning.textContent = "";
}

function allImputsClean(inputs){
    inputs.forEach(input1 => { input1.value = ""; input1.style.borderColor = ""; })
}

function isNumber(str){
    return /\d/.test(str); // /\d/ busca de 0-9, .test(str) retorna true si encuentra uno en str
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

labelWarning.innerHTML = ""; //respeta etiquetas al limpiar
divStatus.textContent = "";  //no respeta etiquetas al limpiar
}*/