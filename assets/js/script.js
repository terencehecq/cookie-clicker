let bouton = document.getElementById("click");
let affichage = document.getElementById("affichage");
let multiplicateur = document.getElementById("multiplicateur");
let autoClicker = document.getElementById("autoClicker");
let bonus = document.getElementById("bonus");
let coutMultiplicateurHTML = document.getElementById("coutMultiplicateur");
let nbMultiplicateurHTML = document.getElementById("nbMultiplicateur");
let coutAutoClickerHTML = document.getElementById("coutAutoClicker");
let nbAutoClickerHTML = document.getElementById("nbAutoClicker");
let coutBonusHTML = document.getElementById("coutBonus");
let bonusHTML = document.getElementById("bonusText");
let avalanche= document.getElementById("avalanche");
let coutAvalancheHTML = document.getElementById("coutAvalanche")

let compteur = 1; //valeur par click
let score = 0; //argent
let multipli = 1;
let nbMultiplicateur = 0;
let coutMultiplicateur = 10;
let nbAutoClicker = 0;
let coutAutoClicker = 25;
let coutBonus = 300;
let coutAvalanche = 500;
let runningChrono = false;

coutMultiplicateurHTML.textContent = coutMultiplicateur;
nbMultiplicateurHTML.textContent = multipli;
coutAutoClickerHTML.textContent = coutAutoClicker;
nbAutoClickerHTML.textContent = nbAutoClicker;
coutBonusHTML.textContent = coutBonus;
coutAvalancheHTML.textContent = coutAvalanche;


// ----- Clicker ----- //
bouton.addEventListener("click", () => {
  score += compteur * multipli;
  affichage.textContent = score;

});

 // ----- Multiplicateur ----- //
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


// ----- Bonus 200% - 30s ----- // 

bonus.addEventListener("click", function bonusX2(){

  if (score >= coutBonus){
    bonusHTML.textContent = `30 s`;
    bonus.removeEventListener("click", bonusX2);
    score = score - coutBonus;
    affichage.textContent = score;
    coutBonus *= 1.5;
    coutBonusHTML.textContent = coutBonus;
    let chronoStart = Date.now() 
    let timeLeft;
    compteur *= 2;
    runningChrono = true;
        
    let decompte = setInterval(()=>{
      bonus.disabled = true;
      let chrono = Date.now() - chronoStart; 

      timeLeft = Math.round(30 - chrono/1000)
    
      bonusHTML.textContent = `${timeLeft} s`

      if (timeLeft == 0){
        clearInterval(decompte)
        runningChrono = false;
        compteur /= 2;
        bonus.addEventListener("click", bonusX2)
      }
    },1000)
    
  }
});

// ----- Avalanche ----- //

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

avalanche.addEventListener("click", () => {
  if (score >= coutAvalanche) {
  let bonus2 = parseInt((getRandomInt(10)+1)*(score/5));
  console.log(bonus2);
  score = score - coutAvalanche + bonus2;
  affichage.textContent = score;
  coutAvalanche = coutAvalanche*(getRandomInt(3)+1);
  coutAvalancheHTML.textContent = coutAvalanche;
  }
});

// ----- Check score to disable buttons ----- // 

setInterval(()=>{

  // Multiplicateur
  if(score<coutMultiplicateur){
    multiplicateur.disabled = true;
    multiplicateur.style.opacity = 0.6;
  }else{
    multiplicateur.disabled = false;
    multiplicateur.style.opacity = 1;
  }

  // Auto clicker
  if (score<coutAutoClicker){
    autoClicker.disabled = true;
    autoClicker.style.opacity = 0.6;
  }else{
    autoClicker.disabled = false
    autoClicker.style.opacity = 1;
  }

  // Bonus
  if(score<coutBonus){
    bonus.disabled = true;
    bonus.style.opacity = 0.6;
  }else if (score>=coutBonus && runningChrono == false){
    bonus.disabled = false;
    bonus.style.opacity = 1;
  }

  // Avalanche
  if(score<coutAvalanche){
    avalanche.disabled = true;
    avalanche.style.opacity = 0.6;
  }else{
    avalanche.disabled = false;
    avalanche.style.opacity = 1;
  }
},500)

