const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')
const User = require('../models/User')

//Formulario de Perfíl
const formPerfil = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.render('datosPerfil', {user: req.user, imagen: user.imagen})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al mostrar la imagen"}])
        res.redirect('datosPerfil')
    }
    res.render('datosPerfil')
}

//Guarda la foto subida
const subirFoto =  async(req, res)=>{
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
            image.resize(200, 200).quality(100).writeAsync(dirFile)
            const user = await User.findById(req.user.id)
            user.imagen = `${req.user.id}.${extension}`

            await user.save()
            req.flash("mensajes", [{msg: "Archivo subido exitosamente"}])
            return res.redirect('/datosDescripcion/datosDescripcion')
        }
        catch(error){
            req.flash("mensajes", [{msg: error.message}])
            res.redirect('/datosPerfil/datosPerfil')
        }
    })
}


module.exports = {
    formPerfil,
    subirFoto,
}

