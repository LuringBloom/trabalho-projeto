// importando a array com os quizes
import quizzes from "./quiz.js";

// variaveis referencias dos elementos no arquivo html
const menu = document.querySelector(".main-menu");
const quizContainer = document.querySelector(".quiz-container");
const quizBtn = document.querySelectorAll(".quiz-btn");

const content = document.querySelector(".content");
const questionNum = document.querySelector(".question-num");
const questionContainer = document.querySelector(".question");
const answerContainer = document.querySelector(".answer-container");

const finish = document.querySelector(".finish");
const divAcertos = document.querySelector(".acertos")
const restartBtn = document.querySelector(".restart-btn");
const menuBtn = document.querySelector(".menu-btn");

// variaveis globais
let currentQuiz;
let currentQuestionNum = 0;
let correctAnswers = 0;

// renderiza os botoes que dao acesso aos diferentes quizzes
let quizButtons = "";
for (const drill of quizzes) {
    quizButtons += `<button class="quiz-btn">${drill.subject}</button>`;
}
quizContainer.innerHTML = `${quizButtons}`;
document.querySelectorAll(".quiz-btn").forEach(item => {
    item.addEventListener("click", (e) => {
        currentQuiz = selectQuiz(e.target);
        loadQuiz(currentQuiz)
    })
})

// funcao que usa uma materia como argumento e retorna o objeto quiz da lista de quizzes com a materia correspondente
function selectQuiz(prop) {
    const obj = quizzes.find(item => {
        return item.subject === prop;
    })
    return obj;
};

// funcao que carrega as perguntas do quiz
function loadQuiz() {
    menu.style.display = "none";
    finish.style.display = "none";
    content.style.display = "flex";
    loadQuestion(currentQuiz);
}

// funcao que carrega uma pergunta e as respostas
function loadQuestion() {
    questionNum.innerHTML = `${currentQuestionNum + 1} / ${currentQuiz.exercises.length}`;
    questionContainer.innerHTML = currentQuiz.exercises[currentQuestionNum].question;
    answerContainer.innerHTML = "";
    for (const answer of currentQuiz.exercises[currentQuestionNum].answers) {
        const answerDiv = document.createElement("div");
        answerDiv.innerHTML = `<button class="answer" correct="${answer.correct}">${answer.option}</>`
        answerContainer.append(answerDiv);
    }
    document.querySelectorAll(".answer").forEach(item => {
        item.addEventListener("click", nextQuestion)
    });
}

// funcao que avanca para a proxima pergunta ou finaliza o quiz quando uma resposta for selecionada
function nextQuestion(e) {
    currentQuestionNum += 1;
    if (e.target.getAttribute("correct") === "true") {
        correctAnswers += 1;
    }
    if (currentQuestionNum < currentQuiz.exercises.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// funcao que finaliza o quiz 
function finishQuiz () {
    content.style.display = "none";
    finish.style.display = "flex";
    divAcertos.innerHTML = `Voce acertou ${correctAnswers} de ${currentQuiz.exercises.length} perguntas`
    correctAnswers = 0;
    currentQuestionNum = 0;
}

// adiciona funcionalidade para os botoes no final de um quiz
restartBtn.addEventListener("click", loadQuiz);
menuBtn.addEventListener("click", () => {
    finish.style.display = "none";
    menu.style.display = "flex";
})