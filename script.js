let score = 0;
let currentQuestion = 0;
const totalQuestions = 4;

const questions = [
    { image: 'images/golden retriever.jpg', correctAnswer: '拉布拉多' },
    { image: 'images/husky.jpg', correctAnswer: '哈士奇' },
    { image: 'images/poodle.jpg', correctAnswer: '貴賓犬' },
    { image: 'images/shiba inu.jpg', correctAnswer: '柴犬' },
];

function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correctAnswer) {
        score += 25;
    }
    document.getElementById('result').innerText = `你答對了！當前分數: ${score}`;
    document.getElementById('next-btn').style.display = 'block';
    disableOptions();
}

function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.disabled = true);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function loadQuestion() {
    document.getElementById('dog-image').src = questions[currentQuestion].image;
    document.getElementById('result').innerText = '';
    document.getElementById('next-btn').style.display = 'none';
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = false;
    });
}

function showFinalScore() {
    document.getElementById('quiz-container').innerHTML = `
        <h2>遊戲結束！</h2>
        <p>你的總分是: ${score} 分</p>
    `;
}

// 初始化第一題
loadQuestion();

