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

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, no se encontro el id del hospital'
            });
        }

        const cambiosMedico = {
            //al contatenarlo con 3 punts antes de la req. nos sustrae toda la informacion del body
            ...req.body,
            usuario: uid,


        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Medico actualizado a la siguiente información',
            medico: medicoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'Error al actualizar'
        });

    }
};

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, no se encontro el id del medico'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El medico a sido eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'Error al eliminar'
        });

    }
};

module.exports = {
    GetMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
};