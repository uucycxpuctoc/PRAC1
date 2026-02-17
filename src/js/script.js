// Основные переменные
let currentGame = null;
let typedTextInterval = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeTypedText();
    initializeScrollSpy();
    initializeContactForm();
    initializeAnimations();
    hideLoader();
});

// Скрыть загрузчик
function hideLoader() {
    setTimeout(() => {
        document.querySelector('.loader')?.classList.add('hidden');
    }, 1000);
}

// Навигация
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link?.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Анимированный текст
function initializeTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const texts = [
        'Frontend разработчик',
        'UI дизайнер',
        'Студент',
        'Backend разработчик',
        'Fullstack разработчик'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Подсветка активной секции
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
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
}

// Контактная форма с валидацией
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Валидация
        if (!name.value.trim()) {
            showNotification('Пожалуйста, введите имя', 'error');
            return;
        }

        if (!validateEmail(email.value)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }

        if (!message.value.trim()) {
            showNotification('Пожалуйста, введите сообщение', 'error');
            return;
        }

        // Успешная отправка
        showNotification('Сообщение отправлено!', 'success');
        form.reset();
    });
}

// Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#ff7675' : '#6c5ce7'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Анимации при скролле
function initializeAnimations() {
    const elements = document.querySelectorAll('.skills-category, .project-card, .timeline-item, .achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Управление играми
function showGame(gameName) {
    const modal = document.getElementById('gameModal');
    const gameContent = document.getElementById('gameContent');
    
    if (!modal || !gameContent) return;

    // Очищаем предыдущую игру
    gameContent.innerHTML = '';
    
    // Загружаем выбранную игру
    switch(gameName) {
        case 'clicker':
            initClickerGame(gameContent);
            break;
        case 'adventure':
            initAdventureGame(gameContent);
            break;
        case 'guess':
            initGuessGame(gameContent);
            break;
        case 'reaction':
            initReactionGame(gameContent);
            break;
        case 'tictactoe':
            initTicTacToeGame(gameContent);
            break;
        case 'maze':
            initMazeGame(gameContent);
            break;
    }

    modal.classList.add('active');
    currentGame = gameName;
}

// Закрытие модального окна
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('gameModal');
    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            if (currentGame) {
                stopGame(currentGame);
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            if (currentGame) {
                stopGame(currentGame);
            }
        }
    });
});

// Остановка игры
function stopGame(gameName) {
    switch(gameName) {
        case 'clicker':
            stopClickerGame();
            break;
        case 'reaction':
            stopReactionGame();
            break;
        case 'tictactoe':
            stopTicTacToeGame();
            break;
        case 'maze':
            stopMazeGame();
            break;
    }
    currentGame = null;
}
