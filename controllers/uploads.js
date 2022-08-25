const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { actualizarImgen } = require('../helpers/actualizar-imagen');


const fileUploads = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validaremos los tipos permitidos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es del tipo valido (hospitales, medicos o usuarios)'
        });
    }

    // validacion de la imagen traida del express-fileUpload
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No cargo ningun archivo'
        });
    }

    // procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validaremos las extensiones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extensión no es permitida'
        });
    }

    // Generar el nombre del archivo (uuidv4 nos cambia el nombre por defecto para que asi no haya un error de que dos clientes suban una imagen con el mismo nombre)
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //mov la imagen con uuid
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //actualizar imagen
        actualizarImgen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

};

const getImages = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image.png`);
        res.sendFile(pathImg);
    }
};

module.exports = {
    fileUploads,
    getImages
};