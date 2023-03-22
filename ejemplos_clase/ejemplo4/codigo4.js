function pedirPubs() {
    //Descargar zip de moodle (ficheros de la practica) y colocarla en la 
    //carpeta raiz del proyecto (igual hace falta meterla en la de ejemplo4 para probar aqui) para que pueda funcionar el ejemplo.
    //porque si no las llamadas al api y bbdd no van

    let url = 'api/publicaciones';


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