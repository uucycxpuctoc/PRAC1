/* =======================
   КЛИКЕР
======================= */
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

/* =======================
   ГЕНЕРАТОР ПРИКЛЮЧЕНИЙ
======================= */
const chars = ['рыцарь','маг','вор','паладин','ассасин'];
const locs = ['тёмный лес','древний храм','подводное царство','заброшенный город','кристальные пещеры'];
const villains = ['дракон','демон','гоблин','колдун','титан'];

document.getElementById('storyBtn').onclick = () => {
  const c = chars[Math.floor(Math.random()*chars.length)];
  const l = locs[Math.floor(Math.random()*locs.length)];
  const v = villains[Math.floor(Math.random()*villains.length)];
  document.getElementById('story').innerText =
    `Ваш персонаж — ${c}, он находится в ${l} и сражается с ${v}.`;
};

/* =======================
   УГАДАЙ ЧИСЛО
======================= */
let secret = Math.floor(Math.random()*100)+1;

document.getElementById('guessBtn').onclick = () => {
  const val = parseInt(document.getElementById('guessInput').value);
  let res = '';

  if(val > secret) res = 'Меньше ⬇️';
  else if(val < secret) res = 'Больше ⬆️';
  else {
    res = '🎉 Угадал! Новое число загадано.';
    secret = Math.floor(Math.random()*100)+1;
  }

  document.getElementById('guessResult').innerText = res;
};

/* =======================
   КРЕСТИКИ-НОЛИКИ
======================= */
let board = Array(9).fill('');
let player = 'X';
const ttt = document.getElementById('ttt');

function drawTTT(){
  ttt.innerHTML='';
  board.forEach((v,i)=>{
    let d=document.createElement('div');
    d.className='cell';
    d.innerText=v;
    d.onclick=()=>move(i);
    ttt.appendChild(d);
  });
}

function move(i){
  if(board[i]) return;
  board[i]=player;
  player = player==='X'?'O':'X';
  drawTTT();
  checkWin();
}

function checkWin(){
  const wins=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  wins.forEach(w=>{
    const[a,b,c]=w;
    if(board[a] && board[a]===board[b] && board[a]===board[c]){
      document.getElementById('tttStatus').innerText = `🏆 Победа: ${board[a]}`;
    }
  });
}

document.getElementById('tttReset').onclick = ()=>{
  board = Array(9).fill('');
  player='X';
  document.getElementById('tttStatus').innerText='';
  drawTTT();
};

drawTTT();

/* =======================
   ИГРА НА РЕАКЦИЮ
======================= */
let startTime;
const reactBtn = document.getElementById('reactBtn');
reactBtn.style.display='none';

document.getElementById('reactStart').onclick = ()=>{
  reactBtn.style.display='none';
  document.getElementById('reactResult').innerText='Жди...';
  setTimeout(()=>{
    reactBtn.style.display='inline-block';
    startTime = Date.now();
  },Math.random()*3000+1000);
};

reactBtn.onclick = ()=>{
  const t = Date.now()-startTime;
  document.getElementById('reactResult').innerText = `⚡ Реакция: ${t} мс`;
  reactBtn.style.display='none';
};

/* =======================
   ЛАБИРИНТ
======================= */
const mazeMap=[
 '1111111',
 '1000001',
 '1011101',
 '1000101',
 '1110101',
 '1000001',
 '1111111'
];

let px=1, py=1;
const maze=document.getElementById('maze');

function drawMaze(){
  maze.innerHTML='';
  mazeMap.forEach((row,y)=>{
    [...row].forEach((c,x)=>{
      let d=document.createElement('div');
      d.style.width='40px';
      d.style.height='40px';
      d.style.background = c==='1' ? '#020617' : '#1e293b';
      if(x===px && y===py) d.style.background='#4cc9f0';
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
    px=nx; py=ny;
    drawMaze();
    if(px===5 && py===5){
      setTimeout(()=>alert('🏁 Победа! Лабиринт пройден!'),100);
    }
  }
});
