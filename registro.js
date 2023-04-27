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



