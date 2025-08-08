const questions = [
    {
        question: "What is the capital of Bangladesh?",
        options:["Dhaka", "chittagong", "Sylhet", "Khulna"],
        answer: "Dhaka"
    },
    {
        question:"Which language runs in a web browser?",
        options: [ "Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Who is the founder of Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Mark zuckerberg", "Elon Musk"],
        answer: "Bill Gates"
    }
]
let currectQuestion = 0;
let score = 0;
const questionText = document.getElementById("question");
const optionDiv = document.getElementById('options');
const resultDiv = document.getElementById("result");
function showQuestion() {
    const q = questions[currectQuestion];
    questionText.textContent = q.question;
    optionDiv.innerHTML = '';
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add('btn');
        btn.addEventListener("click", () => checkAnswer(option));
        optionDiv.appendChild(btn);
    });
}
function checkAnswer(selected) {
    const correct = questions[currectQuestion].answer;
    if (selected === correct) {
        score++;
    }
    currectQuestion++;
    if (currectQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    questionText.textContent = 'Quiz Finished!';
    optionDiv.innerHTML = '';
    resultDiv.innerHTML = `Your Score: <b>${score} / ${questions.length}</b>`;
}
showQuestion();