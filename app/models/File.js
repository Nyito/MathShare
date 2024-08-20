const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    uuid: {type: String, default: uuidv4, unique: true },
    originalName: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    tags: { type: [String], required: false },
    uploadDate: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    downloadCount: { type: Number, default: 0 },
    accessLevel: { type: String, enum: ['public', 'restricted'], default: 'public' }
});

module.exports = mongoose.model('File', fileSchema);