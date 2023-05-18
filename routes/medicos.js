/**
 * api/hospitales
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getMedicos, crearMedico, updateMedico, deleteMedico } = require('../controllers/medicos');

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validateJWT,
        check('name', 'Nombre de medico requerido').notEmpty(),
        check('hospital', 'Hospital relacionado requerido').notEmpty(),
        check('hospital', 'Hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);


router.put('/:id',
    [],
    updateMedico
);

router.delete('/:id', validateJWT, deleteMedico);


module.exports = router;