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
bonusHTML.textContent = `Prix: ${coutBonus}`;
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
    affichage.textContent = score;
    coutMultiplicateur = coutMultiplicateur * multipli;
    coutMultiplicateurHTML.textContent = coutMultiplicateur
    nbMultiplicateurHTML.textContent = multipli;
  }
});


// ----- Auto - clicker ----- // 

autoClicker.addEventListener("click", function autoClick(){
  if (score >= coutAutoClicker) {
    score = score - coutAutoClicker;
    affichage.textContent = score;
    nbAutoClicker += 1;
    coutAutoClicker *= nbAutoClicker;
    nbAutoClickerHTML.textContent = nbAutoClicker;
    coutAutoClickerHTML.textContent = coutAutoClicker;

    setInterval(() => {
      score += compteur * multipli;
      affichage.textContent = score;
    }, 2000);
  }
});


// ----- Bonus 30s ----- // 

bonus.addEventListener("click", function bonusX2(){

  if (score >= coutBonus){
    bonusHTML.textContent = `Bonus - remaining time : 30`;
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


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

avalanche.addEventListener("click", () => {
  if (score >= coutAvalanche) {
  let bonus2 = (getRandomInt(10)+1)*(score/8);
  score = score-coutAvalanche;
  console.log(bonus2)
  score= score+bonus2;
  affichage.textContent = score;
  coutAvalanche = coutAvalanche*(getRandomInt(2)+1);
  coutAvalancheHTML.textContent = coutAvalanche;
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

  // Avalanche
  if(score<coutAvalanche){
    avalanche.disabled = true;
  }else{
    avalanche.disabled = false;
  }
},500)

