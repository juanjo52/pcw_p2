function mostrarPublicaciones() {
 
    let url = 'api/publicaciones';

    url = url + '?pag=0&lpag=4';  //pag nº pagina, lpag cuantos elementos hay en la página

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){
                    let article = document.createElement('article');

                    article.innerHTML= 
                        '<a href="./publicacion.html">'
                        +
                        '<h4 title="'+e.titulo+'">'+ e.titulo+'</h4>'
                        +
                        '<img src="./fotos/pubs/'+ e.imagen+'"'+'alt="nano coche" class="fotosPubli"> </a>'
                        +
                        '<div> <span class="fechas">'+e.fechaCreacion+'</span> <span class="f2"><img src="./fotos/usuarios/'+e.fotoAutor+'" alt="foto user" class="fotosUsuario">' 
                        + e.autor +
                        '</span></div>';
                        

                    document.querySelector('#contenedorPublicaciones').appendChild(article);


                });
            });
        }
    }).catch(function(error){
        console.log(error);
    });

}

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

function logout(){
    if(sessionStorage['_datos_']){
        sessionStorage.removeItem("_datos_");
    }

    console.log("gola");
}