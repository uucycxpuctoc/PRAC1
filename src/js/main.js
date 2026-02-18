// Главный JavaScript файл

// Глобальные функции для игр
window.showGame = function(gameName) {
    const gameSection = document.getElementById('game-section');
    const gameContainer = document.getElementById('game-container');
    const gameTitle = document.getElementById('game-title');
    
    // Скрываем все секции кроме игровой
    document.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'game-section') {
            section.style.display = 'none';
        }
    });
    
    // Показываем игровую секцию
    gameSection.style.display = 'flex';
    
    // Очищаем контейнер
    gameContainer.innerHTML = '<div class="loading">Загрузка игры...</div>';
    
    // Загружаем соответствующую игру
    setTimeout(() => {
        switch(gameName) {
            case 'clicker':
                gameTitle.textContent = 'Кликер';
                if (typeof initClickerGame === 'function') {
                    initClickerGame(gameContainer);
                } else {
                    gameContainer.innerHTML = '<div class="error">Ошибка загрузки игры</div>';
                }
                break;
            case 'adventure':
                gameTitle.textContent = 'Генератор приключений';
                if (typeof initAdventureGame === 'function') {
                    initAdventureGame(gameContainer);
                } else {
                    gameContainer.innerHTML = '<div class="error">Ошибка загрузки игры</div>';
                }
                break;
            case 'guess':
                gameTitle.textContent = 'Угадай число';
                if (typeof initGuessGame === 'function') {
                    initGuessGame(gameContainer);
                } else {
                    gameContainer.innerHTML = '<div class="error">Ошибка загрузки игры</div>';
                }
                break;
            case 'reaction':
                gameTitle.textContent = 'Игра на реакцию';
                if (typeof initReactionGame === 'function') {
                    initReactionGame(gameContainer);
                } else {
                    gameContainer.innerHTML = '<div class="error">Ошибка загрузки игры</div>';
                }
                break;
            case 'tictactoe':
                gameTitle.textContent = 'Крестики-нолики';
                if (typeof initTicTacToe === 'function') {
                    initTicTacToe(gameContainer);
                } else {
                    gameContainer.innerHTML = '<div class="error">Ошибка загрузки игры</div>';
                }
                break;
            case 'maze':
                gameTitle.textContent = 'Лабиринт';
                if (typeof initMazeGame === 'function') {
                    initMazeGame(gameContainer);
                } else {
                    gameContainer.innerHTML = '<div class="error">Ошибка загрузки игры</div>';
                }
                break;
        }
    }, 100);
    
    // Плавный скролл к игровой секции
    gameSection.scrollIntoView({ behavior: 'smooth' });
};

window.hideGame = function() {
    const gameSection = document.getElementById('game-section');
    
    // Показываем все секции
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'flex';
    });
    
    // Скрываем игровую секцию
    gameSection.style.display = 'none';
    
    // Очищаем контейнер игры
    document.getElementById('game-container').innerHTML = '';
};

// Функция показа уведомлений
window.showNotification = function(text, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = text;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10ac84' : type === 'error' ? '#ee5253' : '#6c5ce7'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
};

// Анимация текста ролей
const roles = ['Frontend разработчик', 'Game Developer', 'UI дизайнер', 'Студент'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentText = '';
let roleElement = document.querySelector('.role');

function typeEffect() {
    if (!roleElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        currentText = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    roleElement.textContent = currentText;
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Навигация и подсветка активной секции
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Мобильное меню
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

// Подсветка активной секции при скролле
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

// Валидация формы контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Валидация
        if (name.length < 2) {
            showNotification('Имя должно содержать минимум 2 символа', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Введите корректный email', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Сообщение должно содержать минимум 10 символов', 'error');
            return;
        }
        
        // Имитация отправки
        showNotification('Сообщение отправлено! Я свяжусь с вами скоро.', 'success');
        contactForm.reset();
    });
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading, .error {
        text-align: center;
        padding: 2rem;
        font-size: 1.2rem;
    }
    
    .error {
        color: #ee5253;
    }
`;
document.head.appendChild(style);

// Запускаем анимацию текста при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Запускаем анимацию текста при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});
