const mongoose = require('mongoose')
const {Schema} = mongoose


const LaboralDataSchema = new Schema({
    carrera:{
        type: String,
        require: true,
        unique: false
    },
    instituto:{
        type: String,
        require: true,
        unique: false
    },
    finalizado:{
        type: String,
        require: true,
        unique: false
    },
    carrera2:{
        type: String,
        require: false,
        unique: false
    },
    instituto2:{
        type: String,
        require: false,
        unique: false
    },
    finalizado2:{
        type: String,
        require: false,
        unique: false
    },
    carrera3:{
        type: String,
        require: false,
        unique: false
    },
    instituto3:{
        type: String,
        require: false,
        unique: false
    },
    finalizado3:{
        type: String,
        require: false,
        unique: false
    },


    puesto:{
        type: String,
        unique: false,
        require: false
    },
    empresa:{
        type: String,
        unique: false,
        require: false
    },
    desde:{
        type: String,
        require: true,
        unique: false,
    },
    hasta:{
        type: String,
        require: true,
        unique: false
    },
    descripcion:{
        type: String,
        unique: false,
        require: true
    },
    puesto2:{
        type: String,
        unique: false,
        require: false
    },
    empresa2:{
        type: String,
        unique: false,
        require: false
    },
    desde2:{
        type: String,
        require: false,
        unique: false,
    },
    hasta2:{
        type: String,
        require: false,
        unique: false
    },
    descripcion2:{
        type: String,
        unique: false,
        require: false,
    },
    puesto3:{
        type: String,
        unique: false,
        require: false
    },
    empresa3:{
        type: String,
        unique: false,
        require: false
    },
    desde3:{
        type: String,
        require: false,
        unique: false,
    },
    hasta3:{
        type: String,
        require: false,
        unique: false
    },
    descripcion3:{
        type: String,
        unique: false,
        require: false
    },

    
    idioma:{
        type: String,
        unique: false,
        require: false
    },
    nivel:{
        type: String,
        unique: false,
        require: false
    },
    idioma2:{
        type: String,
        unique: false,
        require: false
    },
    nivel2:{
        type: String,
        unique: false,
        require: false
    },
    idioma3:{
        type: String,
        unique: false,
        require: false
    },
    nivel3:{
        type: String,
        unique: false,
        require: false
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    
})


const LaboralData = mongoose.model('LaboralData', LaboralDataSchema)
module.exports = LaboralData