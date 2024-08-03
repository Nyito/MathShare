const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const uploadController = require('../controllers/uploadController');

router.post('/upload', upload.single('file'), uploadController.uploadFile);
router.get('/files', uploadController.listFiles);

module.exports = router;
