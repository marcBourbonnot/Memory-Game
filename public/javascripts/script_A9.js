var images = ["A9-CARTES/DAUPHIN.jpeg","A9-CARTES/ECUREUIL.jpg","A9-CARTES/CHIEN.jpeg","A9-CARTES/PINGOUIN.jpg","A9-CARTES/LION.jpg","A9-CARTES/PERROQUET.jpg","A9-CARTES/ZEBRE.jpg","A9-CARTES/SOURRIS.jpg","A9-CARTES/VACHE.jpg"];
var tab = images.concat(images); // on double les images
var dos = 'DOS/DOS.jpg'; // On met en place l'image de fond sur chaque carte retournée
var clique = 0; // on definie le nombre de tentative de clic
var paires = 0; 
var firstchoix; // Choix de la 1ère carte
var secondchoix; // Choix de la 2ème carte
var norepeat = true; // timer ne se repete pas
var timerID = 0;
var min = 0;
var sec = 0;

function afficherimage() { // Fonction pqui affiche les images
	for (i=0; i<=tab.length-1; i++) { // Boucle qui parcours le tableau d'images
		document.getElementById('jeu').innerHTML += '<img src="DOS/DOS.jpg" onclick="choisir('+i+')" draggable="false">' // A chaque tour, on écrit dans le HTML
	}
}

afficherimage(); // Charge la fonction au chargement de la page

function choisir(carte) { // Choix des cartes quand l'utilisateur clique
	if (norepeat == true) {
		timerID = setInterval('chrono()', 1000);
		norepeat = false;
	}
	if (clique == 2) { // Au délà du deuxième clique
		return; // On affiche rien
	}
	if (clique == 0) { // Au premier clique
		firstchoix = carte; // On attribue le numéro de la carte choisie au premier choix
		document.images[carte].src = tab[carte]; // Affiche l'image de la carte correspondant au choix
		document.images[firstchoix].style.pointerEvents = 'none'; // Désactive l'évènement du clique
		clique = 1; // On passe le clique à 1
	}
	else { // Au deuxième clique
		clique = 2; // On passe le clique à 2
		secondchoix = carte; // On attribue le numéro de la carte choisie au deuxième choix
		document.images[carte].src = tab[carte]; // Affiche l'image de la carte correspondant au choix
		timer = setTimeout('verif()', 1000); // Ajoute un temps de pause puis passe à la fonction de vérification
	}	
}

function verif() { // Vérifie si une paire a été faite
	clearTimeout(verif);
	clique = 0;
	if (tab[secondchoix] == tab[firstchoix]) {
		paires++;
		document.getElementById('score').innerHTML = paires;
		document.images[firstchoix].style.pointerEvents = 'none';
		document.images[firstchoix].style.opacity = '0.3';
		document.images[secondchoix].style.pointerEvents = 'none';
		document.images[secondchoix].style.opacity = '0.3';
	} else {
		document.images[firstchoix].src = dos;
		document.images[firstchoix].style.pointerEvents = 'auto';
		document.images[secondchoix].src = dos;
		document.getElementById('message').style.visibility = 'visible';
		setTimeout(function(){(document.getElementById('message').style.visibility = 'hidden');},3000);
		return;
	}
	if (paires==9) {
		clearInterval(timerID);
		document.getElementById('jeu').style.display = 'block';
		document.getElementById('jeu').style.flexDirection = 'column';
		document.getElementById('jeu').innerHTML = '<h1>Vous avez gagné !</h1><br /><input type="button" class="restart" value="Recommencer" onClick="window.location.reload()">';
	}
}

function random() { // Fonction pour mélanger les cartes au début
	for(var i=tab.length; i; i--) { //pour i=longueur totale du tableau, i toujours vrai(sup a zero), on decremente i(on lui enleve 1).
		j = Math.floor(Math.random() * i);//Math.floor arondie a la valeur superieure,Math.random donne un nombre aleatoire (entre 0 et 1)le tout * i
		x = tab[i-1];  //decale de 1 à l'interrieur du tableau(ex:si i=13 X deviendra lionne)
		tab[i-1] = tab[j]; //si i= 13 tab 12(i-1) deviendras J(j=nombre aleatoire)
		tab[j] = x; //j deviens X(pour cette exemple x=lionne)
	}
}

random(tab); // Charge la fonction au chargement de la page

function chrono() { // Fonction du chronomètre
	if (sec<59) {
		sec++;
		if (sec<10) {
			sec = "0" +sec;
		}
	}
	else if (sec=59) {
		min++;
		sec = "0" + 0;
	}
	document.getElementById("timer").innerHTML = min + ':' + sec;
}