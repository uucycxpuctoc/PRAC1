document.getElementById('contactForm').addEventListener('submit', e => {
e.preventDefault();
alert('Сообщение отправлено!');
});


const links=document.querySelectorAll('nav a');


// typing effect
const text="Frontend разработчик | Студент | UI-энтузиаст";
let i=0;
const el=document.querySelector('.typing');
el.textContent="";
setInterval(()=>{el.textContent=text.slice(0,i++);if(i>text.length)i=0},120);


// scroll reveal
const reveals=document.querySelectorAll('.reveal');
window.addEventListener('scroll',()=>{
reveals.forEach(r=>{
const top=r.getBoundingClientRect().top;
if(top<window.innerHeight-100) r.classList.add('active');
});


()=>{
let fromTop=window.scrollY+100;
links.forEach(link=>{
let section=document.querySelector(link.hash);
link.classList.toggle('active',section.offsetTop<=fromTop && section.offsetTop+section.offsetHeight>fromTop);
});
});
