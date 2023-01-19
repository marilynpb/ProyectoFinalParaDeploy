const express = require('express');

const router = express.Router();

router.get('/donaciones', (req, res)=>{
    res.render('donaciones')
})

router.get('/plantillas', (req, res)=>{
    res.render('plantillas')
})

router.get('/acercaDe', (req, res)=>{
    res.render('acercaDe')
})

router.get('/contacto', (req, res)=>{
    res.render('contacto')
})

router.get('/terminosYcondiciones', (req, res)=>{
    res.render('terminosYcondiciones')
})

router.get('/politicas', (req, res)=>{
    res.render('politicas')
})


module.exports = router