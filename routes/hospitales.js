/* 
    '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearHospital, getHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar.campos');

const router = Router();

router.get('/', getHospital);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put('/:id', [], actualizarHospital);

router.delete('/:id',
    borrarHospital);

module.exports = router;