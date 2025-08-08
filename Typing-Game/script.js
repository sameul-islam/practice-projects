const quoteDisplay = document.getElementById('quote');
const inputField = document.getElementById('input');
const timeDisplay = document.getElementById('time');
const scoredisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const quotes = [
    "Practice makes perfect.",
    "Stay hungry stay foolish.",
    "Knowledge is power.",
    "Never give up.",
    "JavaScript is fun.",
    "Typing fast is a good skill.",
    "challenge yourself every day."
];
let currentQuote = '';
let score = 0 ;
let time = 60;
let timer;
let gameRunning = false;

function newQuote () {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = '';
    currentQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerHTML = char;
        quoteDisplay.appendChild(span);
    });
    inputField.value = '';
}
function startGame () {
    gameRunning = true;
    score = 0;
    time =60;
    scoredisplay.textContent = score;
    timeDisplay.textContent = time;
    newQuote();
    inputField.disabled = false;
    inputField.focus();
    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            inputField.disabled = true;
            quoteDisplay.innerHTML = `Time's up! Final Score: <b>${score}</b>`;
        }
    }, 1000);
}

inputField.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayvalue = inputField.value.split('');
    let correct = true;
    arrayQuote.forEach((char, index) => {
        const typed = arrayvalue[index];
        if (typed == null) {
            char.classList.remove('correct', "wrong");
            correct = false;
        } else if ( typed === char.innerText) {
            char.classList.add('corroct');
            char.classList.remove('wrong');
        }else {
            char.classList.add('wrong');
            char.classList.remove('correct');
            correct = false;
        }
    });
    if (correct) {
        score++;
        scoredisplay.textContent = score;
        newQuote();
    }
});

restartBtn.addEventListener('click', () => {
    clearInterval(timer);
    startGame();
});
window.onload = startGame;