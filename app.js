var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');



var app = express();
//creer le chemin vers le dossier public
//permet de faire les liens depuis les views vers les stylesheets dans public
const publicDirectory = path.join(__dirname, '/public/stylesheets');
app.use(express.static(publicDirectory));
//permet de faire les liens depuis les views vers les stylesheets dans public

const publicjs=path.join(__dirname, '/public/javascripts');
app.use(express.static(publicjs));

//permet de faire les liens depuis les views vers les stylesheets dans public
const publicimg = path.join(__dirname, '/public/images');
app.use(express.static(publicimg));

//Parse urluncoded bodies ( as sent by forms)
app.use(express.urlencoded({extended: false}))
//parse json bodies( sent as json)
app.use(express.json());

//création du port
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("serveur started on port " + port);
});

// relier le fichier au dotenv
const dotenv=require('dotenv');
dotenv.config({path :'./.env'});

// connexion à la base de données
var mysql = require('mysql');
var db    = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : 'aws'
});

//verification de la connexion à la base de données
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log('connexion établie à la base ...')
    }
})


// condiguration de nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//les routes des pages
app.use('/', require('./routes/pages'));
// les routes auth
app.use('/auth',require('./routes/auth'));

module.exports = app;
