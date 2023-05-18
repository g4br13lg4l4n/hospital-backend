/**
 * Path: '/api/login'
 */
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/', 
    [
        check('email', 'El formato email es incorrecto').isEmail(),
        check('email', 'El email es obligatorio').notEmpty(),
        check('password', 'El password es obligatorio').notEmpty(),
        validarCampos
    ],
    login
)

router.post('/google', 
    [
        check('token', 'Token requerido').notEmpty(),
        validarCampos
    ],
    googleSignIn
)

module.exports = router;