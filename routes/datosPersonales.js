const express = require('express');

const { 
    agregarDatosPersonales, 
    leerDatosPersonales, 
    editarDatosPersonales, 
    guardarDatosEditados, 
    formEditarFoto,
    editarFoto,
    formEditarExperiencia,
    editarExperiencia,
    formEditarPerfil,
    editarPerfil,
    formEditarFormacion,
    editarFormacion,
    formEditarIdioma,
    editarIdioma,
} = require('../controllers/datosPersonalesControllers');
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();

router.get('/datosPersonales', verificarUser, (req, res)=>{
    res.render('datosPersonales')
})

router.post('/datosPersonales',verificarUser, agregarDatosPersonales)

router.get('/verMisDatos', verificarUser, leerDatosPersonales)


//Formularios para editar datos
router.get('/editar/:id', verificarUser, editarDatosPersonales)
router.post('/editar/:id', verificarUser, guardarDatosEditados)

router.get('/editarFotoPerfil/:id' , verificarUser, formEditarFoto)
router.post('/editarFotoPerfil/:id' , verificarUser, editarFoto)

router.get('/editarExperiencia/:id', verificarUser, formEditarExperiencia)
router.post('/editarExperiencia/:id', verificarUser, editarExperiencia)

router.get('/editarPerfil/:id', verificarUser, formEditarPerfil)
router.post('/editarPerfil/:id',verificarUser, editarPerfil)

router.get('/editarFormacion/:id', verificarUser, formEditarFormacion)
router.post('/editarFormacion/:id', verificarUser, editarFormacion)

router.get('/editarIdioma/:id', verificarUser, formEditarIdioma)
router.post('/editarIdioma/:id', verificarUser, editarIdioma)


module.exports = router