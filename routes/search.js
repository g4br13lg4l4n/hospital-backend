/**
 * api/todo
 */
const { Router } = require('express');
const { searchAll, collectionSearch } = require('../controllers/search');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:dataSearch', validateJWT, searchAll);
router.get('/coleccion/:table/:dataSearch', validateJWT, collectionSearch);

module.exports = router;