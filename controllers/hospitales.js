const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre');

    res.status(500).json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(500).json({
            ok: true,
            Hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el adminstrador'
        });
    }

};

const actualizarHospital = (req, res = response) => {

    res.status(500).json({
        ok: true,
        msg: 'actualizar H'
    });
};

const borrarHospital = (req, res = response) => {

    res.status(500).json({
        ok: true,
        msg: 'borrar H'
    });
};

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
};