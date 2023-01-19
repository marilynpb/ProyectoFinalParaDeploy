const express = require('express');
const {body} = require('express-validator')

const { 
    loginForm, 
    registerForm, 
    registerUser, 
    confirmarCuenta, 
    loginUser, 
    cerrarSesion,
    eliminarCuenta,
    enviarResetPass,
    guardarNuevaPass,
    confirmEliminar
} = require('../controllers/authController');
const verificarUser = require('../middlewares/verificarUser');

const router = express.Router();

//Form Registro
router.get('/register', registerForm)

router.post('/register', [
    body('email', "Ingrese un correo electrónico válido")
        .trim()
        .isEmail()
        .normalizeEmail(),

    body('password', "La contaseña debe tener al menos 6 carácteres")
        .trim()
        .isLength({min:6})
        .isLength({max:100})
        .escape()
        .custom((value, {req})=>{
            if(value !== req.body.rePassword){
                throw new Error('Las contraseñas no coinciden')
            }
            else{
                return value;
            }
    })
], registerUser)

//Verificar cuenta
router.get('/confirmar/:token', confirmarCuenta)

//Form login
router.get('/login', loginForm)

router.post('/login',[
    body('email', "Ingrese un correo electrónico válido")
        .trim()
        .isEmail()
        .normalizeEmail(),

    body('password', "La contaseña debe tener al menos 6 carácteres")
        .trim()
        .isLength({min:6})
        .escape()
] ,loginUser)

//Cerrar sesión
router.get('/loguot', cerrarSesion)

//Form olvidé mi contraseña
router.get('/rememberPass', (req, res)=>{
    res.render('olvideMiContraseña')
})

router.post('/rememberPass',[
    body('email', "Ingrese un correo electrónico válido")
        .trim()
        .isEmail()
        .normalizeEmail(),
], enviarResetPass)

router.get('/reestablecerPassword/:id', (req, res)=>{
    res.render('editarPassword')
})

router.post('/reestablecerPassword/:id',[
    body('password', "La contaseña debe tener al menos 6 carácteres")
        .trim()
        .isLength({min:6})
        .escape()
        .custom((value, {req})=>{
            if(value !== req.body.rePassword){
                throw new Error('Las contraseñas no coinciden')
            }
            else{
                return value;
            }
    })
], guardarNuevaPass)

//Form eliminar cuenta
router.get('/eliminarCuenta', verificarUser, eliminarCuenta)
router.get('/confirmEliminar', verificarUser, confirmEliminar)


module.exports = router