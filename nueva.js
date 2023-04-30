function muestraNav() {
    let ul = document.createElement("ul");
    let userName = '';
    let datos;

    ul.classList.add('enlaces');

    if (sessionStorage['_datos_']) {
        datos = JSON.parse(sessionStorage['_datos_']);
        userName = datos.NOMBRE;
        console.log(userName);
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>' +
            '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>' +
            '<li><a href="./nueva.html" class="icon-plus"><span>Nueva</span></a></li>' +
            '<li><a href="./index.html" onclick="logout();" class="icon-logout"><span>'+userName+'</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    } else {
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>' +
            '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>' +
            '<li><a href="./login.html" class="icon-login"><span>Login</span></a></li>' +
            '<li><a href="./registro.html" class="icon-user-add"><span>Registro</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    }
}

function comprobarSesion(){

    if(!sessionStorage['_datos_']){
        window.location.replace("./index.html");
    }
}

function recomiendaZonas(){

    let url = 'api/zonas/';

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){

                    const opt = document.createElement('option');
                    opt.innerHTML = `${e.nombre}`;

                    document.querySelector('#ubicaciones').appendChild(opt);
                    console.log(e.nombre);
                });
            });
        }
    }).catch(function(error){
        console.log(error);
    });
}


function crearImagenes(){

    const d = document.createElement('div');
    let cont = document.querySelector('#contador');
    let aux = Number(cont.textContent);
    cont.textContent = aux + 1;
    let num = cont.textContent;

    d.classList.add('imagenes');

    d.innerHTML =
    '<label for = "foto'+num+'" id ="label'+num+'" ><img src="./img/no-image.png" alt="Imagen '+num+'" id ="img'+num+'"></label>'+
        '<div class="button-group">'+
            '<label for="foto'+num+'" class="icon-folder-add"></label>'+
            '<input type="file" id="foto'+num+'" accept="image/*" name ="fotos[]" onchange="mostrarFoto(this)">'+
            '<button class="icon-folder-delete" onclick="borrarImagenes(this)"></button>'+
            '<textarea name ="descripciones[]" id ="area'+num+'"></textarea>'+
        '</div>';

    document.querySelector('#fotos').appendChild(d);
    console.log(num);
}

function hacerpubli(vt){
    vt.preventDefault();
    compruebaFoto();
}

function compruebaFoto(){

    let cont = document.querySelector('#contador');
    let aux = Number(cont.textContent);
    let lID = "label"+aux;
    let label = document.getElementById(lID);

    if(label?.hasChildNodes()){

        let datos = JSON.parse(sessionStorage.getItem('_datos_'));
        let login = datos.LOGIN;
        let token = datos.TOKEN;

        const coment = document.getElementById(lID);
        const formulario = document.getElementById("formu");
        const formData = new FormData(formulario);

        console.log(formData);

        const request = {
            method : 'POST',
            headers: {
                'Authorization': `${login}:${token}`
            },
            body: formData
        }

        let url = 'api/publicaciones/';
        
        fetch(url,request).then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(datos){
                    console.log(datos);
                    let dialogo = document.createElement('dialog');

                    dialogo.innerHTML =
                    '<h3>¡La publicación se ha creado correctamente!</h3>'+
                    `<p>${datos.TITULO}</p>`+
                    '<button onclick="cerrarDialogo2()">Cerrar</button>';

                    document.body.appendChild(dialogo);
                    dialogo.showModal();
                    console.log(datos);
                });
            }
        }).catch(function(error){
            console.log(error);
        });
    }
    else{
        
        let dialogo = document.createElement('dialog');

        dialogo.innerHTML =
        '<h3>¡Para poder crear una nueva publicacion tiene que añadir una imagen!</h3>'+
        '<button onclick="cerrarDialogo()">Cerrar</button>';

        document.body.appendChild(dialogo);
        dialogo.showModal();
    }
}

// Tamaño maximo imagen
const maxSize = 300000; //Bytes = 300 KB

// PARTE IMAGENES

function mostrarFoto(inp){
    let fichero = inp.files[0]/*,
        img = inp.parentElement.querySelector('img')*/;
    let cont = document.querySelector('#contador');
    let aux = Number(cont.textContent);
    let cID = "img"+aux;

    console.log(cID);

    let fotoUsu = document.getElementById(cID);

   

    if(fichero.size > maxSize){
        crearModal();
        fotoUsu.src = './img/no-image.png';

    } else {
        fotoUsu.src = URL.createObjectURL( fichero );
    }
}
function borrarImagenes(btn) {
    let div = btn.parentElement.parentElement;
    div.remove();
}

function crearModal(){

    let dialogo = document.createElement('dialog');

    dialogo.innerHTML =
    '<h3>¡El tamaño máximo para la foto son 300 KB!</h3>'+
    '<button onclick="cerrarDialogo()">Cerrar</button>';

    document.body.appendChild(dialogo);
    dialogo.showModal();
}

function cerrarDialogo(){

    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');

    document.querySelector('dialog').close();
    document.querySelector('dialog').remove();
}

function cerrarDialogo2(){

    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');

    document.querySelector('dialog').close();
    document.querySelector('dialog').remove();
    window.location.replace('./index.html');
}