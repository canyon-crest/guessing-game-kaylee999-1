let startTime;
const gameTimes = [];

let playerName = prompt("Please enter your name:");
if (!playerName) {
    playerName = "Player";
}

let answer = 0;
let guessCount = 0;
const scores = [];
let range = 0;

const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const guess = document.getElementById("guess");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const playBtn = document.getElementById("playBtn");
const e = document.getElementById("e");
const m = document.getElementById("m");
const h = document.getElementById("h");

const dateElement = document.getElementById("date");

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play() {
    startTime = new Date();
    range = 0;
    let levels = document.getElementsByName("level");
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].checked) {
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    msg.textContent = "Guess a number 1-" + range;
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess() {
    let currentGuess = parseInt(guess.value);

    if (isNaN(currentGuess) || currentGuess < 1 || currentGuess > range) {
        msg.textContent = "Please enter a valid number";
        return;
    }

    let diff = Math.abs(currentGuess - answer);
    let proximityMsg = "";

    if (diff <= 2) {
        proximityMsg = " (Hot)";
    } else if (diff <= 5) {
        proximityMsg = " (Warm)";
    } else {
        proximityMsg = " (Cold)";
    }

    guessCount++;
    if (currentGuess == answer) {
        msg.textContent = "Correct, " + playerName + "! It took " + guessCount + " tries.";
        let endTime = new Date();
        let timeTaken = Math.round((endTime - startTime) / 1000); 
        gameTimes.push(timeTaken);

        updateTimeStats();
        updateScore(guessCount);
        resetGame();
    } else if (currentGuess < answer) {
        msg.textContent = "Too low, try again." + proximityMsg;
    } else {
        msg.textContent = "Too high, try again." + proximityMsg;
    }
}

function updateScore(score) {
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum / scores.length).toFixed(1);

    scores.sort(function(a, b) { return a - b; }); 

    let lb = document.getElementsByName("leaderboard");
    for (let i = 0; i < lb.length; i++) {
        if (i < scores.length) {
            lb[i].textContent = scores[i];
        }
    }
}

function resetGame() {
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}

function giveUp() {
    msg.textContent = "You gave up, " + playerName + "! The answer was " + answer + ".";
    updateScore(range); 
    resetGame();
}


function updateDateTime() {
    const now = new Date();
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[now.getMonth()];
    let day = now.getDate();
    
    let suffix = "th";
    if (day < 11 || day > 13) {
        if (day % 10 === 1) suffix = "st";
        else if (day % 10 === 2) suffix = "nd";
        else if (day % 10 === 3) suffix = "rd";
    }

    if (dateElement) {
        dateElement.textContent = "Today is " + monthName + " " + day + suffix + ", " + now.getFullYear() + " | Time: " + now.toLocaleTimeString();
    }
}


setInterval(updateDateTime, 1000);
updateDateTime(); // Display right away

function updateTimeStats() {
    const fastest = Math.min(...gameTimes);
    let sum = 0;
    for (let i = 0; i < gameTimes.length; i++) { sum += gameTimes[i]; }
    const avg = (sum / gameTimes.length).toFixed(1);

    const fastestEl = document.getElementById("fastest");
    const avgTimeEl = document.getElementById("avgTime");

    if (fastestEl) fastestEl.textContent = "Fastest Game: " + fastest + "s";
    if (avgTimeEl) avgTimeEl.textContent = "Average Time: " + avg + "s";
}
