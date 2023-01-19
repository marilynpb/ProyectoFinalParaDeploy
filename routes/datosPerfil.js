const express = require('express');
const { formPerfil, subirFoto} = require('../controllers/perfilController');
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();


router.get('/datosPerfil',verificarUser, formPerfil)
router.post('/datosPerfil',verificarUser, subirFoto)


module.exports = router