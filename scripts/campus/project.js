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
        const transacc = new Transaccion(this.listTransacc.length+1,"Depósito: + $ ", monto);
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
const user01 = new Usuario("cliente01","Horacio","Tacubeño","0456");
const user02 = new Usuario("cliente02","Marisol","Hernandez","1010");
const user03 = new Usuario("cliente03","Marcela","Camacho","2021");
user01.apertura(912);
user02.apertura(807);
user03.apertura(789);
ListaUsuarios.push(user01);
ListaUsuarios.push(user02);
ListaUsuarios.push(user03);
const sectionSignup = document.getElementById("signup");
const sectionLogin = document.getElementById("login");
const sectionMenu = document.getElementById("menu");
const daddymain = document.querySelector("main");
const divStatus = document.getElementById("bannerStatus");
const divMovs = document.getElementById("bannerAcciones");

requestAnimationFrame(() => { sectionLogin.classList.add("active"); })

document.getElementById("loginform").addEventListener("submit", function(e){
    e.preventDefault();
    ValidateLogin();
});

document.getElementById("btnLogout").addEventListener("click", () => CloseMenu());

document.getElementById("btnOpenSignup").addEventListener("click", () => OpenSignup());

function ValidateLogin(){
    const inputUsuario = document.getElementById("loginIdUser");
    const inputNip = document.getElementById("loginNip");
    for(let i = 0; i<ListaUsuarios.length;i++){
        if(ListaUsuarios[i].idUsuario === inputUsuario.value){
            if(ListaUsuarios[i].nip === inputNip.value){
                warningCase("loginWarning",1,0);
                OpenMenu(ListaUsuarios[i],sectionLogin);
                return;
            }else{
                ListaUsuarios[i].fails++;
                warningCase("loginWarning",1,12);
                if(ListaUsuarios[i].fails >= 3)
                    blocked();
                return;
            }
        }
    }
    warningCase("loginWarning",1,11); //el usuario no existe
}

function OpenMenu(user, sectionType){  //Solicita el usuario y el login/signup con que inicio
    OpenSection(sectionMenu, sectionType);
    OpenStatus(user.nombre, user.saldo);
    OpenMovs(user);
}

function OpenStatus(nombre){
    const h1Saludo = document.getElementById("saludo");
    h1Saludo.innerHTML = "Hola de nuevo, " + nombre;
}

function OpenMovs(user){
    const sectionSaldo = document.getElementById("consultarSaldo");
    const sectionDepositar = document.getElementById("depositar");
    const sectionRetirar = document.getElementById("retirar");
    const sectionTransacc = document.getElementById("transacc");
    document.getElementById("btnConsultarSaldo").addEventListener("click", () => {
        OpenSection(sectionSaldo, sectionMenu);
        actConsultarSaldo(user, sectionSaldo);
    });
    document.getElementById("btnOpenDeposito").addEventListener("click", () => { 
        OpenSection(sectionDepositar, sectionMenu);
        actTransacc(user, "depositoform", "submitDeposito", "depoMonto", "depoWarning", 31, sectionDepositar);
    });
    document.getElementById("btnOpenRetiro").addEventListener("click", () => { 
        OpenSection(sectionRetirar, sectionMenu);
        actTransacc(user, "retiroform", "submitRetiro", "retiroMonto", "retiroWarning", 32, sectionRetirar);
    });
    document.getElementById("btnOpenTransacc").addEventListener("click", () => {
        OpenSection(sectionTransacc, sectionMenu);
        const ulTransacc = document.getElementById("listTransacc");
        user.listTransacc.forEach(transacc => {
            const liTransacc = document.createElement("li");
            liTransacc.innerHTML = transacc.id + ". | " + transacc.fecha + " | " + transacc.tipo + transacc.monto;
            ulTransacc.appendChild(liTransacc);
        });
        document.getElementById("btnCloseHistorial").addEventListener("click", () => {
            OpenSection(sectionMenu, sectionTransacc);
            ulTransacc.textContent = "";
        });
    });
}



function actConsultarSaldo(user, sectionClose){
    document.getElementById("btnCloseSaldo").addEventListener("click", () => OpenSection(sectionMenu, sectionClose));
    const pSaldo = document.getElementById("saldo");
    pSaldo.textContent = "Tu saldo es de: $ " + user.saldo;
}

function actTransacc(user, idMovform, idSubmit, idInput, idWarninglabel, idWarningCase, sectionClose){ //1.Depo 2.Retiro
    document.getElementById(idMovform).addEventListener("submit", function(e){
        e.preventDefault();
        const input1 = document.getElementById(idInput);
        if(((parseInt(input1.value) + user.saldo) <= 990 ) && (idMovform === "depositoform")){
            user.deposito(parseInt(input1.value));
        }else if(((user.saldo - parseInt(input1.value)) >= 10) && (idMovform === "retiroform")){
            user.retiro(parseInt(input1.value));
        }else{ warningCase(idWarninglabel, 4, idWarningCase); return; }
        document.getElementById(idSubmit).disabled = true;
        setTimeout(() => { document.getElementById(idSubmit).disabled = false}, 2000);
        input1.value = 0;
        warningCase(idWarninglabel, 4, 0);
        OpenSection(sectionMenu, sectionClose);
    });
    document.getElementById(idMovform).addEventListener("reset", function(e) {
        e.preventDefault();
        warningCase(idWarninglabel, 4, 0);
        OpenSection(sectionMenu, sectionClose);
    });
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
        if(allgreen([inputUser, inputName, inputLast, inputNipX])){
            submitSignup = document.getElementById("submitSignup");
            submitSignup.disabled = true;
            newUser = new Usuario(inputUser.value, inputName.value, inputLast.value, inputNipX.value);
            newUser.apertura(100);
            ListaUsuarios.push(newUser);
            OpenMenu(ListaUsuarios[ListaUsuarios.length-1],sectionSignup);
            setTimeout(() => { allImputsClean([inputUser, inputName, inputLast, inputNipX, inputNipZ]); submitSignup.disabled = false },2200);
        }else{
            warningCase("signupWarning",4,27);
        }
    });
    document.getElementById("signupform").addEventListener("reset", function(e){
        e.preventDefault();
        warningCase("signupWarning",4,27);
        OpenSection(sectionLogin,sectionSignup);
    });
}

function confirmarNombre(input1){
    if(!input1.value || !isNaN(input1.value) || isNumber(input1.value)){
        input1.style.borderColor = "#aa1111";
        !input1.value
            ? warningCase("signupWarning",4,21)
            : warningCase("signupWarning",4,23);
    }else{
        input1.style.borderColor = "#11aa11";
        warningCase("signupWarning",4,0);
    }
}

function confirmacionUser(input1){
    if(!input1.value || !input1.value.trim()){
        input1.style.borderColor = "#aa1111";
        warningCase("signupWarning",4,21);
        return;
    }

    for(let i = 0; i < ListaUsuarios.length; i++){
        if( ListaUsuarios[i].idUsuario === input1.value){
            input1.style.borderColor = "#aa1111";
            warningCase("signupWarning",4,22); 
            return;
        }else{
            input1.style.borderColor = "#11aa11";
            warningCase("signupWarning",4,0)
        }
    }
}

function confirmacionNIP(input1, input2){
    console.log(input1.value + " " + input2.value);
    if(input1.value !== input2.value || input1.value.length < 4 || isNaN(input1.value)){
        input1.style.borderColor = "#aa1111";
        if(isNaN(input1.value)) { warningCase("signupWarning",4,26); return; }
        if(input1.value.length < 4) { warningCase("signupWarning",4,25); return; }
        input2.style.borderColor = "#aa1111";
        warningCase("signupWarning",4,24);
        return;
    }else{
        warningCase("signupWarning",4,0);
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

function CloseMenu(){
    OpenSection(sectionLogin, sectionMenu);
    ListaUsuarios.forEach(user => { user.fails = 0; })
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