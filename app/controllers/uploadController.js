const File = require('../models/File');
const path = require('path');

exports.uploadFile = async (req, res) => {
    try {
        const newFile = new File({
            originalName: req.file.originalname, 
            mimeType: req.file.mimetype,
            size: req.file.size,
            uploader: req.body.uploader,
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
            accessLevel: req.body.accessLevel || 'public'
        });

        await newFile.save();

        res.redirect('/auth/dashboard');
    } catch (error) {
       
        res.status(500).send('Erro ao enviar arquivo.');
    }
};

exports.listFiles = async (req, res) => {
    try {
        const files = await File.find({});

        res.status(200).json({
            files: files.map(file => ({
                uuid: file.uuid,
                name: file.originalName,
                mimeType: file.mimeType,
                size: file.size,
                tags: file.tags,
                uploadDate: file.uploadDate,
                uploader: file.uploader,
                downloadCount: file.downloadCount,
                accessLevel: file.accessLevel,
                url: `/uploads/${file.uuid}`
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to fetch files!',
            error: error.message
        });
    }
};