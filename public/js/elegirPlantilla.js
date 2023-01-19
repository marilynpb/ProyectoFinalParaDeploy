let valor;

function mostrarValor(){
    let radioActivo = document.querySelector('input[name="elegirPlantilla"]:checked');
    if(radioActivo) {
    valor=radioActivo.value;
    location.href='../pages/verCurriculum.html'
    localStorage.setItem("valorPlantilla", valor)
    } else {
    alert('Seleccione una plantilla');
    }
}

function mostrarSeleccionado(){
    const imagen = document.createElement('img');
    imagen.src= `../img/ejemplos/page/${localStorage.getItem("valorPlantilla")}.svg`;
    document.getElementById("miCV").appendChild(imagen)
    imagen.classList.add('curriculum')
}


mostrarSeleccionado()
