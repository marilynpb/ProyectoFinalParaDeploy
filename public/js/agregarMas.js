function validar(i){
    let agregar = document.getElementById('agregar'+i)
    let carrera = document.getElementById('carrera'+i)
    let instituto = document.getElementById('instituto'+i)
    let egreso = document.getElementById('finalizado'+i)
    let nuevoForm = document.getElementById('nuevoForm'+i)

    if(i<3){
        if(carrera.value == "" || instituto.value == ""|| egreso.value == null || egreso.value == ""){
            alert("Debe completar los datos actuales para agregar otro formulario")
        }
        else{
            nuevoForm.classList.remove("deshabilitado")
        }
    }
    else{
        alert("No se puede añadir más información")
    }
}


function validarFormExp(i){
    let agregarExp = document.getElementById('agregarExp'+i)
    let puesto = document.getElementById('puesto'+i)
    let empresa = document.getElementById('empresa'+i)
    let desde = document.getElementById('desde'+i)
    let hasta = document.getElementById('hasta'+i)
    let descripcion = document.getElementById('descripcion'+i)
    let nuevoFormExp = document.getElementById('nuevoFormExp'+i)

    if(i<3){
        if(puesto.value == null || puesto.value == "" || empresa.value == null || empresa.value == ""||
            desde.value == null || desde.value == "" || hasta.value == null || hasta.value == "" 
            || descripcion.value == null || descripcion.value == ""){
            alert("Debe completar los datos actuales para agregar otro formulario")
        }
        else{
            nuevoFormExp.classList.remove("deshabilitado")
        }
    }
    else{
        alert("No se puede añadir más información")
    }
}



function validarFormIdioma(i){
    let agregarIdioma = document.getElementById('agregarIdioma'+i)
    let idioma = document.getElementById('idioma'+i)
    let nivel = document.getElementById('idiomaNivel'+i)
    let nuevoFormIdioma = document.getElementById('nuevoFormIdioma'+i)

    if(i<3){
        if(idioma.value == "" || idioma.value == null || nivel.value == null || nivel.value == ""){
            alert("Debe completar los datos actuales para agregar otro formulario")
        }
        else{
            nuevoFormIdioma.classList.remove("deshabilitado")
        }
    }
    else{
        alert("No se puede añadir más información")
    }
}





