const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById("input");
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const mistakesEl = document.getElementById('mistakes');
const startBtn = document.getElementById('start');
let quote = '';
let startTime;
let timer;
let mistakeCount = 0;

const quotes = [
    "Practice makes perfect.",
    "Typing fast is a useful skill.",
    "Code is like humor.",
    "The quicker you learn, the better you get.",
    "JavaScript makes the web interactive."
];

function setNewquote() {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent =quote;
    inputEl.value = '';
    inputEl.focus();
    timeEl.textContent = 0;
    wpmEl.textContent = 0;
    mistakesEl.textContent = 0;
    mistakeCount = 0;
    clearInterval(timer);
    startTime = new Date().getTime();
    timer = setInterval(updateTime, 1000);
}

function updateTime() {
    const currentTime = new Date().getTime();
    const seconds = Math.floor((currentTime - startTime) / 1000);
    timeEl.textContent = seconds;
    const wordsTyped = inputEl.value.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / seconds) * 60);
    if (seconds > 0) wpmEl.textContent = wpm;
}
inputEl.addEventListener('input', () => {
    const enteredText = inputEl.value;
    const expectedText = quote.substring(0, enteredText.length);
    if (enteredText !== expectedText) {
        mistakeCount++;
        mistakesEl.textContent = mistakeCount;
    }
    if ( enteredText === quote) {
        clearInterval(timer);
        inputEl.disabled = true;
    }
});
startBtn.addEventListener("click", () => {
    inputEl.disabled = false;
    setNewquote();
});
window.onload = setNewquote;
