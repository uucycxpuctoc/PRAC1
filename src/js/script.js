const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100;

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

function scrollToContacts() {
  document.querySelector("#contacts").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Сообщение отправлено!");
});
