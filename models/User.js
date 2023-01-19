const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const UserSchema = new Schema({
    email:{
        type: String,
        lowercase: true,
        required: true,
        index: {unique: true}
    },
    password:{
        type: String,
        required: true,
    },
    tokenConfirm:{
        type: String,
        default: null
    },
    cuentaConfirmada:{
        type: Boolean,
        default: null
    },
    imagen:{
        type: String,
        default: null,
    },
})


module.exports = mongoose.model('User', UserSchema)