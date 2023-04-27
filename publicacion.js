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

function logout(){
    if(sessionStorage['_datos_']){
        sessionStorage.removeItem("_datos_");
    }

    console.log("gola");
}

function compruebaURL(){

    const urlParam = new URLSearchParams(window.location.search);

    if(!urlParam.has('id')) window.location.replace('./index.html');
}

function mostrarPublicacion(){

    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');

    let url = 'api/publicaciones/'+z;

    console.log(url);

    //Muestra la informacion principal
    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){
                    let article = document.createElement('article');

                        article.innerHTML=
                        '<h3 title="'+e.titulo+'">'+ e.titulo+'</h4>' +
                        '<hr>' + 
                        '<p>' + e.texto + '</p>' +
                        '<label>'+ "Ubicación: " + e.nombreZona +'</label>' + 
                        '<hr class = "men">' + 
                        '<div class ="datos">' +
                            '<label><img src="./fotos/usuarios/'+e.fotoAutor+'" alt="foto user" class="fotosUsuario">'+ e.autor +'<span class="icon-calendar"></span>'+e.fechaCreacion+'</label></div>';
                        
                        let botones = document.createElement('span');
                        
                        if(sessionStorage['_datos_']){
                            botones.innerHTML = 
                            '<input type="button" value="Me gusta ('+e.nMeGusta+')" id ="btnMeGusta" onclick="votarmgs()">'+
                            '<input type="button" value="No me gusta ('+e.nNoMeGusta+')" id ="btnNoMeGusta" onclick="votarmgs()">';
                        }
                        else{
                            botones.innerHTML =
                            '<input type="button" value="Me gusta ('+e.nMeGusta+')" id ="btnMeGusta" disabled>'+
                            '<input type="button" value="No me gusta ('+e.nNoMeGusta+')" id ="btnNoMeGusta" disabled>';
                        }

                        article.querySelector('.datos').appendChild(botones);
                        
                        let numC = document.createElement('label');
                        numC.innerHTML = '<span class = "icon-comment"></span>' + 'NUMERO DE COMENTARIOS';
                        article.querySelector('.datos').appendChild(numC);

                    document.querySelector('#datosPubli').appendChild(article);
                });
            });
        }
    }).catch(function(error){
        console.log(error);
    });

    //Muestra las imagenes
    let urlimgs = 'api/publicaciones/'+z+ '/fotos';
  
    fetch(urlimgs).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e,i){

                    let article = document.createElement('article');
                        article.innerHTML=
                        '<img src="./fotos/pubs/'+e.archivo+'" alt ="none">'+
                        '<h4>Foto '+(i+1)+'</h4>'+
                        '<div>'+ e.descripcion+ '</div>';
                        
                    document.querySelector('#imgsPubli').appendChild(article);
                });    
            });
        }
    }).catch(function(error){
        console.log(error);
    });

    //Muestra Comentarios
    let urlcomm = 'api/publicaciones/'+z+ '/comentarios';
    console.log(urlcomm);
    fetch(urlcomm).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                datos.FILAS.forEach(function(e){
                    let article = document.createElement('article');
                    
                    let fp = new Date(e.fechaHora);
                    const modificada = formatoFecha(fp);

                        article.innerHTML=
                        '<div>'+
                            '<img src="./fotos/usuarios/'+e.foto+'"alt ="none" class="fotosUsuario">'+
                            '<p><span class="usernames">'+e.nombre+'</span></p>'+
                        '</div>'+
                        '<div><label>'+ modificada +'</label></div>'+
                        '<p>'+ e.texto+'</p>'+
                        '<hr class ="men">';  
                        document.querySelector('#comentPubli').appendChild(article);
                });    
            });
        }
    }).catch(function(error){
        console.log(error);
    });
}
function formatoFecha(fecha){

    let f = new Date(fecha);

    let dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    let dia_semana = dias_semana[f.getDay()];
    let dia = f.getDate();
    let mes = meses[f.getMonth()];
    let anio = f.getFullYear();

    let fecha_formateada = `${dia_semana}, ${dia} de ${mes} de ${anio}`;

    return fecha_formateada;
}

function OcultarMostrarImg(){
    
    if(document.getElementById("imgsPubli").style.display != "none"){
        document.getElementById("imgsPubli").style.display = "none"
    }
    else{
        document.getElementById("imgsPubli").style.display = "";
    }
}

function crearFormulario(){

    let form = document.createElement('article');

    if(!sessionStorage['_datos_']){
        form.innerHTML = 
        '<p>Debes estar <a href="./login.html">logueado</a> para poder dejar un comentario...</p>'

        document.querySelector('#formPubli').appendChild(form);
    }
    else{
        fetch("./comentario.html").then(function(response) {
            response.text().then(function(data) {
                form.innerHTML = data;
                document.querySelector('#formPubli').appendChild(form);
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }
}

function hacerComentario(){

    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');

    let datos = JSON.parse(sessionStorage.getItem('_datos_'));
    let login = datos.LOGIN;
    let token = datos.TOKEN;

    const request = {
        method : 'POST',
        headers: {
            'Authorization': `${login}:${token}`
        }
    }

    let url = 'api/publicaciones/'+z+ '/comentario';

    fetch(url,request).then(function(response){
        if(response.ok){    
            console.log(response);
            response.json().then(function(datos){
                
                const coment = document.getElementById('areacoment').value;
                datos = coment;
                console.log(datos);
            });
        }
    }).catch(function(error){
        console.log(error);
    });
}


function votarmgs(){ //ESTO NO ESTA NADA BIEN

    // '<input type="button" value="Me gusta ('+e.nMeGusta+')" id ="btnMeGusta">'+
    // '<input type="button" value="No me gusta ('+e.nNoMeGusta+')" id ="btnNoMeGusta">';

    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');

    let datos = JSON.parse(sessionStorage.getItem('_datos_'));
    let login = datos.LOGIN;
    let token = datos.TOKEN;

    const request = {
        method : 'POST',
        headers: {
            'Authorization': `${login}:${token}`
        }
    }

    let url = 'api/publicaciones/'+z+ '/megusta';

    console.log(url);
    fetch(url,request).then(function(response){
        if(response.ok){    
            response.json().then(function(datos){
                console.log(datos);
                console.log(datos.meGusta);

                const sol = datos.meGusta;

                const btnNoMeGusta = document.getElementById("btnNoMeGusta");
                const btnMeGusta = document.getElementById("btnMeGusta");

                btnNoMeGusta.disabled = sol === 1;
                btnMeGusta.disabled = sol === -1;

                // Si sol no es 1 ni -1, habilita ambos botones
                if (sol !== 1 && sol !== -1) {
                    btnNoMeGusta.disabled = false;
                    btnMeGusta.disabled = false;
                }      
                // const sol = datos.meGusta;

                // if(sol == 1){

                //     document.getElementById("btnNoMeGusta").disabled = true;
                // }
                // else if (sol == -1){

                //     document.getElementById("btnMeGusta").disabled = true;
                // }
                // else{
                //     document.getElementById("btnNoMeGusta").disabled = false;
                //     document.getElementById("btnMeGusta").disabled = false;
                // }      
            });
        }
    }).catch(function(error){
        console.log(error);
    });

}