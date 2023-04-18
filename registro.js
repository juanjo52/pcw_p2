(function(){
    if(sessionStorage['_datos_']){
        location.href = 'index.html';
    }
})();

function muestraNav() {
    let ul = document.createElement("ul");
    ul.classList.add('enlaces');
    
    if(sessionStorage['_datos_']){
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>'+
        '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>'+
        '<li><a href="./nueva.html" class="icon-plus"><span>Nueva</span></a></li>'+
        '<li><a href="./index.html" onclick="logout();" class="icon-logout"><span>Logout</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    } else {
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>'+
        '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>'+
        '<li><a href="./login.html" class="icon-login"><span>Login</span></a></li>'+
        '<li><a href="./registro.html" class="icon-user-add"><span>Registro</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    }
}