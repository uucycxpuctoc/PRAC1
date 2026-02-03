// Эффект печати (твой оригинальный код)
const roles = ["FRONTEND DEVELOPER", "UI DESIGNER", "TOU STUDENT"];
let roleIdx = 0;
let charIdx = 0;

function typeEffect() {
    const target = document.getElementById("role");
    if (!target) return;
    if (charIdx < roles[roleIdx].length) {
        target.textContent += roles[roleIdx].charAt(charIdx);
        charIdx++;
        setTimeout(typeEffect, 100);
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

// --- НОВЫЙ ФУНКЦИОНАЛ ДЛЯ ПРАКТИЧЕСКОЙ РАБОТЫ ---

// 1. Подсветка активной секции при скролле
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// 2. Валидация формы контактов
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Простая проверка
        if (name.trim().length < 2) {
            showFeedback("Введите корректное имя", "error");
            return;
        }

        if (!email.includes("@")) {
            showFeedback("Введите правильный email", "error");
            return;
        }

        // Визуальная обратная связь
        showFeedback("Свиток успешно отправлен!", "success");
        contactForm.reset();
    });
}

// Функция для уведомлений
function showFeedback(text, type) {
    const btn = contactForm.querySelector("button");
    const originalText = btn.textContent;
    
    btn.textContent = text;
    btn.style.background = type === "error" ? "#550000" : "#ffffff";
    btn.style.color = type === "error" ? "#ffffff" : "#000000";

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
    }, 3000);
}

// Запуск эффекта печати
document.addEventListener("DOMContentLoaded", typeEffect);
