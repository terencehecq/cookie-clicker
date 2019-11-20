let bouton = document.getElementById("click");
let affichage = document.getElementById("affichage");
let multiplicateur = document.getElementById("multiplicateur");
let autoClicker = document.getElementById("autoClicker");
let compteur = 1; //valeur par click
let score = 0; //argent
let multipli = 1;
let nbMultiplicateur = 0;
let coutMultiplicateur = 10;
let nbAutoClicker = 0;
let coutAutoClicker = 25;

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

autoClicker.addEventListener("click", function autoClick() {
  if (score >= coutAutoClicker) {
    score = score - coutAutoClicker;
    affichage.textContent = score;
    nbAutoClicker += 1;
    coutAutoClicker *= nbAutoClicker;
    autoClicker.textContent = `${nbAutoClicker} Auto-clicker / price : ${coutAutoClicker}`;

    setInterval(() => {
      score += compteur * multipli;
      affichage.textContent = score;
    }, 2000);
  }
});
