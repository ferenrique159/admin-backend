const express = require('express');
const cors = require('cors')

require('dotenv').config();

const { dbconnection } = require('./database/config');

// crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbconnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});