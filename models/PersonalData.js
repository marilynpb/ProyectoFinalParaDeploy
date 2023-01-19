const mongoose = require('mongoose');
const {Schema} = mongoose

const PersonalDataSchema = new Schema({
    nombre:{
        type: String,
        unique:false,
        required: true
    },
    apellido:{
        type: String,
        unique:false,
        required: true
    },
    fechaNac:{
        type: String,
        unique:false,
        required: false
    },
    sexo:{
        type: String,
        unique:false,
        required: false
    },
    estadoCivil:{
        type: String,
        unique:false,
        required: false
    },
    calle:{
        type: String,
        unique:false,
        required: true
    },
    altura:{
        type: Number,
        unique:false,
        required: true
    },
    cp:{
        type: Number,
        unique:false,
        required: false
    },
    pais:{
        type: String,
        unique:false,
        required: true
    },
    telefono:{
        type: Number,
        unique:false,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    }
})

const PersonalData= mongoose.model('PersonalData', PersonalDataSchema)
module.exports = PersonalData;