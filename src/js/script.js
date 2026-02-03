// --- RPG Система ---
let hero = JSON.parse(localStorage.getItem('heroData')) || {
    lvl: 1,
    xp: 0,
    nextLvlXp: 100
};

function updateHeroUI() {
    document.getElementById('char-level').innerText = hero.lvl;
    document.getElementById('current-xp').innerText = hero.xp;
    document.getElementById('needed-xp').innerText = hero.nextLvlXp;
    
    const percent = (hero.xp / hero.nextLvlXp) * 100;
    document.getElementById('xp-bar-fill').style.width = percent + "%";
    
    localStorage.setItem('heroData', JSON.stringify(hero));
}

function addTask() {
    const title = document.getElementById('task-input').value;
    const xp = parseInt(document.getElementById('task-difficulty').value);
    
    if(!title) return alert("Введите название квеста!");

    const list = document.getElementById('task-list');
    const li = document.createElement('div');
    li.className = 'task-item';
    li.innerHTML = `
        <span><b>${title}</b> (+${xp} XP)</span>
        <button onclick="completeTask(${xp}, this)">Завершить ⚔️</button>
    `;
    list.appendChild(li);
    document.getElementById('task-input').value = "";
}

function completeTask(xpGain, element) {
    hero.xp += xpGain;
    
    // Проверка уровня
    if (hero.xp >= hero.nextLvlXp) {
        hero.xp -= hero.nextLvlXp;
        hero.lvl++;
        hero.nextLvlXp = hero.lvl * 100;
        alert("🎉 УРОВЕНЬ ПОВЫШЕН! Теперь вы " + hero.lvl + " уровня!");
    }
    
    element.parentElement.remove();
    updateHeroUI();
}

// --- Мини-игра: Угадай число ---
let secretNum = Math.floor(Math.random() * 100) + 1;
function guessNumber() {
    const userNum = parseInt(prompt("Угадай число от 1 до 100:"));
    if (userNum === secretNum) {
        alert("Победа! Это было " + secretNum);
        secretNum = Math.floor(Math.random() * 100) + 1;
    } else {
        alert(userNum > secretNum ? "Меньше!" : "Больше!");
    }
}

// Запуск при загрузке
window.onload = updateHeroUI;
