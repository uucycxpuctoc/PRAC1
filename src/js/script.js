// Анимация печатающегося текста
const roles = ["Frontend Разработчик", "UI Дизайнер", "Студент TOU"];
let roleIndex = 0;
let charIndex = 0;
const target = document.getElementById("role-text");

function type() {
    if (charIndex < roles[roleIndex].length) {
        target.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        target.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", type);

// Валидация формы
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Ваше сообщение (имитация) отправлено.');
    this.reset();
});

// Подсветка активной секции
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});
