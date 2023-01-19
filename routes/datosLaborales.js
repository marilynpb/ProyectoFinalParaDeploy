const express = require('express');
const { agregarDatos} = require('../controllers/datosLaboralesController');
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();

router.get('/datosLaborales', verificarUser, (req, res)=>{
    res.render('datosLaborales')
})

router.post('/datosLaborales',verificarUser, agregarDatos)

module.exports = router