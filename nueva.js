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

    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');

    let url = 'api/publicaciones/'+z;

    let urlimgs = 'api/publicaciones/'+z+ '/fotos';
  
    fetch(urlimgs).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e,i){

                    let article = document.createElement('article');
                        article.innerHTML=
                        '<img src="./fotos/pubs/'+e.archivo+'" alt ="none">'+
                        '<h4>Foto '+(i+1)+'</h4>'+
                        '<div>'+ e.descripcion+ '</div>';
                        
                    document.querySelector('#imgsPubli').appendChild(article);
                });    
            });
        }
    }).catch(function(error){
        console.log(error);
    });
}