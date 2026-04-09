

// add javascript here
let playerName = prompt("Please enter your name:");
if (!playerName){
    playerName = "Player";
}
let answer = 0;
let guessCount = 0;
const scores = [];
let range = 0;


document.getElementById("playBtn").addEventListener ("click", play);
document.getElementById("guessBtn").addEventListener("click",makeGuess);

function play(){
    range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Guess a number 1-" + range;
    answer = Math.floor(Math.random()*range)+1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
let diff = Math.abs(guess - answer);
    let proximityMsg = "";

    if (diff <= 2) {
        proximityMsg = " (Hot)";
    } 
    else if (diff <= 5) {
        proximityMsg = " (Warm)";
    } 
    else {
        proximityMsg = " (Cold)";
    }

    if(isNaN(guess) || guess<1 || guess>range){
        msg.textContent = "Please enter a valid number";
        return; 
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct, "+playerName+"! It took " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
    }
    else if (guess < answer){
        msg.textContent = "Too low, try again." + proximityMsg;
    }
    else {
        msg.textContent = "Too high, try again." + proximityMsg;
    }


}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total wins: "+scores.length;
    let sum =0;
    for(let i =0;i<scores.length;i++){
        sum+= scores[i];
    }
    avgScore.textContent = "Average Score: "+ (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;}); //sort score increasing

    let lb = document.getElementsByName("leaderboard");
    for(let i =0;i<lb.length;i++){
        if(i<scores.length){
            lb[i].textContent = scores[i];
        }
    }

}

function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;

}

function giveUp() {
    msg.textContent = "You gave up! The answer was " + answer + ".";
    updateScore(range); // Sets score to the max range
    resetGame();
}





