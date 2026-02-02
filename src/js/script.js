// Активная навигация
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 120;

  links.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// Скролл к контактам
function scrollToContacts() {
  document.querySelector("#contacts").scrollIntoView({ behavior: "smooth" });
}

// Typing эффект
const roles = ["Frontend разработчик", "UI энтузиаст", "Студент"];
let roleIndex = 0, charIndex = 0;
const typingEl = document.getElementById("typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingEl.textContent += roles[roleIndex][charIndex++];
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = roles[roleIndex].slice(0, --charIndex);
    setTimeout(erase, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}

type();

// Анимация навыков
const bars = document.querySelectorAll(".bar div");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level;
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => {
  bar.dataset.level = bar.style.width;
  bar.style.width = "0";
  observer.observe(bar);
});

// Форма
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  alert("Сообщение отправлено 🚀");
});
