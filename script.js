
const startButton = document.getElementById("start-btn"); 
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const quizContainer = document.getElementById("quiz");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

const loginForm = document.getElementById("login-form");
const loginScreen = document.getElementById("login-screen");
const quizSection = document.getElementById("quiz-section");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 50;
let timer;

function shuffleAnswers(answers) {
    return [...answers].sort(() => 0.5 - Math.random());
}

const allQuestions = [
    { question: "What does CPU stand for?", answers: shuffleAnswers([
        { text: "Computer Primary Unit", correct: false },
        { text: "Central Programming Unit", correct: false },
        { text: "Central Processing Unit", correct: true },
        { text: "Control Panel Unit", correct: false }
    ]) },
    { question: "Which one is a high-level programming language?", answers: shuffleAnswers([
        { text: "Assembly", correct: false },
        { text: "Python", correct: true },
        { text: "Machine code", correct: false },
        { text: "Binary", correct: false }
    ]) },
    { question: "What does HTML stand for?", answers: shuffleAnswers([
        { text: "HyperText Markup Language", correct: true },
        { text: "HighText Machine Language", correct: false },
        { text: "HyperTabular Markup Language", correct: false },
        { text: "None", correct: false }
    ]) },
    { question: "What is the primary function of RAM?", answers: shuffleAnswers([
        { text: "Graphics rendering", correct: false },
        { text: "Processing", correct: false },
        { text: "Temporary data storage", correct: true },
        { text: "Permanent storage", correct: false }
    ]) },
    { question: "Which data structure uses FIFO?", answers: shuffleAnswers([
        { text: "Stack", correct: false },
        { text: "Queue", correct: true },
        { text: "Array", correct: false },
        { text: "Linked List", correct: false }
    ]) },
    { question: "What is the output of 1 + '1' in JavaScript?", answers: shuffleAnswers([
        { text: "error", correct: false },
        { text: "2", correct: false },
        { text: "11", correct: true },
        { text: "undefined", correct: false }
    ]) },
    { question: "Which layer of OSI deals with IP addressing?", answers: shuffleAnswers([
        { text: "Data Link", correct: false },
        { text: "Application", correct: false },
        { text: "Network", correct: true },
        { text: "Transport", correct: false }
    ]) },
    { question: "What does SQL stand for?", answers: shuffleAnswers([
        { text: "Structured Query Language", correct: true },
        { text: "Strong Question Language", correct: false },
        { text: "Simple Query List", correct: false },
        { text: "Structured Queue Logic", correct: false }
    ]) },
    { question: "Which of the following is not an operating system?", answers: shuffleAnswers([
        { text: "Microsoft Word", correct: true },
        { text: "Linux", correct: false },
        { text: "Windows", correct: false },
        { text: "macOS", correct: false }
    ]) },
    { question: "Which logic gate gives an output only when inputs are different?", answers: shuffleAnswers([
        { text: "AND", correct: false },
        { text: "OR", correct: false },
        { text: "NAND", correct: false },
        { text: "XOR", correct: true }
    ]) },
    { question: "Which phase of compiler converts source code into tokens?", answers: shuffleAnswers([
        { text: "Lexical Analysis", correct: true },
        { text: "Syntax Analysis", correct: false },
        { text: "Code Generation", correct: false },
        { text: "Semantic Analysis", correct: false }
    ]) },
    { question: "Which software model uses an iterative approach?", answers: shuffleAnswers([
        { text: "Waterfall Model", correct: false },
        { text: "Agile Model", correct: true },
        { text: "V-Model", correct: false },
        { text: "Spiral Model", correct: false }
    ]) },
    { question: "What does ACID stand for in DBMS?", answers: shuffleAnswers([
        { text: "Atomicity, Consistency, Isolation, Durability", correct: true },
        { text: "Access, Control, Integrity, Data", correct: false },
        { text: "Accuracy, Completeness, Isolation, Data", correct: false },
        { text: "Availability, Connectivity, Isolation, Data", correct: false }
    ]) },
    { question: "Which SQL keyword is used to extract only distinct values?", answers: shuffleAnswers([
        { text: "DISTINCT", correct: true },
        { text: "UNIQUE", correct: false },
        { text: "SEPARATE", correct: false },
        { text: "FILTER", correct: false }
    ]) },
    { question: "In computer networks, TCP is a...", answers: shuffleAnswers([
        { text: "Connection-oriented protocol", correct: true },
        { text: "Connectionless protocol", correct: false },
        { text: "Transportless protocol", correct: false },
        { text: "Sessionless protocol", correct: false }
    ]) },
    { question: "Which normalization form removes partial dependency?", answers: shuffleAnswers([
        { text: "2NF", correct: true },
        { text: "1NF", correct: false },
        { text: "3NF", correct: false },
        { text: "BCNF", correct: false }
    ]) },
    { question: "Deadlock avoidance technique is...", answers: shuffleAnswers([
        { text: "Banker’s Algorithm", correct: true },
        { text: "FIFO", correct: false },
        { text: "LRU", correct: false },
        { text: "Paging", correct: false }
    ]) },
    { question: "Which of these is a non-volatile memory?", answers: shuffleAnswers([
        { text: "ROM", correct: true },
        { text: "RAM", correct: false },
        { text: "Cache", correct: false },
        { text: "Register", correct: false }
    ]) },
    { question: "Which data model uses tables?", answers: shuffleAnswers([
        { text: "Relational Model", correct: true },
        { text: "Hierarchical Model", correct: false },
        { text: "Network Model", correct: false },
        { text: "Object Model", correct: false }
    ]) },
    { question: "Which protocol is used to assign IP addresses automatically?", answers: shuffleAnswers([
        { text: "DHCP", correct: true },
        { text: "DNS", correct: false },
        { text: "HTTP", correct: false },
        { text: "IP", correct: false }
    ]) },
    { question: "Which diagram is used to model data flow?", answers: shuffleAnswers([
        { text: "DFD", correct: true },
        { text: "UML", correct: false },
        { text: "ERD", correct: false },
        { text: "Flowchart", correct: false }
    ]) },
    { question: "Which of the following is a DDL command?", answers: shuffleAnswers([
        { text: "CREATE", correct: true },
        { text: "INSERT", correct: false },
        { text: "UPDATE", correct: false },
        { text: "SELECT", correct: false }
    ]) },
    { question: "In software testing, what is white-box testing?", answers: shuffleAnswers([
        { text: "Testing internal logic", correct: true },
        { text: "Testing UI only", correct: false },
        { text: "Testing performance", correct: false },
        { text: "Testing requirements", correct: false }
    ]) },
    { question: "Which layer in OSI model encrypts data?", answers: shuffleAnswers([
        { text: "Presentation Layer", correct: true },
        { text: "Application Layer", correct: false },
        { text: "Session Layer", correct: false },
        { text: "Network Layer", correct: false }
    ]) }
];

function getRandomQuestions(count) {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

let questions = [];

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginScreen.classList.add("hide");
    quizSection.classList.remove("hide");
});

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    questions = getRandomQuestions(10);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 50;
    startTimer();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const correct = e.target.dataset.correct;
    if (correct) score++;
    document.querySelectorAll(".btn").forEach(btn => btn.classList.add(btn.dataset.correct ? "correct" : "wrong"));
    nextButton.classList.remove("hide");
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) endQuiz();
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add("hide");
    resultScreen.classList.remove("hide");
    scoreElement.innerText = score;
}

function restartQuiz() {
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
}
