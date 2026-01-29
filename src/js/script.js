// кнопка
function scrollToContacts() {
  document.getElementById("contacts").scrollIntoView({ behavior: "smooth" });
}

// активная секция
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

// форма
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Спасибо! Сообщение отправлено 🚀");
});
