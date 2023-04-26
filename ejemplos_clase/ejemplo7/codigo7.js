function miFetch(url, frm) {
    return new Promise(function (aceptar, rechazar) {
        let xhr = new XMLHttpRequest(),
            fd = new FormData(frm);

        xhr.open('post', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            // let r = xhr.responseText; (esta línea es para recoger como texto la respuesta y poder imprimirla en consola (en caso de error o algo))
            let r = xhr.response;

            if (r.RESULTADO == 'OK') {
                // Login correcto
                // console.log(r);
                aceptar(r);
            } else { // Error al loguearse
                // console.log('ERROR');
                rechazar('Error al hacer login');
            }
        }

        xhr.send(fd);
    });
}

function hacerLogin(evt) {
    evt.preventDefault();

    let frm = evt.currentTarget;
        url = 'api/usuarios/login',
    
    miFetch(url, frm).then(function(datos){
        // promesa aceptada
        console.log('Login correcto');
        console.log(datos);
    },
    function(error){
        // promesa rechazada
        console.log(error);
    });
}