const express = require('express');
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();

router.get('/verMisDatos', verificarUser, (req, res)=>{
    res.render('verMisDatos')
})

router.get('/miCurriculum', verificarUser, (req, res)=>{
    res.render('miCurriculum')
})



module.exports = router