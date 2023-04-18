function crear(){

    let url = 'api/zonas';

    fetch(url).then(function(response){
        response.json().then(function(datos){
            datos.FILAS.forEach(function(e){
                let opcion = document.createElement('option');
                // opcion.innerHTML = '<option>'+e.nombre+'</option>'; +
                opcion.textContent = e.nombre;  
                document.querySelector('#ubicaciones').appendChild(opcion);
            });
        });
    }).catch(function(error){
        console.log(error);
    });
}

function anyadirImagen(){

    
}