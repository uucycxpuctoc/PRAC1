/* =========================
   КЛИКЕР
========================= */
let score = 0;
const scoreEl = document.getElementById('score');

document.getElementById('clickBtn').onclick = () => {
  score++;
  scoreEl.innerText = score;
};

document.getElementById('resetBtn').onclick = () => {
  score = 0;
  scoreEl.innerText = 0;
};

/* =========================
   ГЕНЕРАТОР ПРИКЛЮЧЕНИЙ
========================= */
const chars = ['рыцарь','маг','вор','паладин','ассасин','охотник'];
const locs = ['тёмный лес','древний храм','подводное царство','заброшенный город','кристальные пещеры','лавовые земли'];
const villains = ['дракон','демон','гоблин','колдун','титан','некромант'];

document.getElementById('storyBtn').onclick = () => {
  const c = chars[Math.floor(Math.random()*chars.length)];
  const l = locs[Math.floor(Math.random()*locs.length)];
  const v = villains[Math.floor(Math.random()*villains.length)];
  document.getElementById('story').innerText =
    `Ваш персонаж — ${c}. Он находится в ${l} и сражается с ${v}.`;
};

/* =========================
   УГАДАЙ ЧИСЛО
========================= */
let secret = Math.floor(Math.random()*100)+1;

document.getElementById('guessBtn').onclick = () => {
  const val = parseInt(document.getElementById('guessInput').value);
  let res = '';

  if(isNaN(val)){
    res = 'Введите число 😐';
  } else if(val > secret){
    res = 'Меньше ⬇️';
  } else if(val < secret){
    res = 'Больше ⬆️';
  } else {
    res = '🎉 Угадал! Загадано новое число.';
    secret = Math.floor(Math.random()*100)+1;
  }

  document.getElementById('guessResult').innerText = res;
};

/* =========================
   КРЕСТИКИ-НОЛИКИ
========================= */
let board = Array(9).fill('');
let player = 'X';
const ttt = document.getElementById('ttt');

function drawTTT(){
  ttt.innerHTML='';
  board.forEach((v,i)=>{
    let d = document.createElement('div');
    d.className = 'cell';
    d.innerText = v;
    d.onclick = ()=>move(i);
    ttt.appendChild(d);
  });
}

function move(i){
  if(board[i] || checkWinner()) return;
  board[i] = player;
  player = player==='X'?'O':'X';
  drawTTT();
  checkWinner();
}

function checkWinner(){
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let w of wins){
    const[a,b,c] = w;
    if(board[a] && board[a]===board[b] && board[a]===board[c]){
      document.getElementById('tttStatus').innerText = `🏆 Победил: ${board[a]}`;
      return true;
    }
  }

  if(!board.includes('')){
    document.getElementById('tttStatus').innerText = '🤝 Ничья';
    return true;
  }

  return false;
}

document.getElementById('tttReset').onclick = ()=>{
  board = Array(9).fill('');
  player = 'X';
  document.getElementById('tttStatus').innerText = '';
  drawTTT();
};

drawTTT();

/* =========================
   ИГРА НА РЕАКЦИЮ
========================= */
let startTime;
const reactBtn = document.getElementById('reactBtn');
const reactResult = document.getElementById('reactResult');

reactBtn.style.display = 'none';

document.getElementById('reactStart').onclick = ()=>{
  reactBtn.style.display='none';
  reactResult.innerText='Жди сигнал...';
  setTimeout(()=>{
    reactBtn.style.display='inline-block';
    startTime = Date.now();
  },Math.random()*3000+1200);
};

reactBtn.onclick = ()=>{
  const t = Date.now()-startTime;
  reactResult.innerText = `⚡ Время реакции: ${t} мс`;
  reactBtn.style.display='none';
};

/* =========================
   ЛАБИРИНТ
========================= */
const mazeMap = [
 '1111111',
 '1000001',
 '1011101',
 '1000101',
 '1110101',
 '1000001',
 '1111111'
];

let px = 1, py = 1;
const maze = document.getElementById('maze');

function drawMaze(){
  maze.innerHTML='';
  mazeMap.forEach((row,y)=>{
    [...row].forEach((c,x)=>{
      let d = document.createElement('div');
      d.style.width='42px';
      d.style.height='42px';
      d.style.background = c==='1' ? '#020617' : '#1e293b';
      d.style.transition='.2s';
      if(x===px && y===py){
        d.style.background='#4cc9f0';
        d.style.boxShadow='0 0 15px rgba(76,201,240,.8)';
      }
      maze.appendChild(d);
    });
  });
}

drawMaze();

document.addEventListener('keydown',e=>{
  let nx=px, ny=py;

  if(e.key==='ArrowUp') ny--;
  if(e.key==='ArrowDown') ny++;
  if(e.key==='ArrowLeft') nx--;
  if(e.key==='ArrowRight') nx++;

  if(mazeMap[ny][nx]==='0'){
    px = nx;
    py = ny;
    drawMaze();

    if(px===5 && py===5){
      setTimeout(()=>{
        alert('🏁 Победа! Лабиринт пройден!');
        px=1; py=1;
        drawMaze();
      },100);
    }
  }
});

/* =========================
   ПЛАВНЫЙ UI + ЭФФЕКТЫ
========================= */

// анимация появления секций
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
    }
  });
},{threshold:0.15});

sections.forEach(sec=>{
  sec.style.opacity='0';
  sec.style.transform='translateY(50px)';
  sec.style.transition='1s ease';
  observer.observe(sec);
});

// glow-cursor
const glow = document.createElement('div');
glow.style.position='fixed';
glow.style.width='180px';
glow.style.height='180px';
glow.style.borderRadius='50%';
glow.style.pointerEvents='none';
glow.style.background='radial-gradient(circle, rgba(76,201,240,0.18), transparent 70%)';
glow.style.zIndex='9999';
glow.style.transition='transform .05s linear';
document.body.appendChild(glow);

document.addEventListener('mousemove',e=>{
  glow.style.left = e.clientX-90+'px';
  glow.style.top  = e.clientY-90+'px';
});
