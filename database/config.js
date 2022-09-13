const mongoose = require('mongoose');

const bdConnection = async () => {
   try {
    await mongoose.connect(process.env.BD_CNN);
    console.log('DB Online');
   } catch (error) {
    throw new Error('Error en la conexión de la BD');
   }
}

module.exports = {
    bdConnection
}