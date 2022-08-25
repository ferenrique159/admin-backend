const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    /*object.uid = _id;
    al colocar la linea de arriba agregare por predeterminado que se muestre cierto valor en la tabla 
    */
    return object;
});

module.exports = model('Hospital', HospitalSchema);
// por predeterminado mongoose colocara en la base de datos una "s" al final.