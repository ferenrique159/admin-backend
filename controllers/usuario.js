const { response } = require('express');
// Se coloca esta importacion para poder concatenar los status, json, destroy entre otros con la ayuda de VS y/o typeScript

const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const login = require('../controllers/auth');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({});
    // Al colocarle dentro de los parentesis los campos a requerir se mostraran netamente los solicitados

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuarios = async(req, res = response) => {
    // Se coloca el "= response" para saber que en caso de que no haya o no responda al req o res debe de ser responde
    const { email, password } = req.body;

    /*
    Una validacion por cada campo aunque seria tediosa por lo larga pero podria servir podria ser:

    if(!nombre){
        return.json({
            ok: false,
            msg: 'Falto escribir nombre'
        })
    }
    */

    try {

        const emailExist = await Usuario.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        // Encryptar contraseña con bcryptjs
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // generar JWT - Token
        const token = await generarJWT(usuario.id);

        // Importante saber que si se coloca otro .json junto a este try va a arrojar un error! solo se puede uno solo
        res.json({
            ok: true,
            usuario: usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar los logs'
        })
    }


}

const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            })
        }

        // Actualizaciones

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe'
                });
            }
        }
        //delete campos.password; <- esto se haria si al crear la constante "campos" no se colocaria las llaves con los campos que voy a obviar en el proceso
        //delete campos.google;
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    };

}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid)

        res.json({
            ok: true,
            msg: ' Usuario fue eliminado '
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}