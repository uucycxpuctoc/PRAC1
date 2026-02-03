document.getElementById('contactForm').addEventListener('submit', e => {
e.preventDefault();
alert('Сообщение отправлено!');
});


const links=document.querySelectorAll('nav a');
window.addEventListener('scroll',()=>{
let fromTop=window.scrollY+100;
links.forEach(link=>{
let section=document.querySelector(link.hash);
link.classList.toggle('active',section.offsetTop<=fromTop && section.offsetTop+section.offsetHeight>fromTop);
});
});
