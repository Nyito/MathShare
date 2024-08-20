const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: true},
    signInDate: {type: Date, default: Date.now},
    roles: {type: String, default: 'public'},
    university: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);