// --- 1. Анимация ролей (Typewriter) ---
const roles = ["Frontend разработчик", "UI дизайнер", "Студент TOU"];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.getElementById("role");

function type() {
    if (charIndex < roles[roleIndex].length) {
        roleElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", type);

// --- 2. RPG Система (Практика 4) ---
let character = JSON.parse(localStorage.getItem('rpg_char')) || {
    level: 1,
    xp: 0,
    neededXp: 100
};

function updateUI() {
    document.getElementById('char-level').textContent = character.level;
    document.getElementById('current-xp').textContent = character.xp;
    document.getElementById('needed-xp').textContent = character.neededXp;
    const progress = (character.xp / character.neededXp) * 100;
    document.getElementById('xp-bar-fill').style.width = progress + "%";
    localStorage.setItem('rpg_char', JSON.stringify(character));
}

function addTask() {
    const input = document.getElementById('task-input');
    const diff = document.getElementById('task-difficulty');
    if (!input.value) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${input.value} (+${diff.value} XP)</span>
        <button onclick="completeTask(${diff.value}, this)">✅ Выполнить</button>
    `;
    document.getElementById('task-list').appendChild(li);
    input.value = "";
}

function completeTask(xpGain, btn) {
    character.xp += xpGain;
    if (character.xp >= character.neededXp) {
        character.xp -= character.neededXp;
        character.level++;
        character.neededXp = character.level * 100;
        alert("LEVEL UP! Теперь вы уровень " + character.level);
    }
    btn.parentElement.remove();
    updateUI();
}

// --- 3. Управление Мини-играми (Практика 2 & 3) ---
function openGame(gameType) {
    const modal = document.getElementById('game-modal');
    const container = document.getElementById('game-container');
    modal.style.display = "block";
    
    if(gameType === 'clicker') {
        container.innerHTML = `
            <h3>Кликер</h3>
            <p>Счет: <span id="score">0</span></p>
            <button class="btn-main" onclick="let s = document.getElementById('score'); s.innerText = parseInt(s.innerText)+1">Клик!</button>
        `;
    }
    // Здесь добавляются остальные игры по аналогии
}

function closeModal() {
    document.getElementById('game-modal').style.display = "none";
}

updateUI(); // Инициализация при загрузке
