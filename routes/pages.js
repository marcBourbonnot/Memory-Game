const express = require('express');
const router = express.Router();

//connexion à la BD
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.DATABASE
});

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

router.get('/jeu_V6', (req, res) => {
    db.query('SELECT pseudo, score FROM joueurs WHERE score IS NOT NULL ORDER BY score ASC LIMIT 5', async(error,result) => {
        res.render('jeu_V6.html', { best_players: result});
    });
});
router.get('/jeu_V9', (req, res) => {
    db.query('SELECT pseudo, score FROM joueurs WHERE score IS NOT NULL ORDER BY score ASC LIMIT 5', async(error,result) => {
        res.render('jeu_V9.html', { best_players: result});
    });
});
router.get('/jeu_A6', (req, res) => {
    db.query('SELECT pseudo, score FROM joueurs WHERE score IS NOT NULL ORDER BY score ASC LIMIT 5', async(error,result) => {
        res.render('jeu_A6.html', { best_players: result});
    });
});
router.get('/jeu_A9', (req, res) => {
    db.query('SELECT pseudo, score FROM joueurs WHERE score IS NOT NULL ORDER BY score ASC LIMIT 5', async(error,result) => {
        res.render('jeu_A9.html', { best_players: result});
    });
});

module.exports = router;
