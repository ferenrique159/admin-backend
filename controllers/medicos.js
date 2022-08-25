const { response } = require('express');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const GetMedico = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

    res.status(500).json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.status(500).json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin'
        });

    }

};

const actualizarMedico = (req, res = response) => {

    res.status(500).json({
        ok: true,
        msg: 'actualizar M'
    });
};

const borrarMedico = (req, res = response) => {

    res.status(500).json({
        ok: true,
        msg: 'borrar M'
    });
};

module.exports = {
    GetMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
};