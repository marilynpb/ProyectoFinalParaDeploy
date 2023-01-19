const express = require('express');
const { subirDescripcion } = require('../controllers/descripcionController');
const verificarUser = require("../middlewares/verificarUser")

const router = express.Router();

router.get('/datosDescripcion', verificarUser, (req, res)=>{
    res.render('datosDescripcion')
})

router.post('/datosDescripcion', verificarUser, subirDescripcion)

module.exports = router