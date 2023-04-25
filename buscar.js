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

function logout(){
    if(sessionStorage['_datos_']){
        sessionStorage.removeItem("_datos_");
    }

    console.log("gola");
}

function completarFormulario(){

    const urlParams = new URLSearchParams(window.location.search);
    const zona = urlParams.get('zona');
    const campo = document.getElementById('zonaPubli');
    campo.value = zona;
}

function mostrarPublicaciones() {

    let url = 'api/publicaciones';

    const zona = document.getElementById('zonaPubli').value;
    const palabras = document.getElementById('pClave').value;
    const fechaMenor = document.getElementById('menorFecha').value;
    const fechaMayor = document.getElementById('mayorFecha').value;

    const elementoPadre = document.getElementById('contenedorPublicaciones');

    if (elementoPadre) { //Esto es para evitar repeticiones al hacer varias veces el onclick
        while (elementoPadre.firstChild) {
          elementoPadre.removeChild(elementoPadre.firstChild);
        }
    }

    // if(zona != "") url = url + `?z=${zona}&`;
    // if(palabras != "") url = url + `?t=${palabras}`;
    // if(fechaMenor != "") url = url + `?fd=${fechaMenor}&`;
    // if(fechaMayor != "") url = url + `?fh=${fechaMayor}&`;

    if (zona != "") {
        url = `${url}?z=${zona}&`;
    }
    if (palabras != "") {

        url = `${url}${zona ? '&' : '?'}t=${palabras}`;
    }
    if (fechaMenor != "") {
        url = `${url}${zona ||palabras ? '&' : '?'}fd=${fechaMenor}`;
    }
    if (fechaMayor != "") {
        url = `${url}${zona || palabras || fechaMenor ? '&' : '?'}fh=${fechaMayor}`;
    }
    
    url = url + '?pag=0&lpag=4';

    console.log(url);

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){

                    let article = document.createElement('article');
                        console.log(e.id);
                        article.innerHTML=
                            '<a href="./publicacion.html?id='+e.id+'">'
                            +
                            '<h4 title="'+e.titulo+'">'+ e.titulo+'</h4>'
                            +
                            '<img src="./fotos/pubs/'+ e.imagen+'"'+'alt="nano coche" class="fotosPubli"> </a>'
                            +
                            '<div> <span class="fechas">'+e.fechaCreacion+'</span> <span class="f2"><a class="icon-user">'+ e.autor +
                            '</span></div>';

                        document.querySelector('#contenedorPublicaciones').appendChild(article);
                });
            });
        }
    }).catch(function(error){
        console.log(error);
    });

}


