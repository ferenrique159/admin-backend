/* 
    '/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearMedico, GetMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar.campos');

const router = Router();

router.get('/', GetMedico);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
], actualizarMedico);

router.delete('/:id',
    borrarMedico);

module.exports = router;