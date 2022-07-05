const express = require('express');
const cors = require('cors')

require('dotenv').config();

const { dbconnection } = require('./database/config');

// crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors())

// Base de datos
dbconnection();


// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});