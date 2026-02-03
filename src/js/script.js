// Эффект печати текста
const roles = ["Frontend Разработчик", "UI/UX Дизайнер", "Студент TOU"];
let roleIdx = 0;
let charIdx = 0;
const roleSpeed = 100;

function typeEffect() {
    const target = document.getElementById("role");
    if (charIdx < roles[roleIdx].length) {
        target.textContent += roles[roleIdx].charAt(charIdx);
        charIdx++;
        setTimeout(typeEffect, roleSpeed);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    const target = document.getElementById("role");
    if (charIdx > 0) {
        target.textContent = roles[roleIdx].substring(0, charIdx - 1);
        charIdx--;
        setTimeout(eraseEffect, 50);
    } else {
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

// Валидация формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    if (name.length < 2) {
        alert("Пожалуйста, введите корректное имя");
        return;
    }
    alert("Ваш свиток отправлен! (Имитация отправки)");
    this.reset();
});

// Запуск при загрузке
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});
