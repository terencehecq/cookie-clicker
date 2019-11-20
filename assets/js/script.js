let bouton = document.getElementById("click");
let affichage = document.getElementById("affichage");
let multiplicateur = document.getElementById("multiplicateur");
let autoClicker = document.getElementById("autoClicker");
let compteur = 1; //valeur par click
let score = 0; //argent
let multipli = 1;
let nbMultiplicateur = 0;
let coutMultiplicateur = 10;
let autoTime = 10000;
let nbAutoClick = 0;
let coutAutoClick = 50;

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

autoClicker.addEventListener("click", function autoClick(e){
  if (score >= coutAutoClick) {
    score = score - coutAutoClick;
    affichage.textContent = score;
    nbAutoClick += 1;
    coutAutoClick *= nbAutoClick;
    autoClicker.textContent = `Auto-click++ / price : ${coutAutoClick}`

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
  }
});
