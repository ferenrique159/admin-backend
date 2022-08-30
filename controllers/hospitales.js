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

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, no se encontro el id del hospital'
            });
        }

        const cambiosHospital = {
            //al contatenarlo con 3 punts antes de la req. nos sustrae toda la informacion del body
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            msg: 'Actualizado hospital a la siguiente información',
            hospital: hospitalActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'Error al actualizar'
        });

    }


};

const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, no se encontro el id del hospital'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'El hospital a sido eliminado'
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
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
};