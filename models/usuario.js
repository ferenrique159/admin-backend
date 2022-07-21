const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    /*object.uid = _id;
    al colocar la linea de arriba agregare por predeterminado que se muestre cierto valor en la tabla 
    */
    return object;
})

module.exports = model('Usuario', UsuarioSchema);
// por predeterminado mongoose colocara en la base de datos una "s" al final.