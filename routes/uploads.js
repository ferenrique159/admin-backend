/*  
    api/uploads
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { fileUploads, getImages } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// default options
router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUploads);

router.get('/:tipo/:foto', getImages);

module.exports = router;