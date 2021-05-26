const express = require('express');
const router = express.Router();

//connexion à la BD
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: 'aws'
});

router.get('/',(req,res)=>{
    res.render('index.html');
})

router.get('/auth/connexion', (req, res) => {
    if (req.query.message) {
        res.render('Connexion.html', {message: req.query.message});
    } else {
        res.render('Connexion.html');
    }
});
router.get('/auth/inscription', (req, res) => {
    res.render('Inscription.html');
});
router.get('/selection', (req, res) => {
    if (req.cookies['userToken'] !== undefined) {
        db.query('SELECT * FROM tokens WHERE token=? LIMIT 1', [req.cookies['userToken']], async(error,result) => {
            if (error) {
                console.log("isAuth => error => recup token info" + error);
            } else {
                if (result !== undefined) {
                    res.render('selection.html');
                } else {
                    res.redirect("/auth/connexion?message=Il faut se connecter ou s'inscrire pour accéder à la page !");
                }
            }
        });
    } else {
        res.redirect("/auth/connexion?message=Il faut se connecter ou s'inscrire pour accéder à la page !");
    }
});

router.get('/jeu_(V|A)(6|9)', (req, res) => {
    if (req.cookies['userToken'] !== undefined) {
        db.query('SELECT * FROM tokens WHERE token=? LIMIT 1', [req.cookies['userToken']], async(error,result) => {
            if (error) {
                console.log("isAuth => error => recup token info" + error);
            } else {
                if (result !== undefined) {
                    db.query('SELECT pseudo, score FROM joueurs WHERE score IS NOT NULL ORDER BY score ASC LIMIT 5', async(error_score,result_score) => {
                        if (error_score) {
                            console.log("/jeu => error => recup highscore" + error_score);
                        } else {
                            res.render(req.path.replace('/', '') + '.html', { best_players: result_score});
                        }
                    });
                } else {
                    res.redirect("/auth/connexion?message=Il faut se connecter ou s'inscrire pour accéder à la page !");
                }
            }
        });
    } else {
        res.redirect("/auth/connexion?message=Il faut se connecter ou s'inscrire pour accéder à la page !");
    }
});
router.get('/logout', (req, res) => {
    if (req.cookies['userToken'] !== undefined)
        res.clearCookie('userToken');
    res.redirect('/auth/connexion');
});

module.exports = router;
