// Игра Кликер
function initClickerGame(container) {
    let score = 0;
    let timeLeft = 30;
    let timer = null;
    let gameActive = false;
    let highScore = localStorage.getItem('clickerHighScore') || 0;
    
    const gameHTML = `
        <div class="clicker-game">
            <h3>Счёт: <span id="score">0</span></h3>
            <div class="score-display" id="scoreDisplay">0</div>
            <div class="timer-display" id="timer">30</div>
            <button class="click-button" id="clickBtn" disabled>КЛИК</button>
            <div class="game-controls">
                <button class="btn-game" id="startBtn">Старт</button>
                <button class="btn-game" id="resetBtn">Сброс</button>
            </div>
            <div class="high-score">Рекорд: ${highScore}</div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const scoreDisplay = document.getElementById('score');
    const scoreBigDisplay = document.getElementById('scoreDisplay');
    const timerDisplay = document.getElementById('timer');
    const clickBtn = document.getElementById('clickBtn');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    function updateDisplay() {
        scoreDisplay.textContent = score;
        scoreBigDisplay.textContent = score;
    }
    
    function startGame() {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        timeLeft = 30;
        updateDisplay();
        timerDisplay.textContent = timeLeft;
        clickBtn.disabled = false;
        startBtn.disabled = true;
        
        // Изменяем цвет кнопки при старте
        clickBtn.style.background = 'linear-gradient(45deg, #6c5ce7, #a363d9)';
        
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    function endGame() {
        clearInterval(timer);
        gameActive = false;
        clickBtn.disabled = true;
        startBtn.disabled = false;
        
        // Сохраняем рекорд
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('clickerHighScore', highScore);
            document.querySelector('.high-score').textContent = `Рекорд: ${highScore}`;
        }
        
        showNotification(`Игра окончена! Ваш счёт: ${score}`, 'info');
    }
    
    function resetGame() {
        clearInterval(timer);
        gameActive = false;
        score = 0;
        timeLeft = 30;
        updateDisplay();
        timerDisplay.textContent = timeLeft;
        clickBtn.disabled = true;
        startBtn.disabled = false;
        clickBtn.style.background = 'linear-gradient(45deg, #6c5ce7, #a363d9)';
    }
    
    clickBtn.addEventListener('click', () => {
        if (gameActive) {
            score++;
            updateDisplay();
            
            // Визуальный эффект при клике
            clickBtn.classList.add('clicked');
            setTimeout(() => {
                clickBtn.classList.remove('clicked');
            }, 200);
            
            // Случайное изменение цвета
            const hue = Math.random() * 360;
            clickBtn.style.background = `linear-gradient(45deg, hsl(${hue}, 70%, 60%), hsl(${hue + 30}, 70%, 60%))`;
        }
    });
    
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
}
