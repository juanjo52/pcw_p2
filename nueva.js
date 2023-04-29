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

function comprobarSesion(){

    if(!sessionStorage['_datos_']){
        window.location.replace("./index.html");
    } 
}

function recomiendaZonas(){

    let url = 'api/zonas/';
  
    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){

                    const opt = document.createElement('option');
                    opt.innerHTML = `${e.nombre}`;
                    
                    document.querySelector('#ubicaciones').appendChild(opt);
                    console.log(e.nombre);
                });    
            });
        }
    }).catch(function(error){
        console.log(error);
    });
}

function crearImagenes(){

    const d = document.createElement('div');
    let cont = document.querySelector('#contador');
    let aux = Number(cont.textContent); 
    cont.textContent = aux + 1;  
    let num = cont.textContent;

    d.classList.add('imagenes');
    
    d.innerHTML = 
    '<label for = "foto'+num+'"><img src="./img/no-image.png" alt="Imagen '+num+'"></label>'+
        '<div class="button-group">'+
            '<label for="foto'+num+'" class="icon-folder-add"></label>'+
            '<input type="file" id="foto'+num+'" accept="image/*" name ="foto[]">'+
            '<button class="icon-folder-delete" onclick="borrarImagenes(this)"></button>'+
        '</div>';

    document.querySelector('#fotos').appendChild(d);    
    console.log(num);
}

function borrarImagenes(btn) {
    let div = btn.parentElement.parentElement;

    div.remove();
}