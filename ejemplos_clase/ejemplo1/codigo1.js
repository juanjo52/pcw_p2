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
}
