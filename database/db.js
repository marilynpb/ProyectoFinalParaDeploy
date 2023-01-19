const mongoose = require('mongoose');
require('dotenv').config();

const clientDB = mongoose
    .connect(process.env.URI)
    .then((m)=> {
        console.log("Aplicación conectada a la Base de Datos ✅")
        return m.connection.getClient()
    })
    .catch((e)=> console.log("Error al conectar la Base de Datos ❌" + e))

module.exports = clientDB