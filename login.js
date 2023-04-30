(function(){
    if(sessionStorage['_datos_']){
        location.href = 'index.html';
    }
})();

function hacerLogin(evt){
    evt.preventDefault(); // cancela la acción por defecto del evento

    let frm = evt.currentTarget,
        xhr = new XMLHttpRequest(),
        url = 'api/usuarios/login',
        fd = new FormData(frm);

    xhr.open('POST', url, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
        let r = xhr.response;
        console.log(r);

        let msgError = document.getElementById('msgError');

        if(r.RESULTADO == 'OK'){
            msgError.textContent = '';
            let dialogo = document.createElement('dialog'),
              html = '';

            html += '<h3>Bienvenido ';
            html += r.NOMBRE;
            html += '</h3>';
            html += '<button onclick="cerrarDialogo()">Cerrar</button>';

            dialogo.innerHTML = html;

            document.body.appendChild(dialogo);
            dialogo.showModal();
            sessionStorage['_datos_'] = JSON.stringify(r);

            let datos = JSON.parse(sessionStorage['_datos_']);
            console.log(datos.LOGIN);
        } else if (r.RESULTADO == 'ERROR'){
            msgError.textContent = r.DESCRIPCION;
            console.log(r.DESCRIPCION);
        }else {
            console.log('error desconocido');
        }
    }

    xhr.send(fd);
}

function cerrarDialogo(){
    document.querySelector('dialog').close();
    document.querySelector('dialog').remove();
    window.location.replace("./index.html");
}

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

