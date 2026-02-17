// Навигация и подсветка активной секции
document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Подсветка активной секции при скролле
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Анимированный текст
    const roles = ['Frontend разработчик', 'UI дизайнер', 'Студент', 'Game Dev'];
    let roleIndex = 0;
    let charIndex = 0;
    const dynamicText = document.querySelector('.dynamic-text');
    
    if (dynamicText) {
        function typeRole() {
            if (charIndex < roles[roleIndex].length) {
                dynamicText.textContent += roles[roleIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeRole, 100);
            } else {
                setTimeout(eraseRole, 2000);
            }
        }
        
        function eraseRole() {
            if (charIndex > 0) {
                dynamicText.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseRole, 50);
            } else {
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 500);
            }
        }
        
        typeRole();
    }

    // Валидация формы
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormMessage('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Имитация отправки
            showFormMessage('Сообщение отправлено! Спасибо :)', 'success');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 3000);
        }
    }
});

// Управление играми
let currentGame = null;

function showGame(gameType) {
    // Скрываем основные секции
    document.querySelectorAll('.section:not(#games-section)').forEach(section => {
        section.style.display = 'none';
    });
    
    // Показываем секцию с играми
    const gamesSection = document.getElementById('games-section');
    if (gamesSection) {
        gamesSection.style.display = 'flex';
    }
    
    // Загружаем соответствующую игру
    const gameContent = document.getElementById('game-content');
    if (!gameContent) return;
    
    switch(gameType) {
        case 'clicker':
            gameContent.innerHTML = renderClickerGame();
            initClickerGame();
            break;
        case 'adventure':
            gameContent.innerHTML = renderAdventureGame();
            initAdventureGame();
            break;
        case 'guess':
            gameContent.innerHTML = renderGuessGame();
            initGuessGame();
            break;
        case 'reaction':
            gameContent.innerHTML = renderReactionGame();
            initReactionGame();
            break;
        case 'tictactoe':
            gameContent.innerHTML = renderTicTacToe();
            initTicTacToe();
            break;
        case 'rpg':
            gameContent.innerHTML = renderRPGPlanner();
            initRPGPlanner();
            break;
    }
    
    // Прокручиваем к секции игр
    gamesSection.scrollIntoView({ behavior: 'smooth' });
}

function hideGames() {
    const gamesSection = document.getElementById('games-section');
    if (gamesSection) {
        gamesSection.style.display = 'none';
    }
    
    document.querySelectorAll('.section:not(#games-section)').forEach(section => {
        section.style.display = 'flex';
    });
    
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Кликер игра
function renderClickerGame() {
    return `
        <div class="game-container clicker-game">
            <h2>Кликер</h2>
            <div class="clicker-score">0</div>
            <div class="clicker-timer">30s</div>
            <button class="clicker-button" id="clicker-btn">КЛИК!</button>
            <div class="clicker-controls">
                <button class="btn btn-small" id="reset-clicker">Сбросить</button>
                <button class="btn btn-small" id="save-record">Сохранить рекорд</button>
            </div>
            <div class="clicker-record">Рекорд: 0</div>
        </div>
    `;
}

function initClickerGame() {
    let score = 0;
    let timeLeft = 30;
    let timer = null;
    let gameActive = true;
    let record = localStorage.getItem('clickerRecord') || 0;
    
    const scoreEl = document.querySelector('.clicker-score');
    const timerEl = document.querySelector('.clicker-timer');
    const recordEl = document.querySelector('.clicker-record');
    const btn = document.getElementById('clicker-btn');
    const resetBtn = document.getElementById('reset-clicker');
    const saveBtn = document.getElementById('save-record');
    
    if (!btn || !scoreEl || !timerEl || !recordEl) return;
    
    recordEl.textContent = `Рекорд: ${record}`;
    
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = `${timeLeft}s`;
            
            // Изменение цвета кнопки
            const hue = (timeLeft * 12) % 360;
            btn.style.background = `radial-gradient(circle at 30% 30%, hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 30%))`;
        } else {
            endGame();
        }
    }
    
    function endGame() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        gameActive = false;
        btn.disabled = true;
        alert(`Игра окончена! Ваш счет: ${score}`);
        
        if (score > record) {
            record = score;
            localStorage.setItem('clickerRecord', record);
            recordEl.textContent = `Рекорд: ${record}`;
        }
    }
    
    btn.addEventListener('click', () => {
        if (!gameActive) return;
        
        if (!timer) {
            timer = setInterval(updateTimer, 1000);
        }
        
        score++;
        scoreEl.textContent = score;
        
        // Анимация клика
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 200);
        
        // Случайное движение кнопки
        const maxX = window.innerWidth - 300;
        const maxY = window.innerHeight - 300;
        btn.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`;
    });
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            score = 0;
            timeLeft = 30;
            gameActive = true;
            btn.disabled = false;
            scoreEl.textContent = '0';
            timerEl.textContent = '30s';
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            btn.style.transform = 'translate(0, 0)';
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (score > record) {
                record = score;
                localStorage.setItem('clickerRecord', record);
                recordEl.textContent = `Рекорд: ${record}`;
                alert('Новый рекорд сохранен!');
            } else {
                alert('Пока не удалось побить рекорд');
            }
        });
    }
}

// Генератор приключений
function renderAdventureGame() {
    return `
        <div class="game-container adventure-game">
            <h2>Генератор приключений</h2>
            <div class="adventure-text" id="adventure-text">
                Нажмите кнопку, чтобы сгенерировать приключение
            </div>
            <button class="btn btn-primary" id="generate-adventure">Сгенерировать</button>
            <button class="btn btn-small" id="save-adventure">Сохранить</button>
            <div class="saved-adventures">
                <h3>Сохраненные приключения</h3>
                <div id="saved-list"></div>
                <button class="btn btn-small" id="clear-saved">Очистить</button>
            </div>
        </div>
    `;
}

function initAdventureGame() {
    const characters = ['рыцарь', 'маг', 'вор', 'эльф', 'гном', 'варвар'];
    const locations = ['тёмный лес', 'заброшенный замок', 'подводное царство', 'горный перевал', 'пустыня', 'волшебный лес'];
    const villains = ['дракон', 'колдун', 'гоблин', 'ведьма', 'злой рыцарь', 'демон'];
    
    const textEl = document.getElementById('adventure-text');
    const generateBtn = document.getElementById('generate-adventure');
    const saveBtn = document.getElementById('save-adventure');
    const clearBtn = document.getElementById('clear-saved');
    const savedList = document.getElementById('saved-list');
    
    if (!textEl || !generateBtn || !saveBtn || !clearBtn || !savedList) return;
    
    let savedAdventures = JSON.parse(localStorage.getItem('adventures')) || [];
    
    function displaySaved() {
        savedList.innerHTML = savedAdventures.map((adv, index) => `
            <div class="saved-adventure-item" onclick="loadAdventure(${index})">
                ${adv}
            </div>
        `).join('');
    }
    
    function generateAdventure() {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const vil = villains[Math.floor(Math.random() * villains.length)];
        
        return `Ваш персонаж — ${char} находится в ${loc} и сражается с ${vil}.`;
    }
    
    generateBtn.addEventListener('click', () => {
        const adventure = generateAdventure();
        textEl.textContent = adventure;
        textEl.style.animation = 'none';
        textEl.offsetHeight;
        textEl.style.animation = 'slideIn 0.5s ease-out';
    });
    
    saveBtn.addEventListener('click', () => {
        if (textEl.textContent && !textEl.textContent.includes('Нажмите')) {
            savedAdventures.push(textEl.textContent);
            localStorage.setItem('adventures', JSON.stringify(savedAdventures));
            displaySaved();
        }
    });
    
    clearBtn.addEventListener('click', () => {
        savedAdventures = [];
        localStorage.removeItem('adventures');
        displaySaved();
    });
    
    displaySaved();
}

// Функция загрузки сохраненного приключения
window.loadAdventure = function(index) {
    const savedAdventures = JSON.parse(localStorage.getItem('adventures')) || [];
    const textEl = document.getElementById('adventure-text');
    if (textEl && savedAdventures[index]) {
        textEl.textContent = savedAdventures[index];
        textEl.style.animation = 'none';
        textEl.offsetHeight;
        textEl.style.animation = 'slideIn 0.5s ease-out';
    }
};

// Угадай число
function renderGuessGame() {
    return `
        <div class="game-container guess-game">
            <h2>Угадай число</h2>
            <div class="guess-range">Загадано число от 1 до 100</div>
            <div class="guess-input">
                <input type="number" id="guess-input" min="1" max="100" placeholder="Введите число">
                <button class="btn btn-primary" id="guess-btn">Угадать</button>
            </div>
            <div class="guess-message" id="guess-message"></div>
            <div class="guess-attempts" id="guess-attempts">Попыток: 0</div>
            <button class="btn btn-small" id="new-game">Новая игра</button>
        </div>
    `;
}

function initGuessGame() {
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let gameActive = true;
    
    const input = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const messageEl = document.getElementById('guess-message');
    const attemptsEl = document.getElementById('guess-attempts');
    const newGameBtn = document.getElementById('new-game');
    
    if (!input || !guessBtn || !messageEl || !attemptsEl || !newGameBtn) return;
    
    function checkGuess() {
        if (!gameActive) {
            messageEl.textContent = 'Игра окончена! Начните новую игру.';
            return;
        }
        
        const guess = parseInt(input.value);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            messageEl.textContent = 'Пожалуйста, введите число от 1 до 100';
            return;
        }
        
        attempts++;
        attemptsEl.textContent = `Попыток: ${attempts}`;
        
        if (guess === secretNumber) {
            messageEl.textContent = `Поздравляю! Вы угадали число за ${attempts} попыток!`;
            messageEl.style.color = '#00b894';
            gameActive = false;
        } else if (guess < secretNumber) {
            messageEl.textContent = 'Загаданное число больше';
            messageEl.style.color = '#fdcb6e';
        } else {
            messageEl.textContent = 'Загаданное число меньше';
            messageEl.style.color = '#fdcb6e';
        }
        
        input.value = '';
        input.focus();
    }
    
    guessBtn.addEventListener('click', checkGuess);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    newGameBtn.addEventListener('click', () => {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameActive = true;
        attemptsEl.textContent = 'Попыток: 0';
        messageEl.textContent = '';
        input.value = '';
        input.focus();
    });
}

// Игра на реакцию
function renderReactionGame() {
    return `
        <div class="game-container reaction-game">
            <h2>Игра на реакцию</h2>
            <div class="reaction-stats">
                <div>Время: <span id="reaction-timer">30</span>с</div>
                <div>Попаданий: <span id="reaction-hits">0</span></div>
                <div>Среднее время: <span id="reaction-avg">0</span>мс</div>
            </div>
            <div class="reaction-area" id="reaction-area">
                <div class="reaction-target" id="reaction-target" style="display: none;">КЛИК!</div>
            </div>
            <div class="reaction-controls">
                <button class="btn btn-primary" id="start-reaction">Старт</button>
                <button class="btn btn-small" id="reset-reaction">Сброс</button>
            </div>
        </div>
    `;
}

function initReactionGame() {
    let timeLeft = 30;
    let hits = 0;
    let totalReactionTime = 0;
    let gameActive = false;
    let timer = null;
    let targetTimeout = null;
    let startTime = null;
    
    const timerEl = document.getElementById('reaction-timer');
    const hitsEl = document.getElementById('reaction-hits');
    const avgEl = document.getElementById('reaction-avg');
    const target = document.getElementById('reaction-target');
    const area = document.getElementById('reaction-area');
    const startBtn = document.getElementById('start-reaction');
    const resetBtn = document.getElementById('reset-reaction');
    
    if (!timerEl || !hitsEl || !avgEl || !target || !area || !startBtn || !resetBtn) return;
    
    function showTarget() {
        if (!gameActive) return;
        
        const areaRect = area.getBoundingClientRect();
        const maxX = areaRect.width - 100;
        const maxY = areaRect.height - 100;
        
        target.style.left = Math.random() * maxX + 'px';
        target.style.top = Math.random() * maxY + 'px';
        target.style.display = 'flex';
        
        startTime = Date.now();
    }
    
    function hideTarget() {
        target.style.display = 'none';
    }
    
    function scheduleTarget() {
        if (!gameActive) return;
        
        const delay = Math.random() * 4000 + 1000; // 1-5 секунд
        targetTimeout = setTimeout(showTarget, delay);
    }
    
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            endGame();
        }
    }
    
    function endGame() {
        gameActive = false;
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        if (targetTimeout) {
            clearTimeout(targetTimeout);
            targetTimeout = null;
        }
        hideTarget();
        alert(`Игра окончена! Попаданий: ${hits}, Среднее время: ${hits > 0 ? Math.round(totalReactionTime / hits) : 0}мс`);
    }
    
    function resetGame() {
        timeLeft = 30;
        hits = 0;
        totalReactionTime = 0;
        gameActive = false;
        
        timerEl.textContent = timeLeft;
        hitsEl.textContent = hits;
        avgEl.textContent = '0';
        
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        if (targetTimeout) {
            clearTimeout(targetTimeout);
            targetTimeout = null;
        }
        hideTarget();
    }
    
    target.addEventListener('click', () => {
        if (!gameActive || !startTime) return;
        
        const reactionTime = Date.now() - startTime;
        totalReactionTime += reactionTime;
        hits++;
        
        hitsEl.textContent = hits;
        avgEl.textContent = Math.round(totalReactionTime / hits);
        
        hideTarget();
        scheduleTarget();
    });
    
    startBtn.addEventListener('click', () => {
        resetGame();
        gameActive = true;
        timer = setInterval(updateTimer, 1000);
        scheduleTarget();
    });
    
    resetBtn.addEventListener('click', resetGame);
}

// Крестики-нолики
function renderTicTacToe() {
    return `
        <div class="game-container tic-tac-toe">
            <h2>Крестики-нолики</h2>
            <div class="tictactoe-score">
                <div>X: <span id="score-x">0</span></div>
                <div>O: <span id="score-o">0</span></div>
            </div>
            <div class="tictactoe-board" id="tictactoe-board">
                ${Array(9).fill(0).map((_, i) => `<div class="tictactoe-cell" data-index="${i}"></div>`).join('')}
            </div>
            <div class="tictactoe-status" id="tictactoe-status">Ход: X</div>
            <button class="btn btn-primary" id="reset-tictactoe">Новая игра</button>
            <button class="btn btn-small" id="reset-score">Сброс счета</button>
        </div>
    `;
}

function initTicTacToe() {
    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;
    
    const cells = document.querySelectorAll('.tictactoe-cell');
    const statusEl = document.getElementById('tictactoe-status');
    const resetBtn = document.getElementById('reset-tictactoe');
    const resetScoreBtn = document.getElementById('reset-score');
    const scoreXEl = document.getElementById('score-x');
    const scoreOEl = document.getElementById('score-o');
    
    if (!cells.length || !statusEl || !resetBtn || !resetScoreBtn || !scoreXEl || !scoreOEl) return;
    
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        if (board.every(cell => cell !== '')) {
            return 'draw';
        }
        
        return null;
    }
    
    function updateBoard() {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.className = 'tictactoe-cell ' + (board[index] === 'X' ? 'x' : board[index] === 'O' ? 'o' : '');
        });
    }
    
    function handleCellClick(e) {
        const index = e.target.dataset.index;
        
        if (!gameActive || board[index] !== '') return;
        
        board[index] = currentPlayer;
        updateBoard();
        
        const winner = checkWinner();
        
        if (winner) {
            if (winner === 'X') {
                statusEl.textContent = 'X победил!';
                scoreX++;
                scoreXEl.textContent = scoreX;
            } else if (winner === 'O') {
                statusEl.textContent = 'O победил!';
                scoreO++;
                scoreOEl.textContent = scoreO;
            } else {
                statusEl.textContent = 'Ничья!';
            }
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusEl.textContent = `Ход: ${currentPlayer}`;
        }
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    
    resetBtn.addEventListener('click', () => {
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        statusEl.textContent = 'Ход: X';
        updateBoard();
    });
    
    resetScoreBtn.addEventListener('click', () => {
        scoreX = 0;
        scoreO = 0;
        scoreXEl.textContent = '0';
        scoreOEl.textContent = '0';
    });
}

// RPG Планировщик
function renderRPGPlanner() {
    return `
        <div class="game-container rpg-planner">
            <h2>RPG Планировщик задач</h2>
            
            <div class="rpg-character-card">
                <div class="rpg-character-info">
                    <div class="rpg-character-avatar">🧙</div>
                    <div class="rpg-character-stats">
                        <h2 id="character-name">Герой</h2>
                        <div class="rpg-level">Уровень <span id="character-level">1</span></div>
                        <div class="rpg-xp-bar">
                            <div class="rpg-xp-progress" id="xp-progress" style="width: 0%"></div>
                        </div>
                        <div class="rpg-xp-text">
                            <span>XP: <span id="current-xp">0</span></span>
                            <span>/ <span id="next-level-xp">100</span></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="rpg-task-form">
                <h3>Новое задание</h3>
                <input type="text" id="task-title" placeholder="Название задачи" required>
                <textarea id="task-desc" placeholder="Описание (необязательно)"></textarea>
                <select id="task-difficulty">
                    <option value="10">Легкая (+10 XP)</option>
                    <option value="25">Средняя (+25 XP)</option>
                    <option value="50">Сложная (+50 XP)</option>
                    <option value="100">Эпическая (+100 XP)</option>
                </select>
                <button class="btn btn-primary" id="add-task">Добавить задачу</button>
            </div>
            
            <div class="rpg-task-list" id="task-list"></div>
            
            <div class="rpg-stats">
                <div class="rpg-stat-card">
                    <div>Выполнено задач</div>
                    <div class="rpg-stat-value" id="completed-tasks">0</div>
                </div>
                <div class="rpg-stat-card">
                    <div>Всего опыта</div>
                    <div class="rpg-stat-value" id="total-xp">0</div>
                </div>
                <div class="rpg-stat-card">
                    <div>Дата создания</div>
                    <div class="rpg-stat-value" id="creation-date">${new Date().toLocaleDateString()}</div>
                </div>
            </div>
            
            <button class="btn btn-small" id="reset-progress">Сбросить прогресс</button>
        </div>
    `;
}

function initRPGPlanner() {
    // Загрузка данных из localStorage
    let character = JSON.parse(localStorage.getItem('rpgCharacter')) || {
        name: 'Герой',
        level: 1,
        currentXP: 0,
        nextLevelXP: 100,
        totalXP: 0,
        completedTasks: 0,
        creationDate: new Date().toLocaleDateString()
    };
    
    let tasks = JSON.parse(localStorage.getItem('rpgTasks')) || [];
    
    // Элементы DOM
    const levelEl = document.getElementById('character-level');
    const currentXpEl = document.getElementById('current-xp');
    const nextLevelXpEl = document.getElementById('next-level-xp');
    const xpProgress = document.getElementById('xp-progress');
    const taskList = document.getElementById('task-list');
    const completedTasksEl = document.getElementById('completed-tasks');
    const totalXpEl = document.getElementById('total-xp');
    const creationDateEl = document.getElementById('creation-date');
    
    const taskTitle = document.getElementById('task-title');
    const taskDesc = document.getElementById('task-desc');
    const taskDifficulty = document.getElementById('task-difficulty');
    const addTaskBtn = document.getElementById('add-task');
    const resetBtn = document.getElementById('reset-progress');
    
    if (!levelEl || !currentXpEl || !nextLevelXpEl || !xpProgress || !taskList || 
        !completedTasksEl || !totalXpEl || !creationDateEl || !taskTitle || 
        !taskDesc || !taskDifficulty || !addTaskBtn || !resetBtn) return;
    
    // Обновление интерфейса персонажа
    function updateCharacterDisplay() {
        levelEl.textContent = character.level;
        currentXpEl.textContent = character.currentXP;
        nextLevelXpEl.textContent = character.nextLevelXP;
        const progressPercent = (character.currentXP / character.nextLevelXP) * 100;
        xpProgress.style.width = progressPercent + '%';
        completedTasksEl.textContent = character.completedTasks;
        totalXpEl.textContent = character.totalXP;
        creationDateEl.textContent = character.creationDate;
    }
    
    // Добавление опыта
    function addXP(amount) {
        character.currentXP += amount;
        character.totalXP += amount;
        
        // Проверка на повышение уровня
        while (character.currentXP >= character.nextLevelXP) {
            character.level++;
            character.currentXP -= character.nextLevelXP;
            character.nextLevelXP = character.level * 100;
            
            // Анимация повышения уровня
            showLevelUp();
        }
        
        saveCharacter();
        updateCharacterDisplay();
    }
    
    // Анимация повышения уровня
    function showLevelUp() {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.textContent = 'LEVEL UP!';
        document.body.appendChild(notification);
        
        // Создание конфетти
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
        
        setTimeout(() => notification.remove(), 2000);
    }
    
    // Отображение задач
    function renderTasks() {
        taskList.innerHTML = tasks.map(task => `
            <div class="rpg-task-item ${task.completed ? 'completed' : ''} rpg-task-difficulty-${getDifficultyClass(task.difficulty)}" data-id="${task.id}">
                <input type="checkbox" class="rpg-task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete('${task.id}')">
                <div class="rpg-task-content">
                    <div class="rpg-task-title">${task.title}</div>
                    ${task.description ? `<div class="rpg-task-description">${task.description}</div>` : ''}
                </div>
                <div class="rpg-task-xp">+${task.xp} XP</div>
                <button class="rpg-task-delete" onclick="deleteTask('${task.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }
    
    function getDifficultyClass(difficulty) {
        switch(difficulty) {
            case 10: return 'easy';
            case 25: return 'medium';
            case 50: return 'hard';
            case 100: return 'epic';
            default: return 'medium';
        }
    }
    
    // Сохранение персонажа
    function saveCharacter() {
        localStorage.setItem('rpgCharacter', JSON.stringify(character));
    }
    
    // Сохранение задач
    function saveTasks() {
        localStorage.setItem('rpgTasks', JSON.stringify(tasks));
    }
    
    // Добавление задачи
    addTaskBtn.addEventListener('click', () => {
        const title = taskTitle.value.trim();
        if (!title) {
            alert('Введите название задачи');
            return;
        }
        
        const task = {
            id: Date.now().toString(),
            title: title,
            description: taskDesc.value.trim(),
            difficulty: parseInt(taskDifficulty.value),
            xp: parseInt(taskDifficulty.value),
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(task);
        saveTasks();
        renderTasks();
        
        taskTitle.value = '';
        taskDesc.value = '';
    });
    
    // Переключение выполнения задачи
    window.toggleTaskComplete = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            if (!task.completed) {
                task.completed = true;
                addXP(task.xp);
                character.completedTasks++;
                saveCharacter();
                updateCharacterDisplay();
            } else {
                task.completed = false;
            }
            saveTasks();
            renderTasks();
        }
    };
    
    // Удаление задачи
    window.deleteTask = (taskId) => {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
    };
    
    // Сброс прогресса
    resetBtn.addEventListener('click', () => {
        if (confirm('Вы уверены? Весь прогресс будет потерян!')) {
            character = {
                name: 'Герой',
                level: 1,
                currentXP: 0,
                nextLevelXP: 100,
                totalXP: 0,
                completedTasks: 0,
                creationDate: new Date().toLocaleDateString()
            };
            tasks = [];
            localStorage.removeItem('rpgCharacter');
            localStorage.removeItem('rpgTasks');
            updateCharacterDisplay();
            renderTasks();
        }
    });
    
    // Инициализация
    updateCharacterDisplay();
    renderTasks();
}
