let clickerScore = 0;
let clickerTimeLeft = 30;
let clickerTimer = null;
let clickerHighScore = localStorage.getItem('clickerHighScore') || 0;

function initClickerGame(container) {
    // Создаем HTML для игры
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h2 class="game-title">Кликер</h2>
                <div class="game-stats">
                    <div class="stat">
                        <div class="stat-label">Очки</div>
                        <div class="stat-value" id="clickerScore">0</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Время</div>
                        <div class="stat-value" id="clickerTime">30</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Рекорд</div>
                        <div class="stat-value" id="clickerHighScore">${clickerHighScore}</div>
                    </div>
                </div>
            </div>
            <div class="game-area">
                <button class="clicker-btn" id="clickerButton" style="display: none;">
                    КЛИК!
                </button>
                <div class="game-message" id="clickerMessage"></div>
            </div>
            <div class="game-controls">
                <button class="game-btn" id="clickerStartBtn">Начать игру</button>
                <button class="game-btn danger" id="clickerResetBtn" disabled>Сбросить</button>
            </div>
        </div>
    `;

    // Получаем элементы
    const button = document.getElementById('clickerButton');
    const scoreDisplay = document.getElementById('clickerScore');
    const timeDisplay = document.getElementById('clickerTime');
    const highScoreDisplay = document.getElementById('clickerHighScore');
    const messageDisplay = document.getElementById('clickerMessage');
    const startBtn = document.getElementById('clickerStartBtn');
    const resetBtn = document.getElementById('clickerResetBtn');

    // Сброс значений
