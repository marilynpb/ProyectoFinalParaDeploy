const LaboralData = require('../models/LaboralData')
const PersonalData = require('../models/PersonalData')

//Guarda los datos laborales y de formación
const agregarDatos = async(req, res)=>{
    const {
        carrera, instituto, finalizado,carrera2, instituto2, finalizado2,carrera3, instituto3, finalizado3, puesto, empresa, desde, hasta, descripcion, puesto2, empresa2, desde2, hasta2, descripcion2, puesto3, empresa3, desde3, hasta3, descripcion3, idioma, nivel, idioma2, nivel2, idioma3, nivel3,
    } = req.body
    
    try{
        const laboralData = new LaboralData({
            carrera: carrera,
            instituto: instituto,
            finalizado: finalizado,
            puesto: puesto,
            empresa: empresa,
            desde: desde,
            hasta: hasta,
            descripcion: descripcion,
            idioma: idioma,
            nivel: nivel,
            
            carrera2: carrera2,
            instituto2: instituto2,
            finalizado2: finalizado2,
            puesto2: puesto2,
            empresa2: empresa2,
            desde2: desde2,
            hasta2: hasta2,
            descripcion2: descripcion2,
            idioma2: idioma2,
            nivel2: nivel2,

            carrera3: carrera3,
            instituto3: instituto3,
            finalizado3: finalizado3,
            puesto3: puesto3,
            empresa3: empresa3,
            desde3: desde3,
            hasta3: hasta3,
            descripcion3: descripcion3,
            idioma3: idioma3,
            nivel3: nivel3,
            
            user: req.user.id
        })

        if(!carrera){
            throw new Error("Complete los campos obligatorios: (*carrera)")
        }
        if(!instituto){
            throw new Error("Complete los campos obligatorios: (*instituto)")
        }
        if(!finalizado){
            throw new Error("Complete los campos obligatorios: (*egreso)")
        }
        if(!puesto){
            throw new Error("Complete los campos obligatorios: (*puesto)")
        }
        if(!empresa){
            throw new Error("Complete los campos obligatorios: (*empresa)")
        }
        if(!desde){
            throw new Error("Complete los campos obligatorios: (*desde)")
        }
        if(!hasta){
            throw new Error("Complete los campos obligatorios: (*hasta)")
        }
        if(!descripcion){
            throw new Error("Complete los campos obligatorios: (*descripcion)")
        }

        await laboralData.save()
        req.flash("mensajes", [{msg: "Datos agregados correctamente"}])
        
        res.redirect('/datosPerfil/datosPerfil')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosLaborales/datosLaborales')
    }
}


module.exports = {
    agregarDatos,
}
