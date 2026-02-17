// Навигация и подсветка активной секции
document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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
            if (scrollY >= sectionTop - 200) {
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

    // Валидация формы
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

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

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 3000);
    }

    // Загрузка аватара (заглушка)
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%236c5ce7"/><circle cx="50" cy="35" r="10" fill="%23fff"/><path d="M30 65 Q50 80 70 65" stroke="%23fff" stroke-width="5" fill="none"/></svg>';
    }

    // Загрузка изображений проектов (заглушки)
    document.querySelectorAll('.project-image img').forEach((img, index) => {
        const colors = ['%236c5ce7', '%23fd79a8', '%2300b894'];
        img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="${colors[index % colors.length]}"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">Project ${index + 1}</text></svg>`;
    });
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
    gamesSection.style.display = 'flex';
    
    // Загружаем соответствующую игру
    const gameContent = document.getElementById('game-content');
    
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
    document.getElementById('games-section').style.display = 'none';
    document.querySelectorAll('.section:not(#games-section)').forEach(section => {
        section.style.display = 'flex';
    });
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
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
    
    window.loadAdventure = (index) => {
        textEl.textContent = savedAdventures[index];
        textEl.style.animation = 'slideIn 0.5s ease-out
