const express =require('express')
const router = express.Router();
const authController =require('../controllers/auth');
router.post('/inscription',authController.register);
router.post('/connexion',authController.login);

module.exports = router;