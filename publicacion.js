function muestraNav() {
    let ul = document.createElement("ul");
    ul.classList.add('enlaces');
    
    if(sessionStorage['_datos_']){
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>'+
        '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>'+
        '<li><a href="./nueva.html" class="icon-plus"><span>Nueva</span></a></li>'+
        '<li><a href="./index.html" onclick="logout();" class="icon-logout"><span>Logout</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    } else {
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>'+
        '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>'+
        '<li><a href="./login.html" class="icon-login"><span>Login</span></a></li>'+
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
                            '<label><img src="./fotos/usuarios/'+e.fotoAutor+'" alt="foto user" class="fotosUsuario">'+ e.autor +'<span class="icon-calendar"></span>'+e.fechaCreacion+'</label>'+
                            '<span>'+
                                '<input type="button" value="Me gusta ('+e.nMeGusta+')">'+
                                '<input type="button" value="No me gusta ('+e.nNoMeGusta+')">'+
                            '</span>'+
                            '<label><span class = "icon-comment"></span>'+"NUMERO DE COMENTARIOS"+'</label>'+
                        '</div>'+
                        '<hr class="men';

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
                        article.innerHTML=
                        '<div>'+
                            '<img src="./fotos/usuarios/'+e.foto+'"alt ="none" class="fotosUsuario">'+
                            '<p><span class="usernames">'+e.nombre+'</span></p>'+
                        '</div>'+
                        '<div><label>'+ e.fechaHora+'</label></div>'+
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