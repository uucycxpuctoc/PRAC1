    <!-- JavaScript -->
    <script>
        // ===== АНИМИРОВАННЫЙ КУРСОР =====
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursor-dot');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Эффект наведения на кликабельные элементы
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag, .contact-item, .social-links a');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Скрываем курсор когда он уходит с окна
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });

        // ===== ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ =====
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });

        // ===== АНИМИРОВАННЫЙ ТЕКСТ (ПЕЧАТНАЯ МАШИНКА) =====
        const roles = ["Frontend разработчик", "UI дизайнер", "Студент", "Разработчик настольных приложений"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingText = document.getElementById('typing-text');

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

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

        // Запускаем анимацию текста
        if (typingText) {
            typeEffect();
        }

        // ===== ПОДСВЕТКА АКТИВНОЙ СЕКЦИИ В НАВИГАЦИИ =====
        const navLinks = document.querySelectorAll('.nav-links a');

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

        // ===== ДОЖДЬ =====
        function createRain() {
            const rainContainer = document.getElementById('rain');
            if (!rainContainer) return;
            
            for (let i = 0; i < 50; i++) {
                const drop = document.createElement('div');
                drop.className = 'drop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
                drop.style.animationDelay = Math.random() * 5 + 's';
                drop.style.opacity = Math.random() * 0.3;
                rainContainer.appendChild(drop);
            }
        }

        createRain();

        // ===== ВАЛИДАЦИЯ ФОРМЫ =====
        function validateForm() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const nameGroup = document.getElementById('nameGroup');
            const emailGroup = document.getElementById('emailGroup');
            const messageGroup = document.getElementById('messageGroup');
            const successMessage = document.getElementById('successMessage');
            
            let isValid = true;

            // Имя
            if (name.value.length < 2) {
                nameGroup.classList.add('error');
                isValid = false;
            } else {
                nameGroup.classList.remove('error');
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailGroup.classList.add('error');
                isValid = false;
            } else {
                emailGroup.classList.remove('error');
            }

            // Сообщение
            if (message.value.trim() === '') {
                messageGroup.classList.add('error');
                isValid = false;
            } else {
                messageGroup.classList.remove('error');
            }

            if (isValid) {
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
                
                name.value = '';
                email.value = '';
                message.value = '';
            }
        }

        // Делаем функцию глобальной
        window.validateForm = validateForm;
    </script>
<!-- Эффект дождя (контейнер) -->
<div class="rain" id="rain"></div>

<script>
    // ===== СОЗДАЁМ ДОЖДЬ =====
    function createRain() {
        const rainContainer = document.getElementById('rain');
        if (!rainContainer) return;
        
        rainContainer.innerHTML = ''; // Очищаем
        
        // Создаём 150 капель
        for (let i = 0; i < 150; i++) {
            const drop = document.createElement('div');
            drop.className = 'drop';
            
            // Случайное положение
            drop.style.left = Math.random() * 100 + '%';
            
            // Случайная задержка
            drop.style.animationDelay = Math.random() * 5 + 's';
            
            // Случайная длительность (1-3 секунды)
            drop.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            
            // Случайная высота (30-120px)
            drop.style.height = (Math.random() * 90 + 30) + 'px';
            
            // Случайная прозрачность
            drop.style.opacity = Math.random() * 0.4;
            
            rainContainer.appendChild(drop);
        }
    }

    // Запускаем дождь после загрузки
    window.addEventListener('load', createRain);
    
    // ===== ПЕЧАТНАЯ МАШИНКА =====
    const roles = ["Frontend разработчик", "UI дизайнер", "Студент", "Разработчик настольных приложений"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingText = document.getElementById('typing-text');

    if (typingText) {
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

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
        typeEffect();
    }

    // ===== ПОДСВЕТКА АКТИВНОГО МЕНЮ =====
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
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

    // ===== ВАЛИДАЦИЯ ФОРМЫ =====
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const nameGroup = document.getElementById('nameGroup');
        const emailGroup = document.getElementById('emailGroup');
        const messageGroup = document.getElementById('messageGroup');
        
        let isValid = true;

        if (name && name.value.length < 2) {
            nameGroup.classList.add('error');
            isValid = false;
        } else if (name) {
            nameGroup.classList.remove('error');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email.value)) {
            emailGroup.classList.add('error');
            isValid = false;
        } else if (email) {
            emailGroup.classList.remove('error');
        }

        if (message && message.value.trim() === '') {
            messageGroup.classList.add('error');
            isValid = false;
        } else if (message) {
            messageGroup.classList.remove('error');
        }

        if (isValid && name && email && message) {
            alert('Сообщение отправлено! (тестовый режим)');
            name.value = '';
            email.value = '';
            message.value = '';
        }
    }

    window.validateForm = validateForm;
</script>
