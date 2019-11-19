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
    score = score - coutMultiplicateur;
    affichage.textContent = score;
    multipli = multipli * 2;
    nbMultiplicateur += 1;
    coutMultiplicateur *= nbMultiplicateur;
    event.target.textContent =
      "multiplicateur: " + multipli + " cout: " + coutMultiplicateur;
  }
});

autoClicker.addEventListener("click", function autoClick(){
  let interval = setInterval(() => {
      score+= compteur * multipli;
      affichage.textContent= score;
  }, autoTime);
  autoClicker.removeEventListener("click",autoClick)
  autoClicker.addEventListener("click", function lowerAutoTime(){
      autoTime = autoTime*0.9 ; 
      console.log(autoTime);
      clearInterval(interval);
      autoClick();
      autoClicker.removeEventListener("click", lowerAutoTime)
  })
});
