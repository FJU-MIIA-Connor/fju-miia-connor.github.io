let score = 0;
let currentQuestion = 0;
const totalQuestions = 4;

const questions = [
    { image: 'images/golden retriever.jpg', correctAnswer: '金毛獵犬' },
    { image: 'images/husky.jpg', correctAnswer: '哈士奇' },
    { image: 'images/poodle.jpg', correctAnswer: '貴賓犬' },
    { image: 'images/shiba inu.jpg', correctAnswer: '柴犬' },
];

// 隨機選項生成
const allAnswers = ['哈士奇', '貴賓犬', '柴犬', '金毛獵犬'];

function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correctAnswer) {
        score += 25;
    }
    document.getElementById('result').innerText = `恭喜你！當前分數: ${score}`;
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
    const currentQ = questions[currentQuestion];
    document.getElementById('dog-image').src = currentQ.image;
    document.getElementById('result').innerText = '';
    document.getElementById('next-btn').style.display = 'none';
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // 清空現有選項

    // 隨機生成選項
    const answers = generateOptions(currentQ.correctAnswer);
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerText = answer;
        button.onclick = () => checkAnswer(answer);
        optionsContainer.appendChild(button);
    });
}

function generateOptions(correctAnswer) {
    const options = new Set([correctAnswer]); // 用 Set 來避免重複
    while (options.size < 4) {
        const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
        options.add(randomAnswer);
    }
    return Array.from(options); // 轉換 Set 為陣列
}

function showFinalScore() {
    document.getElementById('quiz-container').innerHTML = `
        <h2>遊戲結束！</h2>
        <p>你的總分是: ${score} 分</p>
        <button onclick="restartGame()">重新開始遊戲</button>
    `;
}

function restartGame() {
    score = 0;
    currentQuestion = 0;
    loadQuestion();
}

// 初始化第一題
loadQuestion();
