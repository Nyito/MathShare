const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Verificar se o token JWT existe e é válido
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/auth/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/auth/login');
    }
};

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                // Encontre o usuário pelo ID
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};