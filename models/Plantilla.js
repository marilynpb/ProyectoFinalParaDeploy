const mongoose = require('mongoose')
const {Schema} = mongoose

const PlantillaSchema = new Schema({
    elegirPlantilla:{
        type: String,
        require: true,
        unique: false
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
})

const Plantilla = mongoose.model('Plantilla', PlantillaSchema)
module.exports = Plantilla