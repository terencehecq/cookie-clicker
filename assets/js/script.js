let bouton = document.getElementById("click");
let affichage= document.getElementById("affichage");
let multiplicateur= document.getElementById("multiplicateur");
let compteur= 1;//valeur par click
let score= 0;//argent
let multipli = 1;
let coutMultiplicateur= 50

bouton.addEventListener("click", () => {
    score+= compteur * multipli;
    affichage.textContent= score;


});

multiplicateur.addEventListener("click", () => {
    if (score>=coutMultiplicateur){
    score= score-coutMultiplicateur;
    multipli= multipli*2;
    }

});
