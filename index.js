function pedirPubs() {
 
    let url = 'api/publicaciones';

    url = url + '?pag=0&lpag=5';  //pag nº pagina, lpag cuantos elementos hay en la página

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){
                    let li = document.createElement('li');

                    li.innerHTML= e.titulo;

                    document.querySelector('#lista').appendChild(li);
                });
            });
        }
    }).catch(function(error){
        console.log(error);
    });

}