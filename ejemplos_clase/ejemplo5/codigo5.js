// (function(){
//     if(!sessionStorage['_datos_']){
//         location.href = 'index.html';
//     }
// })(); // esta función se llama a si misma

function hacerLogin(evt){
    evt.preventDefault(); // cancela la acción por defecto del evento

    let frm = evt.currentTarget,
        xhr = new XMLHttpRequest(),
        url = 'api/usuarios/login',
        fd = new FormData(frm);
    
    xhr.open('POST', url, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
        let r = xhr.response;
        console.log(r);

        if(r.RESULTADO == 'OK'){
            let dialogo = document.createElement('dialog'),
                html = '';
            
            html += '<h3>Bienvenido ';
            html += r.NOMBRE;
            html += '</h3>';
            html += '<button onclick="cerrarDialogo()">Cerrar</button>';

            dialogo.innerHTML = html;

            document.body.appendChild(dialogo);
            dialogo.showModal();
            sessionStorage['_datos_'] = JSON.stringify(r);

            let datos = JSON.parse(sessionStorage['_datos_']);
            console.log(datos.LOGIN);
        } else {
            console.log('error');
        }
    }

    xhr.send(fd);
}

function cerrarDialogo(valor){
    console.log(valor);
    document.querySelector('dialog').close();
    document.querySelector('dialog').remove();
}

function hacerComentario_xhr(frm){
    let xhr = new XMLHttpRequest(),
        url = 'api/publicaciones/2/comentarios',
        fd = new FormData(frm),
        usu = JSON.parse( sessionStorage['_datos_']),
        auth;
    
    xhr.open('POST', url, true);
    xhr.responseType = 'json';

    xhr.onload = function(){
        let r = xhr.response;

        console.log(r);
    }
    auth = usu.LOGIN + ':' + usu.TOKEN;
    xhr.setRequestHeader('Authoritation', auth);
    xhr.send(fd);

    return false; // cancela la acción por defecto del evento
}

function hacerComentario(frm){
    let url = 'api/publicaciones/2/comentarios',
        fd = new FormData(frm), 
        usu = JSON.parse( sessionStorage['_datos_']),
        auth;
    
    auth = usu.LOGIN + ':' + usu.TOKEN;
    fetch(url, {method:'POST',
                body: FileSystem,
                headers: {'Authoritation': auth}}).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
            })
        }
    }).catch(function(error){
        console.log(error);
    });

    return false;
}