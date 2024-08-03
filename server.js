const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./app/routes/authRoutes');
const uploadRoutes = require('./app/routes/uploadRoutes');
const homeRoutes = require('./app/routes/homeRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

// Configurações
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views')); // Adicione esta linha
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/', homeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes);
app.use('/files', uploadRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
