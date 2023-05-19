/**
 * api/hospitales
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getHospitales, crearHospital, deleteHospital, updateHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospitales);

router.post('/',
    [
        validateJWT,
        check('name', 'Nombre de hospital obligatorio').notEmpty(),
        validarCampos
    ],
    crearHospital);


router.put('/:id',
    [
        validateJWT,
        check('name', 'Nombre de hospital obligatorio').notEmpty(),
        validarCampos
    ],
    updateHospital
);

router.delete('/:id', validateJWT, deleteHospital);


module.exports = router;