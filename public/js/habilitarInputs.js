let buton = document.getElementById(editar)

buton.addEventListener('click', habilitarInputs)

function habilitarInputs(){
    document.querySelectorAll('input').dissabled = false
}