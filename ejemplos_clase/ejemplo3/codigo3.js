function cargarFoto(btn){
    let div = btn.parentElement.parentElement;

    div.querySelector('input[type="file"]').click();
}

function eliminarFoto(btn){
    let div = btn.parentElement.parentElement;

    div.remove();
}