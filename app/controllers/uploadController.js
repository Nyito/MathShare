const fs = require('fs');
const path = require('path');

exports.uploadFile = (req, res) => {
    try {
        // res.status(200).json({
        //     message: 'Upload bem-sucedido!',
        //     file: req.file
        // });
        res.redirect('/auth/dashboard');
    } catch (error) {
        // res.status(500).json({
        //     message: 'Falha no upload do arquivo',
        //     error: error.message
        // });
        res.status(500).send('Erro ao enviar arquivo.');
    }
};

exports.listFiles = (req, res) => {
    const directoryPath = path.join(__dirname, '../../uploads');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                message: 'Unable to scan files!',
                error: err.message
            });
        }

        res.status(200).json({
            files: files.map(file => ({
                name: file,
                url: `/uploads/${file}`
            }))
        });
    });
};
