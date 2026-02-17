// ==================== КЛАССЫ ДЛЯ ХРАНЕНИЯ ДАННЫХ ====================

// Класс для работы с localStorage
class Storage {
    static save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load(key, defaultValue = null) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}

// Класс персонажа для RPG планировщика
class Character {
    constructor(name = "Новичок", avatar = "warrior") {
        this.name = name;
        this.avatar = avatar;
        this.level = 1;
        this.xp = 0;
        this.totalXp = 0;
        this.tasksCompleted = 0;
        this.creationDate = new Date().toLocaleDateString();
    }

    addExperience(amount) {
        this.xp += amount;
        this.totalXp += amount;
        
        let leveledUp = false;
        while (this.xp >= this.getExperienceToNextLevel()) {
            this.xp -= this.getExperienceToNextLevel();
            this.level++;
            leveledUp = true;
        }
        
        return leveledUp;
    }

    getExperienceToNextLevel() {
        return 100 * this.level;
    }

    getXpProgress() {
        return (this.xp / this.getExperienceToNextLevel()) * 100;
    }

    toJSON() {
        return {
            name: this.name,
            avatar: this.avatar,
            level: this.level,
            xp: this.xp,
            totalXp: this.totalXp,
            tasksCompleted: this.tasksCompleted,
            creationDate: this.creationDate
        };
    }

    static fromJSON(data) {
        const character = new Character(data.name, data.avatar);
        character.level = data.level;
        character.xp = data.xp;
        character.totalXp = data.totalXp;
        character.tasksCompleted = data.tasksCompleted;
        character.creationDate = data.creationDate;
        return character;
    }
}

// Класс задачи
class Task {
    constructor(title, description, difficulty, xpValue) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.description = description || "";
        this.difficulty = difficulty;
        this.xpValue = parseInt(xpValue);
        this.completed = false;
        this.createdAt = new Date().toLocaleString();
        this.completedAt = null;
    }

    complete() {
        this.completed = true;
        this.completedAt = new Date().toLocaleString();
    }

    uncomplete() {
        this.completed = false;
        this.completedAt = null;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            difficulty: this.difficulty,
            xpValue: this.xpValue,
            completed: this.completed,
            createdAt: this.createdAt,
            completedAt: this.completedAt
        };
    }

    static fromJSON(data) {
        const task = new Task(data.title, data.description, data.difficulty, data.xpValue);
        task.id = data.id;
        task.completed = data.completed;
        task.createdAt = data.createdAt;
        task.completedAt = data.completedAt;
        return task;
    }
}

// ==================== КЛАСС УПРАВЛЕНИЯ ЗАДАЧАМИ ====================

class TaskManager {
    constructor() {
        this.tasks = [];
        this.character = null;
        this.load();
    }

    setCharacter(character) {
        this.character = character;
        this.save();
    }

    addTask(task) {
        this.tasks.push(task);
        this.save();
        this.render();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    completeTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task && !task.completed) {
            task.complete();
            
            if (this.character) {
                const leveledUp = this.character.addExperience(task.xpValue);
                this.character.tasksCompleted++;
                
                this.showNotification(`+${task.xpValue} XP!`, 'success');
                
                if (leveledUp) {
                    this.showLevelUpEffect();
                    this.showNotification(`🎉 Уровень повышен! Уровень ${this.character.level}!`, 'levelup');
                }
            }
            
            this.save();
            this.render();
        }
    }

    uncompleteTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task && task.completed) {
            task.uncomplete();
            
            if (this.character) {
                this.character.xp = Math.max(0, this.character.xp - task.xpValue);
                this.character.totalXp = Math.max(0, this.character.totalXp - task.xpValue);
                this.character.tasksCompleted = Math.max(0, this.character.tasksCompleted - 1);
                
                while (this.character.level > 1 && this.character.xp < 0) {
                    this.character.level--;
                    this.character.xp += 100 * this.character.level;
                }
            }
            
            this.save();
            this.render();
        }
    }

    getActiveTasks() {
        return this.tasks.filter(t => !t.completed);
    }

    getCompletedTasks() {
        return this.tasks.filter(t => t.completed);
    }

    save() {
        if (this.character) {
            Storage.save('rpg_character', this.character.toJSON());
        }
        Storage.save('rpg_tasks', this.tasks.map(t => t.toJSON()));
    }

    load() {
        const characterData = Storage.load('rpg_character');
        this.character = characterData ? Character.fromJSON(characterData) : new Character();
        
        const tasksData = Storage.load('rpg_tasks', []);
        this.tasks = tasksData.map(t => Task.fromJSON(t));
    }

    reset() {
        if (confirm('Вы уверены? Весь прогресс будет потерян!')) {
            Storage.remove('rpg_character');
            Storage.remove('rpg_tasks');
            this.character = new Character();
            this.tasks = [];
            this.save();
            this.render();
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'levelup' ? '#ffd700' : '#4caf50'};
            color: #000;
            padding: 15px 25px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    showLevelUpEffect() {
        const effect = document.createElement('div');
        effect.className = 'levelup-effect';
        effect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(0,0,0,0) 70%);
            pointer-events: none;
            z-index: 999;
            animation: levelUp 1s ease;
        `;
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }

    render() {
        if (!this.character) return;
        
        const nameInput = document.getElementById('character-name');
        const levelSpan = document.getElementById('character-level');
        const xpSpan = document.getElementById('character-xp');
        const nextXpSpan = document.getElementById('next-level-xp');
        const tasksCompletedSpan = document.getElementById('tasks-completed');
        const totalXpSpan = document.getElementById('total-xp');
        const creationDateSpan = document.getElementById('creation-date');
        const avatarSelect = document.getElementById('avatar-select');
        const xpBar = document.getElementById('xp-bar');
        
        if (nameInput) nameInput.value = this.character.name;
        if (levelSpan) levelSpan.textContent = this.character.level;
        if (xpSpan) xpSpan.textContent = this.character.xp;
        if (nextXpSpan) nextXpSpan.textContent = this.character.getExperienceToNextLevel();
        if (tasksCompletedSpan) tasksCompletedSpan.textContent = this.character.tasksCompleted;
        if (totalXpSpan) totalXpSpan.textContent = this.character.totalXp;
        if (creationDateSpan) creationDateSpan.textContent = this.character.creationDate;
        if (avatarSelect) avatarSelect.value = this.character.avatar;
        if (xpBar) xpBar.style.width = `${this.character.getXpProgress()}%`;
        
        const activeTasksContainer = document.getElementById('active-tasks');
        const completedTasksContainer = document.getElementById('completed-tasks');
        
        if (activeTasksContainer) {
            activeTasksContainer.innerHTML = '';
            this.getActiveTasks().forEach(task => {
                activeTasksContainer.appendChild(this.createTaskElement(task));
            });
        }
        
        if (completedTasksContainer) {
            completedTasksContainer.innerHTML = '';
            this.getCompletedTasks().forEach(task => {
                completedTasksContainer.appendChild(this.createTaskElement(task, true));
            });
        }
    }

    createTaskElement(task, isCompleted = false) {
        const div = document.createElement('div');
        div.className = `task-card ${isCompleted ? 'completed' : ''}`;
        div.style.cssText = `
            background: rgba(44, 24, 16, 0.7);
            border: 2px solid ${isCompleted ? '#4caf50' : '#c9a959'};
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
            transition: all 0.3s;
            opacity: ${isCompleted ? 0.8 : 1};
        `;
        
        let difficultyColor = '#4caf50';
        if (task.xpValue >= 100) difficultyColor = '#ff4444';
        else if (task.xpValue >= 50) difficultyColor = '#ff9800';
        else if (task.xpValue >= 25) difficultyColor = '#2196f3';
        
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <h4 style="color: ${isCompleted ? '#4caf50' : '#c9a959'}; margin: 0 0 5px 0;">
                        ${task.title}
                    </h4>
                    ${task.description ? `<p style="margin: 0 0 10px 0; font-size: 0.9rem;">${task.description}</p>` : ''}
                    <div style="display: flex; gap: 10px; font-size: 0.9rem;">
                        <span style="color: ${difficultyColor}; font-weight: bold;">
                            +${task.xpValue} XP
                        </span>
                        <span style="color: #888;">
                            ${task.createdAt}
                        </span>
                    </div>
                    ${task.completedAt ? `<div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Выполнено: ${task.completedAt}</div>` : ''}
                </div>
                <div style="display: flex; gap: 10px;">
                    <input type="checkbox" 
                           ${task.completed ? 'checked' : ''} 
                           onchange="window.taskManager.toggleTask(${task.id})"
                           style="width: 20px; height: 20px; cursor: pointer;">
                    <button onclick="window.taskManager.removeTask(${task.id})" 
                            style="background: #f44336; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">
                        ✕
                    </button>
                </div>
            </div>
        `;
        
        return div;
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            if (task.completed) {
                this.uncompleteTask(id);
            } else {
                this.completeTask(id);
            }
        }
    }
}

// ==================== КЛАСС УПРАВЛЕНИЯ ИГРАМИ ====================

class GamesManager {
    constructor() {
        this.initClicker();
        this.initAdventure();
        this.initGuessNumber();
        this.initReaction();
        this.initTicTacToe();
        this.initMaze();
        this.setupTabs();
        this.loadRecords();
    }

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                document.querySelectorAll('.game-container').forEach(game => {
                    game.classList.add('hidden');
                });
                
                const gameId = btn.dataset.game;
                const gameElement = document.getElementById(`${gameId}-game`);
                if (gameElement) {
                    gameElement.classList.remove('hidden');
                }
            });
        });
    }

    // Кликер
    initClicker() {
        let score = 0;
        let timer = 30;
        let interval = null;
        let record = Storage.load('clicker_record', 0);
        
        const scoreEl = document.getElementById('clicker-score');
        const timerEl = document.getElementById('clicker-timer');
        const recordEl = document.getElementById('clicker-record');
        const btn = document.getElementById('clicker-btn');
        const startBtn = document.getElementById('start-clicker');
        const resetBtn = document.getElementById('reset-clicker');
        
        if (!btn) return;
        
        recordEl.textContent = record;
        
        const updateDisplay = () => {
            scoreEl.textContent = score;
            timerEl.textContent = timer;
        };
        
        const endGame = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            btn.disabled = true;
            
            if (score > record) {
                record = score;
                recordEl.textContent = record;
                Storage.save('clicker_record', record);
                alert(`🎉 Новый рекорд: ${score}!`);
            }
        };
        
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                score++;
                scoreEl.textContent = score;
                
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => btn.style.transform = 'scale(1)', 100);
                
                btn.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
            }
        });
        
        startBtn.addEventListener('click', () => {
            if (interval) return;
            
            score = 0;
            timer = 30;
            btn.disabled = false;
            updateDisplay();
            
            interval = setInterval(() => {
                timer--;
                timerEl.textContent = timer;
                
                if (timer <= 0) {
                    endGame();
                }
            }, 1000);
        });
        
        resetBtn.addEventListener('click', () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            score = 0;
            timer = 30;
            btn.disabled = true;
            updateDisplay();
        });
    }

    // Генератор приключений
    initAdventure() {
        const characters = ['рыцарь', 'маг', 'вор', 'варвар', 'эльф', 'дварф', 'паладин', 'друид'];
        const locations = ['тёмный лес', 'заброшенный замок', 'подводное царство', 'горный перевал', 'пустыня забвения', 'волшебный лес', 'подземелье', 'летающий остров'];
        const villains = ['дракон', 'колдун', 'гоблин', 'лич', 'демон', 'гидра', 'тёмный эльф', 'бехолдер'];
        
        const storyEl = document.getElementById('adventure-story');
        const generateBtn = document.getElementById('generate-adventure');
        const saveBtn = document.getElementById('save-adventure');
        
        if (!generateBtn) return;
        
        generateBtn.addEventListener('click', () => {
            const character = characters[Math.floor(Math.random() * characters.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const villain = villains[Math.floor(Math.random() * villains.length)];
            
            const story = `⚔️ Ваш персонаж — ${character} находится в ${location} и сражается с ${villain}.`;
            storyEl.textContent = story;
            
            storyEl.style.animation = 'none';
            storyEl.offsetHeight;
            storyEl.style.animation = 'glow 0.5s ease';
        });
        
        saveBtn.addEventListener('click', () => {
            const stories = Storage.load('adventure_stories', []);
            stories.push({
                story: storyEl.textContent,
                date: new Date().toLocaleString()
            });
            Storage.save('adventure_stories', stories);
            alert('История сохранена!');
        });
    }

    // Угадай число
    initGuessNumber() {
        let secretNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        
        const input = document.getElementById('guess-input');
        const guessBtn = document.getElementById('guess-btn');
        const messageEl = document.getElementById('guess-message');
        const attemptsEl = document.getElementById('attempts-count');
        const newGameBtn = document.getElementById('new-guess-game');
        
        if (!guessBtn) return;
        
        const showMessage = (msg, isSuccess = false) => {
            messageEl.textContent = msg;
            messageEl.style.color = isSuccess ? '#4caf50' : '#ff9800';
        };
        
        guessBtn.addEventListener('click', () => {
            const guess = parseInt(input.value);
            
            if (isNaN(guess) || guess < 1 || guess > 100) {
                showMessage('Пожалуйста, введите число от 1 до 100');
                return;
            }
            
            attempts++;
            attemptsEl.textContent = attempts;
            
            if (guess === secretNumber) {
                showMessage(`🎉 Поздравляю! Вы угадали число за ${attempts} попыток!`, true);
                guessBtn.disabled = true;
            } else if (guess < secretNumber) {
                showMessage('📈 Загаданное число больше');
            } else {
                showMessage('📉 Загаданное число меньше');
            }
            
            input.value = '';
        });
        
        newGameBtn.addEventListener('click', () => {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            attemptsEl.textContent = attempts;
            showMessage('Новая игра! Введите число от 1 до 100');
            guessBtn.disabled = false;
            input.value = '';
        });
    }

    // Игра на реакцию
    initReaction() {
        let timer = 30;
        let hits = 0;
        let totalReactionTime = 0;
        let interval = null;
        let timeout = null;
        let gameActive = false;
        let startTime = null;
        
        const timerEl = document.getElementById('reaction-timer');
        const hitsEl = document.getElementById('reaction-hits');
        const avgEl = document.getElementById('reaction-avg');
        const area = document.getElementById('reaction-area');
        const btn = document.getElementById('reaction-btn');
        const startBtn = document.getElementById('start-reaction');
        const resetBtn = document.getElementById('reset-reaction');
        
        if (!btn) return;
        
        const showButton = () => {
            if (!gameActive) return;
            
            btn.classList.remove('hidden');
            const maxX = area.clientWidth - btn.clientWidth;
            const maxY = area.clientHeight - btn.clientHeight;
            
            btn.style.position = 'absolute';
            btn.style.left = Math.max(0, Math.random() * maxX) + 'px';
            btn.style.top = Math.max(0, Math.random() * maxY) + 'px';
            
            startTime = Date.now();
        };
        
        const hideButton = () => {
            btn.classList.add('hidden');
        };
        
        const updateStats = () => {
            timerEl.textContent = timer;
            hitsEl.textContent = hits;
            avgEl.textContent = hits > 0 ? Math.round(totalReactionTime / hits) : 0;
        };
        
        const endGame = () => {
            gameActive = false;
            if (interval) clearInterval(interval);
            if (timeout) clearTimeout(timeout);
            hideButton();
        };
        
        btn.addEventListener('click', () => {
            if (!gameActive || !startTime) return;
            
            const reactionTime = Date.now() - startTime;
            totalReactionTime += reactionTime;
            hits++;
            updateStats();
            
            hideButton();
            
            timeout = setTimeout(showButton, Math.random() * 3000 + 1000);
        });
        
        startBtn.addEventListener('click', () => {
            if (gameActive) return;
            
            gameActive = true;
            timer = 30;
            hits = 0;
            totalReactionTime = 0;
            updateStats();
            
            interval = setInterval(() => {
                timer--;
                timerEl.textContent = timer;
                
                if (timer <= 0) {
                    endGame();
                }
            }, 1000);
            
            showButton();
        });
        
        resetBtn.addEventListener('click', () => {
            endGame();
            timer = 30;
            hits = 0;
            totalReactionTime = 0;
            updateStats();
        });
    }

    // Крестики-нолики
    initTicTacToe() {
        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let gameActive = true;
        let vsComputer = false;
        
        const statusEl = document.getElementById('tictactoe-status');
        const boardEl = document.getElementById('tictactoe-board');
        const resetBtn = document.getElementById('reset-tictactoe');
        const vsComputerBtn = document.getElementById('vs-computer');
        
        if (!boardEl) return;
        
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        const checkWinner = () => {
            for (let combo of winningCombinations) {
                const [a, b, c] = combo;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }
            return board.includes('') ? null : 'ничья';
        };
        
        const computerMove = () => {
            if (!gameActive || currentPlayer !== 'O' || !vsComputer) return;
            
            const emptyCells = board.reduce((acc, cell, index) => {
                if (!cell) acc.push(index);
                return acc;
            }, []);
            
            if (emptyCells.length > 0) {
                setTimeout(() => {
                    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    handleMove(randomCell);
                }, 500);
            }
        };
        
        const handleMove = (index) => {
            if (!gameActive || board[index]) return;
            
            board[index] = currentPlayer;
            render();
            
            const winner = checkWinner();
            if (winner) {
                gameActive = false;
                if (winner === 'ничья') {
                    statusEl.textContent = 'Ничья!';
                } else {
                    statusEl.textContent = `Победил ${winner}!`;
                }
                return;
            }
            
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusEl.textContent = `Ход: ${currentPlayer}`;
            
            if (vsComputer && currentPlayer === 'O') {
                computerMove();
            }
        };
        
        const render = () => {
            boardEl.innerHTML = '';
            board.forEach((cell, index) => {
                const cellBtn = document.createElement('button');
                cellBtn.className = 'board-cell';
                cellBtn.textContent = cell;
                cellBtn.style.cssText = `
                    width: 80px;
                    height: 80px;
                    font-size: 2rem;
                    border: 2px solid #c9a959;
                    background: rgba(44, 24, 16, 0.7);
                    color: ${cell === 'X' ? '#ff4444' : '#4caf50'};
                    cursor: ${gameActive && !cell ? 'pointer' : 'default'};
                `;
                
                if (gameActive && !cell) {
                    cellBtn.addEventListener('click', () => handleMove(index));
                }
                
                boardEl.appendChild(cellBtn);
            });
            boardEl.style.display = 'grid';
            boardEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            boardEl.style.gap = '10px';
            boardEl.style.justifyContent = 'center';
            boardEl.style.marginBottom = '20px';
        };
        
        resetBtn.addEventListener('click', () => {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            statusEl.textContent = 'Ход: X';
            render();
        });
        
        vsComputerBtn.addEventListener('click', () => {
            vsComputer = !vsComputer;
            vsComputerBtn.textContent = vsComputer ? 'Против друга' : 'Против компьютера';
            resetBtn.click();
        });
        
        render();
    }

    // Лабиринт
    initMaze() {
        const maze = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 2, 1]
        ];
        
        let playerPos = { x: 1, y: 1 };
        let timer = 0;
        let interval = null;
        let gameActive = false;
        
        const gridEl = document.getElementById('maze-grid');
        const timerEl = document.getElementById('maze-timer');
        const resetBtn = document.getElementById('reset-maze');
        
        if (!gridEl) return;
        
        const render = () => {
            gridEl.innerHTML = '';
            gridEl.style.display = 'grid';
            gridEl.style.gridTemplateColumns = `repeat(${maze[0].length}, 40px)`;
            gridEl.style.gap = '2px';
            gridEl.style.justifyContent = 'center';
            
            for (let y = 0; y < maze.length; y++) {
                for (let x = 0; x < maze[y].length; x++) {
                    const cell = document.createElement('div');
                    cell.style.width = '40px';
                    cell.style.height = '40px';
                    cell.style.display = 'flex';
                    cell.style.alignItems = 'center';
                    cell.style.justifyContent = 'center';
                    cell.style.fontSize = '20px';
                    
                    if (maze[y][x] === 1) {
                        cell.style.backgroundColor = '#2c1810';
                        cell.style.border = '1px solid #8b5a2b';
                    } else if (maze[y][x] === 2) {
                        cell.style.backgroundColor = '#4caf50';
                        cell.innerHTML = '🚪';
                    } else {
                        cell.style.backgroundColor = '#1a0f0a';
                        cell.style.border = '1px solid #c9a959';
                    }
                    
                    if (playerPos.x === x && playerPos.y === y) {
                        cell.innerHTML = '👤';
                        cell.style.backgroundColor = '#c9a959';
                    }
                    
                    gridEl.appendChild(cell);
                }
            }
        };
        
        const checkWin = () => {
            if (maze[playerPos.y][playerPos.x] === 2) {
                gameActive = false;
                if (interval) clearInterval(interval);
                alert(`🎉 Победа! Время: ${timer} секунд`);
            }
        };
        
        const move = (dx, dy) => {
            if (!gameActive) return;
            
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;
            
            if (newY >= 0 && newY < maze.length && 
                newX >= 0 && newX < maze[0].length && 
                maze[newY][newX] !== 1) {
                
                playerPos.x = newX;
                playerPos.y = newY;
                render();
                checkWin();
            }
        };
        
        const handleKeyDown = (e) => {
            if (!gameActive) return;
            
            switch(e.key) {
                case 'ArrowUp': move(0, -1); break;
                case 'ArrowDown': move(0, 1); break;
                case 'ArrowLeft': move(-1, 0); break;
                case 'ArrowRight': move(1, 0); break;
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        resetBtn.addEventListener('click', () => {
            playerPos = { x: 1, y: 1 };
            timer = 0;
            timerEl.textContent = timer;
            gameActive = true;
            
            if (interval) clearInterval(interval);
            interval = setInterval(() => {
                if (gameActive) {
                    timer++;
                    timerEl.textContent = timer;
                }
            }, 1000);
            
            render();
        });
        
        resetBtn.click();
    }

    loadRecords() {
        const clickerRecord = Storage.load('clicker_record', 0);
        const recordEl = document.getElementById('clicker-record');
        if (recordEl) recordEl.textContent = clickerRecord;
    }
}

// ==================== ОСНОВНОЙ КОД ПРИЛОЖЕНИЯ ====================

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация RPG планировщика
    window.taskManager = new TaskManager();
    window.taskManager.render();
    
    // Обработчики событий для RPG планировщика
    const characterName = document.getElementById('character-name');
    if (characterName) {
        characterName.addEventListener('change', (e) => {
            window.taskManager.character.name = e.target.value;
            window.taskManager.save();
        });
    }
    
    const avatarSelect = document.getElementById('avatar-select');
    if (avatarSelect) {
        avatarSelect.addEventListener('change', (e) => {
            window.taskManager.character.avatar = e.target.value;
            window.taskManager.save();
            window.taskManager.render();
        });
    }
    
    const addTaskBtn = document.getElementById('add-task');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const title = document.getElementById('task-title').value.trim();
            if (!title) {
                alert('Введите название задачи!');
                return;
            }
            
            const description = document.getElementById('task-desc').value.trim();
            const difficultyRadio = document.querySelector('input[name="difficulty"]:checked');
            const difficulty = difficultyRadio ? difficultyRadio.value : '10';
            const difficultyNames = {10: 'Легкая', 25: 'Средняя', 50: 'Сложная', 100: 'Эпическая'};
            
            const task = new Task(title, description, difficultyNames[difficulty], difficulty);
            window.taskManager.addTask(task);
            
            document.getElementById('task-title').value = '';
            document.getElementById('task-desc').value = '';
        });
    }
    
    const resetProgressBtn = document.getElementById('reset-progress');
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            window.taskManager.reset();
        });
    }
    
    // Инициализация игр
    window.gamesManager = new GamesManager();
    
    // Навигация и подсветка активной секции
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Плавный скролл к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Анимация для текста ролей
    const roles = ['Frontend разработчик', 'UI дизайнер', 'Студент', 'Геймдизайнер'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const roleElement = document.querySelector('.role');
        if (!roleElement) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement
