const btncopyPassword = document.getElementById("copyPassword");
const password = document.getElementById("setPassword");

document.getElementById("generarPassword").addEventListener("click",()=>generarPassword());

btncopyPassword.addEventListener("click",()=>copiarPassword());

function generarPassword()
{
    const criterios = document.querySelectorAll(".clausulas"); //0NumChar 1Mayus 2minus 3Num 4special
    const seguridadBarra = document.getElementById("seguridadPassword");
    seguridadBarra.value = 0;
    const seguridadMensaje = document.getElementById("seguridadMensaje");
    btncopyPassword.style.display = "inline";
    btncopyPassword.style.color = "#eee";
    btncopyPassword.disabled = false;
    btncopyPassword.value = "Copiar";

    const indexCaracteres = [];
    if(criterios.item(0).value >= 8)
        seguridadBarra.value+=2;
    if(criterios.item(0).value >= 15)
        seguridadBarra.value+=2;
    if(criterios.item(0).value >= 21)
        seguridadBarra.value+=2;
    if(criterios.item(1).checked == true)
    {
        indexCaracteres.push(generarCaracter(65,90));
        seguridadBarra.value++;
    }
    if(criterios.item(2).checked == true)
    {
        indexCaracteres.push(generarCaracter(97,122));
        seguridadBarra.value++;
    }
    if(criterios.item(3).checked == true)
    {
        indexCaracteres.push(generarCaracter(48,57));
        seguridadBarra.value++;
    }
    if(criterios.item(4).checked == true)
    {
        indexCaracteres.push(generarCaracter(33,47));
        seguridadBarra.value++;
    }

    if(seguridadBarra.value < 2){
        seguridadMensaje.innerHTML = "Seguridad: Vulnerable";
        seguridadMensaje.style.color = "red";
        seguridadBarra.style.setProperty("--progress-bar-color","red");
        seguridadBarra.style.setProperty("--progress-bar-color-","orange");
    }else if(seguridadBarra.value < 3){
        seguridadMensaje.innerHTML = "Seguridad: Muy Baja";
        seguridadMensaje.style.color = "orange";
    }else if(seguridadBarra.value < 4){
        seguridadMensaje.innerHTML = "Seguridad: Baja";
        seguridadMensaje.style.color = "gold";
    }else if(seguridadBarra.value < 6){
        seguridadMensaje.innerHTML = "Seguridad: Regular";
        seguridadMensaje.style.color = "greenyellow";
    }else if(seguridadBarra.value < 8){
        seguridadMensaje.innerHTML = "Seguridad: Alta";
        seguridadMensaje.style.color = "green";
    }else{
        seguridadMensaje.innerHTML = "Seguridad: Muy Alta";
        seguridadMensaje.style.color = "darkgreen";
    }

    for(let i = indexCaracteres.length; i<criterios.item(0).value; i++)
        indexCaracteres.push(generarCaracter(33,122));
    console.log(indexCaracteres);
    let getPassword = "";
    for(let i = indexCaracteres.length - 1; i>0; i--) //Algoritmo Fisher-Yates para desordenamiento
    {
        const j = Math.floor(Math.random()*(i+1));
        [indexCaracteres[i],indexCaracteres[j]] = [indexCaracteres[j],indexCaracteres[i]];
    }
    
    for(let i = 0; i < indexCaracteres.length; i++)
        getPassword += indexCaracteres[i];

    password.innerHTML = getPassword;
}

function generarCaracter(min, max)
{
    const codigoAsciiAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    if(codigoAsciiAleatorio === 60) //cambia < por ñ  //183
        return String.fromCharCode(241);
    if(codigoAsciiAleatorio === 62) //cambia > por Ñ
        return String.fromCharCode(209);
    return String.fromCharCode(codigoAsciiAleatorio);
}

function copiarPassword()
{
    const copia = password.textContent;
    navigator.clipboard.writeText(copia)
    .then(() => {
        console.log("texto copiado");
        btncopyPassword.value = "Copiado en el Portapapeles";
        btncopyPassword.style.color = "#777777";
        btncopyPassword.disabled = true;
    })
    .catch(err => {
      console.error('Error al copiar el texto: ', err);
      alert('No se pudo copiar el texto.');
    });
}