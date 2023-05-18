/**
 * api/uploads
 */
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { uploadFile, returnPhoto } = require('../controllers/uploads');
const fileUpload = require('express-fileupload');


const router = Router();
router.use(fileUpload());

router.put('/:tipo/:id', validateJWT, uploadFile);
router.get('/:tipo/:photo', validateJWT, returnPhoto);

module.exports = router;