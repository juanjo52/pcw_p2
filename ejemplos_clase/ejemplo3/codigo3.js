function cargarFoto(btn){
    let div = btn.parentElement.parentElement;

    div.querySelector('input[type="file"]').click();
}

function eliminarFoto(btn){
    let div = btn.parentElement.parentElement;

    div.remove();
}

function mostrarFoto(inp){
    let fichero = inp.files[0],
        img = inp.parentElement.querySelector('img');
    
    img.src = URL.createObjectURL( fichero );
}

function anyadirFoto(){
    //distinto en la practica, ya que ahi necesitamos empezar de 0 sin ningun elemento para clonar (con inner html lo haremos)
    // aqui tenemos una base y la clonamos

    let ficha = document.querySelector('.foto').cloneNode(true);

    document.querySelector('body>section>div').appendChild(ficha);
    ficha.querySelector('input[type="file"]').value = '';
}