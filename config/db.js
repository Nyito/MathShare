const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Conectado ao banco de dados!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        process.exit(1);
    }
};

module.exports = connectDB;
