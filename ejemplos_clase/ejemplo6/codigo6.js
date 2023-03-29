function crearPublicacion(evt){
    evt.preventDefault();

    let xhr = new XMLHttpRequest(),
        fd = new FormData(evt.currentTarget),
        url = 'api/publicaciones',
        usu = JSON.parse(sessionStorage['_datos_']),
        auth;

    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(){
        let r = xhr.responseText;

        console.log(r);
    }

    auth = usu.LOGIN + ':' + usu.TOKEN;
    xhr.setRequestHeader('Authoritation', auth);
    xhr.send(fd);
}