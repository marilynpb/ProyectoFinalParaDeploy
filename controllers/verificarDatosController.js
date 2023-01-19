const PersonalData = require("../models/PersonalData")

const verificarDatos = async(req, res)=>{
    try{
        const personaldatas = await PersonalData.find({user: req.user.id}).lean()
        if(personaldatas.length == 0){
            res.redirect('/datosPersonales/datosPersonales')
        }
        else{
            res.redirect('/elegirPlantilla/soloElegirPlantilla')
        }
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/')
    }
}

module.exports = {
    verificarDatos
}