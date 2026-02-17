// === ХАРАКТЕРИСТИКИ ПЕРСОНАЖА ===
let hero = JSON.parse(localStorage.getItem('hero')) || { lvl: 1, xp: 0 };

function updateHero() {
    document.getElementById('lvl-display').innerText = hero.lvl;
    document.getElementById('xp-current').innerText = hero.xp;
    let next = hero.lvl * 100;
    document.getElementById('xp-needed').innerText = next;
    document.getElementById('xp-fill').style.width = (hero.xp / next * 100) + "%";
    localStorage.setItem('hero', JSON.stringify(hero));
}

function addXP(amount) {
    hero.xp += amount;
    if (hero.xp >= hero.lvl * 100) {
        hero.xp -= (hero.lvl * 100);
        hero.lvl++;
        alert("УРОВЕНЬ ПОВЫШЕН!");
    }
    updateHero();
}

// === КВЕСТЫ ===
document.getElementById('add-quest-btn').onclick = () => {
    const name = document.getElementById('quest-name').value;
    const xp = parseInt(document.getElementById('quest-diff').value);
    if (!name) return;

    const div = document.createElement('div');
    div.className = 'quest-item';
    div.innerHTML = `<span>${name} (+${xp})</span> <button onclick="finishQuest(this, ${xp})">⚔️</button>`;
    document.getElementById('active-quests').appendChild(div);
    document.getElementById('quest-name').value = '';
};

window.finishQuest = (btn, xp) => {
    addXP(xp);
    const item = btn.parentElement;
    item.querySelector('button').remove();
    document.getElementById('done-quests').appendChild(item);
};

// === КЛИКЕР ===
let clicks = 0, time = 30, tInterval;
document.getElementById('btn-click').onclick = () => {
    if (time <= 0) return;
    if (clicks === 0) tInterval = setInterval(() => {
        time--;
        document.getElementById('click-timer').innerText = time;
        if (time <= 0) clearInterval(tInterval);
    }, 1000);
    clicks++;
    document.getElementById('click-count').innerText = clicks;
};

// === ВЗЛОМ (УГАДАЙ ЧИСЛО) ===
let secret = Math.floor(Math.random() * 100) + 1;
document.getElementById('btn-guess').onclick = () => {
    const val = parseInt(document.getElementById('guess-in').value);
    const hint = document.getElementById('guess-hint');
    if (val === secret) hint.innerText = "ВЗЛОМАНО!";
    else hint.innerText = val > secret ? "МЕНЬШЕ" : "БОЛЬШЕ";
};

// === ЛАБИРИНТ ===
const maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,2,1],
    [1,1,1,1,1,1,1,1,1,1]
];
let px = 1, py = 1;

function drawMaze() {
    const grid = document.getElementById('maze-grid');
    grid.innerHTML = '';
    maze.forEach((row, y) => {
        row.forEach((v, x) => {
            const d = document.createElement('div');
            d.className = `m-cell ${v===1?'m-wall':v===2?'m-exit':'m-path'}`;
            if(x===px && y===py) d.classList.add('m-player');
            grid.appendChild(d);
        });
    });
}

window.onkeydown = (e) => {
    let nx = px, ny = py;
    if(e.key === 'ArrowUp') ny--;
    if(e.key === 'ArrowDown') ny++;
    if(e.key === 'ArrowLeft') nx--;
    if(e.key === 'ArrowRight') nx++;
    if(maze[ny][nx] !== 1) {
        px = nx; py = ny; drawMaze();
        if(maze[py][px] === 2) alert("ПОБЕДА!");
    }
};

// === ИНИЦИАЛИЗАЦИЯ ===
updateHero();
drawMaze();

// Печатная машинка
const txt = "Junior Frontend Developer | Quest Master";
let idx = 0;
function typing() {
    if (idx < txt.length) {
        document.getElementById('typewriter').innerHTML += txt.charAt(idx);
        idx++;
        setTimeout(typing, 100);
    }
}
typing();
