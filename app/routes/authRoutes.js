const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

router.get('*', checkUser); // Aplica o middleware checkUser a todas as rotas
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);
router.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));

module.exports = router;