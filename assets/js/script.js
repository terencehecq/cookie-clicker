let bouton = document.getElementById("click");
let affichage = document.getElementById("affichage");
let multiplicateur = document.getElementById("multiplicateur");
let compteur = 1; //valeur par click
let score = 0; //argent
let multipli = 1;
let nbMultiplicateur = 0;
let coutMultiplicateur = 10;

bouton.addEventListener("click", () => {
  score += compteur * multipli;
  affichage.textContent = score;
});

multiplicateur.addEventListener("click", event => {
  if (score >= coutMultiplicateur) {
    nbMultiplicateur += 1;
    multipli = multipli * 2;
    score = score - coutMultiplicateur;
    affichage.textContent = score;
    coutMultiplicateur = coutMultiplicateur * multipli;
    event.target.textContent =
      "multiplicateur: " + multipli + " cout: " + coutMultiplicateur;
  }
});
