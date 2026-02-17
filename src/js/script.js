/* ===== SMOOTH UI EFFECTS ===== */

// плавное появление секций
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:0.1});

sections.forEach(sec=>{
  sec.style.opacity='0';
  sec.style.transform='translateY(40px)';
  sec.style.transition='1s';
  observer.observe(sec);
});

// glow cursor
const glow = document.createElement('div');
glow.style.position='fixed';
glow.style.width='200px';
glow.style.height='200px';
glow.style.borderRadius='50%';
glow.style.pointerEvents='none';
glow.style.background='radial-gradient(circle, rgba(76,201,240,0.15), transparent 70%)';
glow.style.zIndex='9999';
document.body.appendChild(glow);

document.addEventListener('mousemove',e=>{
  glow.style.left = e.clientX-100+'px';
  glow.style.top  = e.clientY-100+'px';
});
