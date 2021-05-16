const express =require('express')
const router = express.Router();
const authController =require('../controllers/auth');
router.post('/Inscription.html',authController.register);
router.post('/Connexion.html',authController.login);

module.exports = router;