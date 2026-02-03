let score = 0;
let time = 30;
let timer;

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

document.getElementById('clickBtn').addEventListener('click', () => {
  if (time <= 0) return;
  score++;
  scoreEl.textContent = score;
});

document.getElementById('resetBtn').addEventListener('click', () => {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  clearInterval(timer);
  startTimer();
});

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      alert(`Игра окончена! Очки: ${score}`);
      localStorage.setItem('clickerRecord', Math.max(
        score,
        localStorage.getItem('clickerRecord') || 0
      ));
    }
  }, 1000);
}

startTimer();
