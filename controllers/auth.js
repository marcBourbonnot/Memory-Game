//
const jwt = require('jsonwebtoken');
// bcrypt pour le hachage
const bcrypt = require('bcryptjs');
//connexion à la BDD
var mysql = require('mysql');
var db    = mysql.createConnection({
    host     : process.env.DATA_HOST ,
    user     : process.env.DATA_USER ,
    password : process.env.DATA_MDP ,
    database : process.env.DATA_NAME ,
});
//fonction qui permet de recuperer les données de l'inscription
exports.register=(req,res)=>{
    //ecrire en console les données entrées sous format json
    console.log(req.body);
    //recuperer les données entrées dans le formulaire
    const {nom, adremail, mdp, confirmepassword}= req.body;
    if(!nom || !mdp || !adremail || !confirmepassword){
        return res.status(400).render('Inscription.html',{
            message : 'champs non renseigné !'
        })
    }

    db.query('SELECT pseudo FROM joueurs WHERE pseudo=?',[nom],async(error,result)=> {
        if(error){
            console.log(error);
        }
        if(result.length>0){
            return res.render('Inscription.html',{
                message: 'Pseudo already exists'
            })
        }
    })
    db.query('SELECT adresse_mail FROM joueurs WHERE adresse_mail=?',[adremail],async(error,result)=>{
        //si erreur dans la requete => ecrire l'erreur
        if(error){
            console.log(error);
        }
        //si l'eamail exist ecrir qu'il exist
        if(result.length>0){
            return res.render('Inscription.html',{
                message: 'that email already exists'
            })
        // si le mdp et la confirmation differe => ecrire le message
        }else if(mdp!==confirmepassword){
           return res.render('Inscription.html',{
               message:'mots de passe differents'
           });
        }

            //await pour ne pas arreter le processus sur cette tache le temps du hachage
        //let hacheMDP = await bcrypt.hash(mdp,8);// 8 correspond au nombre de tour du hachege du mot de passe
       // console.log(hacheMDP);// pour afficher le mdp haché
        //insertion du nouveau joueurs dans la BDD
        db.query('insert into joueurs set ?',{pseudo: nom, adresse_mail: adremail, mot_de_passe: mdp},(error,result)=>{
        if(error)
        {
            console.log(error);
        }  else{
            console.log(result);
            return res.render('selection.html',{
                message:'user registred'
            });
        }
    })
    });

}

exports.login=async (req,res)=>{
    try{
        const {pseudo,mdp}=req.body;
        if(!pseudo || !mdp){
            return res.status(400).render('Connexion.html',{
                message : 'champs non renseigné'
            })
        }

        db.query('SELECT * FROM joueurs WHERE pseudo = ?',[pseudo],async(error,result)=> {
            console.log(result);
            if (result.length==0) {
                    res.status(401).render('Connexion.html', {
                    message: 'pseudo incorrect!'
                });
            } else if (mdp!==result[0].mot_de_passe) {
                res.status(401).render('Connexion.html', {
                    message: 'mdp incorrect!'
                });
            }else if(mdp==result[0].mot_de_passe){

                return res.render('selection.html',{
                    message:'user registred'
                });
            }
        })
    }catch(error){
        console.log(error);
    }
}