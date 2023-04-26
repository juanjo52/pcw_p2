const PAGE_SIZE = 2;
let currentPage = 0;
let totalItems;

console.log("Current Page: "+ currentPage);

function getTotalItems() {
    let url = 'api/publicaciones';
    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (datos) {
                console.log(datos);
                totalItems = datos.FILAS.length;
                console.log("Total Items: "+ totalItems);
                updatePagination();
                updateItems();
            });
        }
    });
}

getTotalItems();

function updatePagination() {
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    console.log("Total Pages: "+ totalPages);
    console.log("Current Page: "+ currentPage);

    // Disable/enable buttons as needed
    const firstPageButton = document.querySelector('#first-page');
    const prevPageButton = document.querySelector('#prev-page');
    const nextPageButton = document.querySelector('#next-page');
    const lastPageButton = document.querySelector('#last-page');
    firstPageButton.disabled = currentPage == 0;
    prevPageButton.disabled = currentPage == 0;
    nextPageButton.disabled = currentPage == totalPages - 1;
    lastPageButton.disabled = currentPage == totalPages - 1;

    // Update page number display
    let currentPageDisplay = document.querySelector('#current-page');
    let totalPageDisplay = document.querySelector('#total-pages');
    currentPageDisplay.textContent = currentPage + 1;
    totalPageDisplay.textContent = totalPages;

    // Add click event listeners to buttons
    firstPageButton.removeEventListener('click', firstPageClickHandler);
    prevPageButton.removeEventListener('click', prevPageClickHandler);
    nextPageButton.removeEventListener('click', nextPageClickHandler);
    lastPageButton.removeEventListener('click', lastPageClickHandler);

    firstPageButton.addEventListener('click', firstPageClickHandler);
    prevPageButton.addEventListener('click', prevPageClickHandler);
    nextPageButton.addEventListener('click', nextPageClickHandler);
    lastPageButton.addEventListener('click', lastPageClickHandler);

    function firstPageClickHandler() {
        currentPage = 0;
        updateItems();
        updatePagination();
    }

    function prevPageClickHandler() {
        if (currentPage > 0) {
            currentPage--;
            updateItems();
            updatePagination();
        }
    }

    function nextPageClickHandler() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateItems();
            updatePagination();
        }
    }

    function lastPageClickHandler() {
        currentPage = totalPages - 1;
        updateItems();
        updatePagination();
    }
}


function updateItems() {
    let url = 'api/publicaciones';

    url = url + '?pag=${currentPage}&lpag=${PAGE_SIZE}';  //pag nº pagina, lpag cuantos elementos hay en la página

    const elementoPadre = document.getElementById('contenedorPublicaciones');

    

    fetch(url).then(function (response) {
        console.log(elementoPadre);
        if (elementoPadre) { //Esto es para evitar repeticiones al hacer varias veces el onclick
            while (elementoPadre.firstChild) {
            elementoPadre.removeChild(elementoPadre.firstChild);
            }
        }
        if (response.ok) {
            response.json().then(function (datos) {
                console.log(datos);
                datos.FILAS.forEach(function (e) {
                    let article = document.createElement('article');

                    article.innerHTML =
                        '<a href="./publicacion.html">'
                        +
                        '<h4 title="' + e.titulo + '">' + e.titulo + '</h4>'
                        +
                        '<img src="./fotos/pubs/' + e.imagen + '"' + 'alt="nano coche" class="fotosPubli"> </a>'
                        +
                        '<div> <span class="fechas">' + e.fechaCreacion + '</span> <span class="f2"><img src="./fotos/usuarios/' + e.fotoAutor + '" alt="foto user" class="fotosUsuario">'
                        + e.autor +
                        '</span></div>';


                    document.querySelector('#contenedorPublicaciones').appendChild(article);


                });
            });
        }
    }).catch(function (error) {
        console.log(error);
    });

}




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

function logout() {
    if (sessionStorage['_datos_']) {
        sessionStorage.removeItem("_datos_");
    }

    console.log("gola");
}




