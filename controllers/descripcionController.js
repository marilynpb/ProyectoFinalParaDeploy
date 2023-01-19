const DescripcionData = require('../models/DescripcionData')

//Agregar nuevos Datos Personales
const subirDescripcion = async(req, res)=>{
    const {descripcionPerfil} = req.body

    try{
        const descripcionData = new DescripcionData({
            descripcionPerfil: descripcionPerfil,
            user: req.user.id
        })

        if(!descripcionPerfil) 
            throw new Error("Debe completar los campos obligatorios: (*)")

        await descripcionData.save()
        req.flash("mensajes", [{msg: "Datos agregados correctamente"}])
        res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosDescripcion/datosDescripcion')
    }
}

module.exports = {
    subirDescripcion
}