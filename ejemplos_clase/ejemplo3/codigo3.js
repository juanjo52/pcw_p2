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