const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borrar imagen anterior
        fs.unlinkSync(path);
    }
};


const actualizarImgen = async(tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico que contenga ID');
                return false;
            }

            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            {
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    console.log('No es un hospital que contenga ID');
                    return false;
                }

                const pathViejo = `./uploads/hospitales/${ hospital.img }`;
                borrarImagen(pathViejo);

                hospital.img = nombreArchivo;
                await hospital.save();
                return true;
            }
        case 'usuarios':
            {
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    console.log('No es un usuario que contenga ID');
                    return false;
                }

                const pathViejo = `./uploads/usuarios/${ usuario.img }`;
                borrarImagen(pathViejo);

                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            }
        default:
            break;
    }

};

module.exports = {
    actualizarImgen
};