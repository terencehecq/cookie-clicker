let bouton = document.getElementById("click");
let affichage = document.getElementById("affichage");
let multiplicateur = document.getElementById("multiplicateur");
let autoClicker = document.getElementById("autoClicker");
let bonus = document.getElementById("bonus");
let coutMultiplicateurHTML = document.getElementById("coutMultiplicateur");
let nbMultiplicateurHTML = document.getElementById("nbMultiplicateur");
let coutAutoClickerHTML = document.getElementById("coutAutoClicker");
let nbAutoClickerHTML = document.getElementById("nbAutoClicker");
let bonusHTML = document.getElementById("bonusText");
let flocon= document.getElementById("bon");

let compteur = 1; //valeur par click
let score = 0; //argent
let multipli = 1;
let nbMultiplicateur = 0;
let coutMultiplicateur = 10;
let nbAutoClicker = 0;
let coutAutoClicker = 25;
let coutBonus = 300;
let runningChrono = false;

coutMultiplicateurHTML.textContent = coutMultiplicateur;
nbMultiplicateurHTML.textContent = multipli;
coutAutoClickerHTML.textContent = coutAutoClicker;
nbAutoClickerHTML.textContent = nbAutoClicker;
bonusHTML.textContent = `Prix: ${coutBonus}`;

bouton.addEventListener("click", () => {
  score += compteur * multipli;
  affichage.textContent = score.toLocaleString("fr-FR");
});

multiplicateur.addEventListener("click", event => {
  if (score >= coutMultiplicateur) {
    nbMultiplicateur += 1;
    multipli = multipli * 2;
    score = score - coutMultiplicateur;
    affichage.textContent = score.toLocaleString("fr-FR");
    coutMultiplicateur = coutMultiplicateur * multipli;
    coutMultiplicateurHTML.textContent = coutMultiplicateur
    nbMultiplicateurHTML.textContent = multipli;
  }
});


// ----- Auto - clicker ----- // 

autoClicker.addEventListener("click", function autoClick(){
  if (score >= coutAutoClicker) {
    score = score - coutAutoClicker;
    affichage.textContent = score.toLocaleString("fr-FR");
    nbAutoClicker += 1;
    coutAutoClicker *= nbAutoClicker;
    nbAutoClickerHTML.textContent = nbAutoClicker;
    coutAutoClickerHTML.textContent = coutAutoClicker;

    setInterval(() => {
      score += compteur * multipli;
      affichage.textContent = score.toLocaleString("fr-FR");
    }, 2000);
  }
});


// ----- Bonus 30s ----- // 

bonus.addEventListener("click", function bonusX2(){

  if (score >= coutBonus){
    bonus.textContent = `Bonus - remaining time : 30`;
    bonus.removeEventListener("click", bonusX2);
    score = score - coutBonus;
    affichage.textContent = score;
    coutBonus *= 1.5;
    let chronoStart = Date.now() 
    let timeLeft;
    compteur *= 2;
    runningChrono = true;
        
    let decompte = setInterval(()=>{
      bonus.disabled = true;
      let chrono = Date.now() - chronoStart; 

      timeLeft = Math.round(30 - chrono/1000)
    
      bonusHTML.textContent = `Temps restant : ${timeLeft}`

      if (timeLeft == 0){
        clearInterval(decompte)
        bonusHTML.textContent = `Prix : ${coutBonus}`;
        runningChrono = false;
        compteur /= 2;
        bonus.addEventListener("click", bonusX2)
      }
    },1000)
    
  }
});

// ----- Check score to disable buttons ----- // 

setInterval(()=>{

  // Multiplicateur
  if(score<coutMultiplicateur){
    multiplicateur.disabled = true;
  }else{
    multiplicateur.disabled = false;
  }

  // Auto clicker
  if (score<coutAutoClicker){
    autoClicker.disabled = true;
  }else{
    autoClicker.disabled = false
  }

  // Bonus
  if(score<coutBonus){
    bonus.disabled = true;
  }else if (score>=coutBonus && runningChrono == false){
    bonus.disabled = false;
  }
},500)