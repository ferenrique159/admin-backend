const mongoose = require('mongoose');

const dbconnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {});
        // para conexiones proximas a mongoose la contraseña no debe incluir un @ sino arrojara un error en la concexion

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}

module.exports = {
    dbconnection
}

// contraseña nueva de usuario u_Xv5SG9Wn*rAW7