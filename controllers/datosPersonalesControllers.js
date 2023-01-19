const LaboralData = require('../models/LaboralData')
const PersonalData = require('../models/PersonalData')
const User = require('../models/User')
const DescripcionData = require('../models/DescripcionData')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')

//Trae los Datos Personales
const leerDatosPersonales = async(req, res) =>{
    try{
        const datosDescripcion = await DescripcionData.find({user: req.user.id}).lean() 
        const personaldatas = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)
        
        res.render('verMisDatos', {personaldatas : personaldatas, laboralData: laboralData, user: user, datosDescripcion: datosDescripcion})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


//Agregar nuevos Datos Personales
const agregarDatosPersonales = async(req, res)=>{
    const {
        nombre, apellido, fechaNac, sexo, estadoCivil, 
        calle, altura, cp, pais, telefono
    } = req.body
    try{
        const personaldata = new PersonalData({
            nombre: nombre,
            apellido: apellido,
            fechaNac: fechaNac,
            sexo: sexo,
            estadoCivil: estadoCivil,
            calle: calle,
            altura: altura,
            cp: cp,
            pais: pais,
            telefono: telefono,
            user: req.user.id
        })

        if(!nombre) 
            throw new Error("Debe completar los campos obligatorios: (*)")
        if(!apellido) 
            throw new Error("Debe completar los campos obligatorios: (*)")
        if(!pais) 
            throw new Error("Debe completar los campos obligatorios: (*)")
        if(!telefono) 
            throw new Error("Debe completar los campos obligatorios: (*)")
        if(!altura) 
            throw new Error("Debe completar los campos obligatorios: (*)")
        if(!calle) 
            throw new Error("Debe completar los campos obligatorios: (*)")

        await personaldata.save()
        req.flash("mensajes", [{msg: "Datos agregados correctamente"}])
        res.redirect('/datosLaborales/datosLaborales')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/datosPersonales')
    }
}


//Editar Datos Personales segun el ID
const editarDatosPersonales = async(req, res)=>{
    const {id} = req.params
    try{
        const personaldata = await PersonalData.findById(id).lean()

        if(!personaldata.user.equals(req.user.id)){
            throw new Error("No posee permiso para editar los datos")
        }

        res.render('cardEditar', {personaldata : personaldata})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


//Guarda los datos editados 
const guardarDatosEditados = async(req, res)=>{
    const {id} = req.params
    let {nombre, apellido, calle, altura, cp, pais, telefono} = req.body
    try{
        const personaldata = await PersonalData.findById(id)
        if(!personaldata.user.equals(req.user.id)){
            throw new Error("No posee permiso para editar los datos")
        }
        if(!nombre){
            nombre = personaldata.nombre
        }
        if(!apellido){
            apellido = personaldata.apellido
        }
        if(!calle) {
            calle = personaldata.calle
        }
        if(!altura){
            altura = personaldata.altura
        }
        if(!telefono){
            telefono = personaldata.telefono
        }
        if(!pais){
            pais = personaldata.pais
        }
        if(!cp){
            cp = personaldata.cp
        }
        await personaldata.updateOne({nombre, apellido, calle, altura, cp, pais, telefono})
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        0
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


//Muestra el Form de Editar Foto
const formEditarFoto = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.render('editarFotoPerfil', {user: req.user, imagen: user.imagen})  
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al mostrar la imagen"}])
        res.redirect('datosPerfil')
    }
}

//Guarda la foto de perfil nueva
const editarFoto = async(req, res)=>{
    const form = new formidable.IncomingForm()
    form.maxFileSize = 50 * 1024 * 1024//50mb
    form.parse(req, async(err, fields, files)=>{
        try{
            if(err){
                throw new Error('Hubo un error al subir el archivo')
            }
            const file= files.myFile
            if(file.originalFilename === ""){
                throw new Error("Por favor agrega una imagen")
            }
            const imageTypes = ["image/jpeg", "image/png"]
            if(!imageTypes.includes(file.mimetype)){
                throw new Error('El archivo debe ser .jpg o .png')
            }
            if(file.size > 50 * 1024 * 1024){
                throw new Error('El archivo no debe pesar mas de 50MB')
            }
    
            const extension = file.mimetype.split("/")[1]
            const dirFile = path.join(__dirname, `../public/img/perfiles/${req.user.id}.${extension}`)
            fs.renameSync(file.filepath, dirFile)
            const image = await Jimp.read(dirFile)
            image.resize(200, 200).quality(90).writeAsync(dirFile)
            const user = await User.findById(req.user.id)
            user.imagen = `${req.user.id}.${extension}`
    
            await user.updateOne({imagen: user.imagen})
            req.flash("mensajes", [{msg: "Datos actualizados"}])
            return res.redirect('/datosPersonales/verMisDatos')
        }
        catch(error){
            req.flash("mensajes", [{msg: error.message}])
            res.redirect('editarFotoPerfil')
        }
    })
}

//Muestra el Form de Editar Experiencia
const formEditarExperiencia = async(req, res)=>{
    try{
        const laboralData =  await LaboralData.findById(req.user.id)
        res.render('editarExperiencia', {laboralData: laboralData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Experiencia
const editarExperiencia = async(req, res)=>{
    const {id} = req.params
    let {puesto, empresa, desde, hasta,descripcion,puesto2,empresa2,desde2,hasta2,descripcion2,puesto3,empresa3,desde3,hasta3,descripcion3} = req.body
    try{
        const laboralData = await LaboralData.findById(id)
        if(!puesto){
            puesto = laboralData.puesto
        }
        if(!empresa){
            empresa = laboralData.empresa
        }
        if(!desde){
            desde = laboralData.desde
        }
        if(!hasta){
            hasta = laboralData.hasta
        }
        if(!descripcion){
            descripcion = laboralData.descripcion
        }
        if(!puesto2){
            puesto2 = laboralData.puesto2
        }
        if(!empresa2){
            empresa2 = laboralData.empresa2
        }
        if(!desde2){
            desde2 = laboralData.desde2
        }
        if(!hasta2){
            hasta2 = laboralData.hasta2
        }
        if(!descripcion2){
            descripcion2 = laboralData.descripcion2
        }
        if(!puesto3){
            puesto3 = laboralData.puesto3
        }
        if(!empresa3){
            empresa3 = laboralData.empresa3
        }
        if(!desde3){
            desde3 = laboralData.desde3
        }
        if(!hasta3){
            hasta3 = laboralData.hasta3
        }
        if(!descripcion3){
            descripcion3 = laboralData.descripcion3
        }

        await laboralData.updateOne({puesto, empresa, desde, hasta,descripcion,puesto2,empresa2,desde2,hasta2,descripcion2,puesto3,empresa3,desde3,hasta3,descripcion3})
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Perfíl
const formEditarPerfil = async(req, res)=>{
    try{
        const descripcionData =  await DescripcionData.findById(req.user.id)
        res.render('editarPerfil', {descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Perfil
const editarPerfil = async(req, res)=>{
    const {id} = req.params
    let {descripcionPerfil} = req.body
    try{
        const descripcionData = await DescripcionData.findById(id)
        if(!descripcionPerfil){
            descripcionPerfil = descripcionData.descripcionPerfil
        }

        await descripcionData.updateOne({descripcionPerfil})
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Formación
const formEditarFormacion = async(req, res)=>{
    try{
        const laboralData =  await LaboralData.findById(req.user.id)
        res.render('editarFormacion', {laboralData: laboralData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Formación
const editarFormacion = async(req, res)=>{
    const {id} = req.params
    let {carrera, instituto, finalizado,carrera2, instituto2, finalizado2,carrera3, instituto3, finalizado3} = req.body
    try{
        const laboralData = await LaboralData.findById(id)
        if(!carrera){
            carrera = laboralData.carrera
        }
        if(!instituto){
            instituto = laboralData.instituto
        }
        if(!finalizado){
            finalizado = laboralData.finalizado
        }
        if(!carrera2){
            carrera2 = laboralData.carrera2
        }
        if(!instituto2){
            instituto2 = laboralData.instituto2
        }
        if(!finalizado2){
            finalizado2 = laboralData.finalizado2
        }
        if(!carrera3){
            carrera3 = laboralData.carrera3
        }
        if(!instituto3){
            instituto3 = laboralData.instituto3
        }
        if(!finalizado3){
            finalizado3 = laboralData.finalizado3
        }

        await laboralData.updateOne({carrera, instituto, finalizado,carrera2, instituto2, finalizado2,carrera3, instituto3, finalizado3})
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Idioma
const formEditarIdioma = async(req, res)=>{
    try{
        const laboralData =  await LaboralData.findById(req.user.id)
        res.render('editarIdioma', {laboralData: laboralData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Idiomas
const editarIdioma = async(req, res)=>{
    const {id} = req.params
    let {idioma, nivel, idioma2, nivel2, idioma3, nivel3} = req.body
    
    try{
        const laboralData = await LaboralData.findById(id)
        if(!idioma){
            idioma = laboralData.idioma
        }
        if(!nivel){
            nivel = laboralData.nivel
        }
        if(!idioma2){
            idioma2 = laboralData.idioma2
        }
        if(!nivel2){
            nivel2 = laboralData.nivel2
        }
        if(!idioma3){
            idioma3 = laboralData.idioma3
        }
        if(!nivel3){
            nivel3 = laboralData.nivel3
        }

        await laboralData.updateOne({idioma, nivel, idioma2, nivel2, idioma3, nivel3})
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


module.exports = {
    leerDatosPersonales,agregarDatosPersonales,
    editarDatosPersonales,guardarDatosEditados,
    formEditarFoto,editarFoto,
    formEditarExperiencia,editarExperiencia,
    formEditarPerfil,editarPerfil,
    formEditarFormacion,editarFormacion,
    formEditarIdioma,editarIdioma,
}

