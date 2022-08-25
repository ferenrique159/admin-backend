const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' });

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    /*object.uid = _id;
    al colocar la linea de arriba agregare por predeterminado que se muestre cierto valor en la tabla 
    */
    return object;
});

module.exports = model('Medico', MedicoSchema);
// por predeterminado mongoose colocara en la base de datos una "s" al final.