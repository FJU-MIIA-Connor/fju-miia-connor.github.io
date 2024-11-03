let score = 0;
let currentQuestion = 0;
const totalQuestions = 4;

const questions = [
    { image: 'images/golden retriever.jpg', correctAnswer: '黃金獵犬' },
    { image: 'images/husky.jpg', correctAnswer: '哈士奇' },
    { image: 'images/poodle.jpg', correctAnswer: '貴賓犬' },
    { image: 'images/german shepherd.jpg', correctAnswer: '德國牧羊犬' },
];

// 所有可能的選項
const allAnswers = ['哈士奇', '貴賓犬', '德國牧羊犬', '黃金獵犬'];

function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correctAnswer) {
        score += 25;
    }
    $('#result').text(`恭喜你！當前分數: ${score}`).fadeIn().delay(1000).fadeOut();
    $('#next-btn').fadeIn();
    disableOptions();
}

function disableOptions() {
    $('.option').prop('disabled', true);
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
    $('#dog-image').attr('src', currentQ.image);
    $('#result').text('').hide();
    $('#next-btn').hide();

    // 清空並重新生成選項
    const optionsContainer = $('#options');
    optionsContainer.empty();

    const answers = generateOptions(currentQ.correctAnswer);
    answers.forEach(answer => {
        const button = $('<button></button>').addClass('option').text(answer);
        button.on('click', () => checkAnswer(answer));
        optionsContainer.append(button);
    });
}

function generateOptions(correctAnswer) {
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
        const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
        options.add(randomAnswer);
    }
    return Array.from(options);
}

function showFinalScore() {
    $('#quiz-container').html(`
        <h2>遊戲結束！</h2>
        <p>你的總分是: ${score} 分</p>
        <button id="restart-btn">重新開始遊戲</button>
    `);

    $('#restart-btn').on('click', restartGame);
}

function restartGame() {
    score = 0;
    currentQuestion = 0;
    loadQuestion();
}

// 初始化第一題
$(document).ready(function() {
    loadQuestion();
});

