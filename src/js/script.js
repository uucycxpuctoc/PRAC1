// ===== КЛИКЕР =====
let score = 0;
let time = 30;
let timer;
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const clickBtn = document.getElementById("clickBtn");
const resetBtn = document.getElementById("resetBtn");

clickBtn.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;

  if (!timer) {
    timer = setInterval(() => {
      time--;
      timeEl.textContent = time;

      if (time === 0) {
        clearInterval(timer);
        alert("Игра окончена! Очки: " + score);
        clickBtn.disabled = true;
      }
    }, 1000);
  }
});

resetBtn.addEventListener("click", () => {
  score = 0;
  time = 30;
  scoreEl.textContent = 0;
  timeEl.textContent = 30;
  clickBtn.disabled = false;
  clearInterval(timer);
  timer = null;
});

// ===== ГЕНЕРАТОР =====
function generateAdventure() {
  const heroes = ["рыцарь", "маг", "вор"];
  const places = ["тёмный лес", "замок", "подводное царство"];
  const enemies = ["дракон", "гоблин", "колдун"];

  const text = `Ваш персонаж — ${heroes[Math.floor(Math.random()*3)]}
  находится в ${places[Math.floor(Math.random()*3)]}
  и сражается с ${enemies[Math.floor(Math.random()*3)]}`;

  document.getElementById("adventureText").textContent = text;
}

// ===== УГАДАЙ ЧИСЛО =====
let randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const result = document.getElementById("guessResult");

  if (guess > randomNumber) {
    result.textContent = "Меньше!";
  } else if (guess < randomNumber) {
    result.textContent = "Больше!";
  } else {
    result.textContent = "Правильно!";
  }
}
