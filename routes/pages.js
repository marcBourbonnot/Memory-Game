const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index.html');
})

router.get('/auth/connexion', (req, res) => {
    res.render('Connexion.html');
});
router.get('/auth/inscription', (req, res) => {
    res.render('Inscription.html');
});
router.get('/selection', (req, res) => {
    res.render('selection.html');
});
router.get('/jeu', (req, res) => {
    res.render('jeu.html');
});

router.get('/jeu_V6', (req, res) => {
    res.render('jeu_V6.html');
});
router.get('/jeu_V9', (req, res) => {
    res.render('jeu_V9.html');
});
router.get('/jeu_A6', (req, res) => {
    res.render('jeu_A6.html');
});
router.get('/jeu_A9', (req, res) => {
    res.render('jeu_A9.html');
});

module.exports = router;
