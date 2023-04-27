(function(){
    if(sessionStorage['_datos_']){
        location.href = 'index.html';
    }
})();



function muestraNav() {
    let ul = document.createElement("ul");
    let userName = '';
    let datos;

    ul.classList.add('enlaces');

    if (sessionStorage['_datos_']) {
        datos = JSON.parse(sessionStorage['_datos_']);
        userName = datos.NOMBRE;
        console.log(userName);
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>' +
            '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>' +
            '<li><a href="./nueva.html" class="icon-plus"><span>Nueva</span></a></li>' +
            '<li><a href="./index.html" onclick="logout();" class="icon-logout"><span>'+userName+'</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    } else {
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>' +
            '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>' +
            '<li><a href="./login.html" class="icon-login"><span>Login</span></a></li>' +
            '<li><a href="./registro.html" class="icon-user-add"><span>Registro</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    }
}


//COMPROBAR QUE EL USERNAME (LOGIN) NO ESTÁ YA EN LA BBDD
let login = document.getElementById('login');

login.addEventListener("blur", function(evt) {
    compruebaDisponibleLogin();
});

//OBTENER INPUT PWD2, PARA PONER LLAMAR MENSAJE DE SI CONTRASEÑAS COINCIDEN O NO
let pwd2 = document.getElementById('pwd2');

pwd2.addEventListener("keyup", function(evt) {
    compruebaPwd();
});

// Comprobar cuando se puede hacer registro
let form = document.getElementById('formRegistro');

form.addEventListener("keyup", function(evt) {
    dejaRegistro();
});


function compruebaDisponibleLogin() {
    let spanMensaje = document.getElementById('msgDisponible');
    let url = 'api/usuarios/'
    let loginIntroducido = login.value;
    url = url + loginIntroducido;
    let disponible;

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                disponible = datos.DISPONIBLE;

                if(disponible){
                    if(spanMensaje.classList.contains('no')){
                        spanMensaje.classList.remove('no');
                    }

                    spanMensaje.classList.add('si');
                    spanMensaje.textContent = 'Este login está disponible :D';
                }else {
                    if(spanMensaje.classList.contains('si')){
                        spanMensaje.classList.remove('si');
                    }

                    spanMensaje.classList.add('no');
                    spanMensaje.textContent = 'Este login no está disponible :(';
                }
            });
        }else {
            console.log("not ok");
        }
    }).catch(function(error){
        console.log(error);
    });
}

function compruebaPwd() {
    let pwd = document.getElementById('pwd');
    let spanPwd = document.getElementById('pwdCoincide');

    if(pwd.value == pwd2.value){
        if(spanPwd.classList.contains('no')){
            spanPwd.classList.remove('no');
        }

        spanPwd.classList.add('si');
        spanPwd.textContent = 'Las contraseñas coinciden :D';
    } else {
        if(spanPwd.classList.contains('si')){
            spanPwd.classList.remove('si');
        }

        spanPwd.classList.add('no');
        spanPwd.textContent = 'Las contraseñas no coinciden (';
    }
}

// Función que comprueba los label, si tienen la clase 'si' dejará registro. Si tienen clase 'no' no dejará registro
function dejaRegistro(){
    let spanLogin = document.getElementById('msgDisponible');
    let spanPwd = document.getElementById('pwdCoincide');
    let botonEnviar = document.getElementById('botonEnviar');

    if(!spanLogin.classList.contains('si') || !spanPwd.classList.contains('si')){
        botonEnviar.disabled = true;
    } else {
        botonEnviar.disabled = false;
    }
}



