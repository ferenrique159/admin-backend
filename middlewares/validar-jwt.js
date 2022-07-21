const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, newt) => {
    // Leer token
    const token = req.header('x-token');
    console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    newt();
}

module.exports = {
    validarJWT
}