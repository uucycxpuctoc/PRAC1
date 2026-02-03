const pages = document.querySelectorAll('.page');

document.querySelectorAll('[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});
