/* =========================
   SCROLL TO CONTACTS
========================= */
const scrollToContacts = () => {
  const target = document.getElementById("contacts");
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

/* =========================
   ACTIVE NAV (IntersectionObserver)
========================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a[href^='#']");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );
      });
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0
  }
);

sections.forEach(section => navObserver.observe(section));

/* =========================
   FORM HANDLING
========================= */
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const button = form.querySelector("button");
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Отправка...";

    // имитация отправки
    setTimeout(() => {
      alert("Спасибо! Сообщение отправлено 🚀");

      form.reset();
      button.disabled = false;
      button.textContent = originalText;
    }, 800);
  });
}
