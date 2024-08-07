const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 } // Limite de 10MB por arquivo
});

module.exports = upload;
