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
            '<li><a href="./index.html" onclick="logout();" class="icon-logout"><span>' + userName + '</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    } else {
        ul.innerHTML = '<li><a href="./index.html" class="icon-home"><span>Inicio</span></a></li>' +
            '<li><a href="./buscar.html" class="icon-search"><span>Buscar</span></a></li>' +
            '<li><a href="./login.html" class="icon-login"><span>Login</span></a></li>' +
            '<li><a href="./registro.html" class="icon-user-add"><span>Registro</span></a></li>';

        document.querySelector('#menuNav').appendChild(ul);
    }
}

function logout() {
    if (sessionStorage['_datos_']) {
        sessionStorage.removeItem("_datos_");
    }
}

function completarFormulario() {

    const urlParams = new URLSearchParams(window.location.search);
    const zona = urlParams.get('z');
    const campo = document.getElementById('zonaPubli');
    campo.value = zona;
    if(campo.value != ""){
        mostrarPublicaciones();
    }
}

/* -------- Funciones Paginación --------- */
const PAGE_SIZE = 1; //CAMBIAR A 6 O LO QUE VEAMOS
let totalItems;
let currentPage;

function getPage() {
    let pagActual = document.querySelector('#current-page');
    let numPagActual = pagActual.textContent;

    return Number(numPagActual);
}

function getFinal() {
    let totalPags = document.querySelector('#total-pages');
    let numPagsTotal = totalPags.textContent;

    return Number(numPagsTotal);
}

// El resto de cosas va en la función siguiente
/* --------------------------------------- */

function updateItems(principio, unidades, final) {
    let divPaginacion = document.getElementById('pagination');
    divPaginacion.classList.remove('esconde');
    
    if (principio) {
        currentPage = 0;
    }

    if (!principio && !final) {
        currentPage = getPage() - 1;
        console.log(currentPage);
        currentPage += unidades;
    }

    if (final) {
        currentPage = getFinal() - 1;
    }

    let url = 'api/publicaciones';

    let pag = currentPage;
    

    const zona = document.getElementById('zonaPubli').value;
    const palabras = document.getElementById('pClave').value;
    const fechaMenor = document.getElementById('menorFecha').value;
    const fechaMayor = document.getElementById('mayorFecha').value;

    const elementoPadre = document.getElementById('contenedorPublicaciones');

    if (elementoPadre) { //Esto es para evitar repeticiones al hacer varias veces el onclick
        while (elementoPadre.firstChild) {
            elementoPadre.removeChild(elementoPadre.firstChild);
        }
    }

    // if(zona != "") url = url + `?z=${zona}&`;
    // if(palabras != "") url = url + `?t=${palabras}`;
    // if(fechaMenor != "") url = url + `?fd=${fechaMenor}&`;
    // if(fechaMayor != "") url = url + `?fh=${fechaMayor}&`;

    if (zona != "") {
        url = `${url}?z=${zona}&`;
    }
    if (palabras != "") {

        url = `${url}${zona ? '&' : '?'}t=${palabras}`;
    }
    if (fechaMenor != "") {
        url = `${url}${zona || palabras ? '&' : '?'}fd=${fechaMenor}`;
    }
    if (fechaMayor != "") {
        url = `${url}${zona || palabras || fechaMenor ? '&' : '?'}fh=${fechaMayor}`;
    }

    // url = url + '?pag=0&lpag=4';
    url = url + '&pag=' + pag + '&lpag=' + PAGE_SIZE;
    console.log(url);

    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (datos) {
                console.log(datos);
                totalItems = datos.TOTAL_COINCIDENCIAS;

                const totalPages = Math.ceil(totalItems / PAGE_SIZE);

                /****/
                // Disable/enable buttons as needed
                const firstPageButton = document.querySelector('#first-page');
                const prevPageButton = document.querySelector('#prev-page');
                const nextPageButton = document.querySelector('#next-page');
                const lastPageButton = document.querySelector('#last-page');
                firstPageButton.disabled = pag == 0;
                prevPageButton.disabled = pag == 0;
                nextPageButton.disabled = pag == totalPages - 1;
                lastPageButton.disabled = pag == totalPages - 1;

                // Update page number display
                let currentPageDisplay = document.querySelector('#current-page');
                let totalPageDisplay = document.querySelector('#total-pages');
                currentPageDisplay.textContent = pag + 1;
                totalPageDisplay.textContent = totalPages;
                /****/

                datos.FILAS.forEach(function (e) {

                    let article = document.createElement('article');
                    console.log(e.id);
                    article.innerHTML =
                        '<a href="./publicacion.html?id=' + e.id + '">'
                        +
                        '<h4 title="' + e.titulo + '">' + e.titulo + '</h4>'
                        +
                        '<img src="./fotos/pubs/' + e.imagen + '"' + 'alt="nano coche" class="fotosPubli"> </a>'
                        +
                        '<div> <span class="fechas">' + e.fechaCreacion + '</span> <span class="f2"><a class="icon-user">' + e.autor +
                        '</span></div>';

                    document.querySelector('#contenedorPublicaciones').appendChild(article);
                });
            });
        }
    }).catch(function (error) {
        console.log(error);
    });

}


