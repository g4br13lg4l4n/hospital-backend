const { Router } = require('express');
const { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsuarios);

router.post('/',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('password', 'password obligatorio').notEmpty(),
        check('email', 'El email no es un farmato valido').isEmail(),
        check('email', 'Email es obligatorio').notEmpty(),
        validarCampos // Valida los errores con nuestro middleware
    ],
    crearUsuario);


router.put('/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email no es un farmato valido').isEmail(),
        check('email', 'Email es obligatorio').notEmpty(),
        validarCampos // Valida los errores con nuestro middleware
    ],
    updateUsuario
);

router.delete('/:id', validateJWT, deleteUsuario);

module.exports = router;