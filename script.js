const dogImages = [
    {
        url: "dog1.jpg", // 請替換為實際圖片路徑
        breed: "黃金獵犬"
    },
    {
        url: "dog2.jpg",
        breed: "貴賓犬"
    },
    {
        url: "dog3.jpg",
        breed: "柴犬"
    },
    {
        url: "dog4.jpg",
        breed: "哈士奇"
    }
];

let currentDog;
let options;

function nextQuestion() {
    // 隨機選擇一隻狗狗
    currentDog = dogImages[Math.floor(Math.random() * dogImages.length)];
    document.getElementById("dog-image").src = currentDog.url;

    // 隨機生成選項
    options = dogImages.map(dog => dog.breed);
    shuffleArray(options);

    // 確保選項中包含正確答案
    if (!options.includes(currentDog.breed)) {
        options[Math.floor(Math.random() * options.length)] = currentDog.breed;
    }

    // 更新按鈕文字
    const buttons = document.querySelectorAll(".option");
    buttons.forEach((button, index) => {
        button.textContent = options[index];
    });

    // 清除結果訊息
    document.getElementById("result").textContent = "";
}

function checkAnswer(button) {
    const selectedBreed = button.textContent;
    const result = document.getElementById("result");
    if (selectedBreed === currentDog.breed) {
        result.textContent = "恭喜你，答對了！";
        result.style.color = "green";
    } else {
        result.textContent = "答錯了，再試一次！";
        result.style.color = "red";
    }
}

// 洗牌函數，用來隨機打亂選項
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 初始化遊戲
nextQuestion();
