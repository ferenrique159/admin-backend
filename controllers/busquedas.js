const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    // crearemos un expresion regulada para que la busqueda no sea tan radical y poder conseguir los usuarios sin necesidad de escribir de manera exacta el nombre o apellido
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospiales] = await Promise.all([
        await Usuario.find({ nombre: regex }),
        await Medico.find({ nombre: regex }),
        await Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospiales
    });

};

const getDireccionColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    // crearemos un expresion regulada para que la busqueda no sea tan radical y poder conseguir los usuarios sin necesidad de escribir de manera exacta el nombre o apellido
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser medicos/hospitales/usuarios'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

};

module.exports = {
    getTodo,
    getDireccionColeccion
};