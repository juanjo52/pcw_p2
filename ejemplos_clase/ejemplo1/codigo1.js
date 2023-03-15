var v = [5,-3,0,true,'hola'];

function prueba(){
    // Recorrer elementos de un array

    // v.forEach(function(e, idx, a){
    //     console.log('v[' + idx + ']: ' + e);
    // });

    // Lo mismo de arriba, pero con función flecha =>
    v.forEach( (e, idx) => {
        console.log('v[' + idx + ']: ' + e);
    } );

    return 'hh';
}

function clic(evt){
    // console.log(evt);
    console.log(evt.currentTarget);
    // evt.stopPropagation();
}

function prepararEventos() {
    let v = document.querySelectorAll('.evento');

    // console.log(v);
    v.forEach( function(e){
        e.addEventListener('click', function(evt){
            console.log(evt.currentTarget + ' (Burbujeo)');
        });
        e.addEventListener('click', function(evt){
            console.log(evt.currentTarget + ' (Captura)');
        }, true);
    });
}

function pedirPubs() {
    let xhr = new XMLHttpRequest(),
        url = 'api/publicaciones';

    xhr.open('GET', url, true);

    xhr.responseType = 'json';
    
    xhr.onload = function(){
        let r = xhr.response;
        let html = '';
        console.log(r);

        r.FILAS.forEach(function(e){
            html += '<li>' + e.titulo + '</li>'
        });

        document.querySelector('#lista').innerHTML = html;
    }
    xhr.send();
}
