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