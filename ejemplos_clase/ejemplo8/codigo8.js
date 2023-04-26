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


// Temporizadores "malos"
function empezarST() {
    let fechaHora = new Date(),
        hora = fechaHora.getHours(),
        minutos = fechaHora.getMinutes(),
        segundos = fechaHora.getSeconds(),
        texto,
        output =  document.getElementById('hora');

        texto = (hora < 10? '0':'') + hora + ':' + (minutos < 10? '0':'') + minutos + ':' + (segundos < 10? '0':'') + segundos;
        output.textContent = texto;

        let id = setTimeout(empezarST, 1000);
        output.setAttribute('data-timer', id);
}

function pararST(){
    let output =  document.getElementById('hora');

    if(output.getAttribute('data-timer')){
        clearTimeout(output.getAttribute('data-timer'));
    }
}


function empezarSI(){
   
    let id = setInterval(function(){
        let fechaHora = new Date(),
        hora = fechaHora.getHours(),
        minutos = fechaHora.getMinutes(),
        segundos = fechaHora.getSeconds(),
        texto,
        output =  document.getElementById('hora');

        texto = (hora < 10? '0':'') + hora + ':' + (minutos < 10? '0':'') + minutos + ':' + (segundos < 10? '0':'') + segundos;
        output.textContent = texto;
    }, 1000);
    output.setAttribute('data-timer', id);

}

function pararSI() {
    let output =  document.getElementById('hora');

    if(output.getAttribute('data-timer')){
        clearInterval(output.getAttribute('data-timer'));
    }
}

// Temporizador "bueno" - no consume tanto
function empezarRAF() {
    let fechaHora = new Date(),
    hora = fechaHora.getHours(),
    minutos = fechaHora.getMinutes(),
    segundos = fechaHora.getSeconds(),
    texto,
    output =  document.getElementById('hora');

    texto = (hora < 10? '0':'') + hora + ':' + (minutos < 10? '0':'') + minutos + ':' + (segundos < 10? '0':'') + segundos;
    output.textContent = texto;

    let id = requestAnimationFrame(empezarRAF); //él ha puesto let id = requestAnimationFrame(empezarST); pero no le veo sentido
    output.setAttribute('data-timer', id);

}

function pararRAF() {
    let output =  document.getElementById('hora');

    if(output.getAttribute('data-timer')){
        cancelAnimationFrame(output.getAttribute('data-timer'));
    }
}