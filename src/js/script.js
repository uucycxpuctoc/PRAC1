// Анимация текста (Роли)
const roles = ["Frontend разработчик", "UI дизайнер", "Студент ТОУ"];
let roleIdx = 0;
let charIdx = 0;
const roleEl = document.getElementById("role");

function type() {
    if (charIdx < roles[roleIdx].length) {
        roleEl.textContent += roles[roleIdx].charAt(charIdx);
        charIdx++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIdx > 0) {
        roleEl.textContent = roles[roleIdx].substring(0, charIdx - 1);
        charIdx--;
        setTimeout(erase, 50);
    } else {
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", type);

// Подсветка активной секции
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Валидация формы
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    status.textContent = "Сообщение отправлено успешно!";
    status.style.color = "#4ade80";
    this.reset();
});
