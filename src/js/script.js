function scrollToContacts() {
  document.getElementById("contacts").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Сообщение отправлено!");
});
