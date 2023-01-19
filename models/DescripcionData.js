const mongoose = require('mongoose')
const {Schema} = mongoose

const DescripcionDataSchema = new Schema({
    descripcionPerfil:{
        type: String,
        unique: false,
        require: true
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    }
})

const DescripcionData = mongoose.model('DescripcionData', DescripcionDataSchema)
module.exports = DescripcionData