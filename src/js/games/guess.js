// Игра Угадай число
function initGuessGame(container) {
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let gameActive = true;
    
    const gameHTML = `
        <div class="guess-game">
            <h3>Угадай число от 1 до 100</h3>
            <div class="guess-input">
                <input type="number" id="guessInput" class="guess-field" min="1" max="100" placeholder="Ваше число">
                <button class="btn-game" id="guessBtn">Проверить</button>
            </div>
            <div class="guess-message" id="message">Введите число и нажмите "Проверить"</div>
            <div class="attempts" id="attempts">Попыток: 0</div>
            <div class="game-controls">
                <button class="btn-game" id="newGameBtn">Новая игра</button>
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const guessInput = document.getElementById('guessInput');
    const guessBtn = document.getElementById('guessBtn');
    const messageDiv = document.getElementById('message');
    const attemptsDiv = document.getElementById('attempts');
    const newGameBtn = document.getElementById('newGameBtn');
    
    function checkGuess() {
        if (!gameActive) {
            messageDiv.textContent = 'Игра окончена! Начните новую игру.';
            return;
        }
        
        const guess = parseInt(guessInput.value);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            messageDiv.textContent = 'Пожалуйста, введите число от 1 до 100';
            messageDiv.className = 'guess-message cold';
            return;
        }
        
        attempts++;
        attemptsDiv.textContent = `Попыток: ${attempts}`;
        
        const difference
