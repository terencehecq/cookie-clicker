let bouton = document.getElementById("click");
let affichage= document.getElementById("affichage");
let compteur= 1;//valeur par click
let score= 0;//argent
let multiplicateur = 1;


bouton.addEventListener("click", () => {
    score+= compteur * multiplicateur;
    affichage.textContent= score;

multiplicateur= multiplicateur*multiplicateur
});
