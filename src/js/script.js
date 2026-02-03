// Эффект печати
const roles = ["Frontend Разработчик", "UI/UX Дизайнер", "Студент TOU"];
let roleIdx = 0;
let charIdx = 0;
const roleSpeed = 100;

function typeEffect() {
    const target = document.getElementById("role");
    if (!target) return;
    
    if (charIdx < roles[roleIdx].length) {
        target.textContent += roles[roleIdx].charAt(charIdx);
        charIdx++;
        setTimeout(typeEffect, roleSpeed);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    const target = document.getElementById("role");
    if (charIdx > 0) {
        target.textContent = roles[roleIdx].substring(0, charIdx - 1);
        charIdx--;
        setTimeout(eraseEffect, 50);
    } else {
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

// RPG Логика
let hero = JSON.parse(localStorage.getItem('hero_v2')) || { lvl: 1, xp: 0, next: 100 };

function updateUI() {
    document.getElementById('char-lvl').textContent = hero.lvl;
    document.getElementById('xp-text').textContent = `${hero.xp} / ${hero.next} XP`;
    document.getElementById('xp-fill').style.width = (hero.xp / hero.next * 100) + "%";
    localStorage.setItem('hero_v2', JSON.stringify(hero));
}

function addTask() {
    const nameInput = document.getElementById('task-name');
    const name = nameInput.value;
    const xp = parseInt(document.getElementById('task-diff').value);
    
    if (!name.trim()) return;

    const list = document.getElementById('task-list');
    const item = document.createElement('div');
    item.className = 'quest-item';
    item.innerHTML = `
        <div class="task-info">
            <span style="display:block; font-weight:bold;">⚔️ ${name}</span>
            <small style="color:var(--accent)">Награда: +${xp} XP</small>
        </div>
        <button class="finish-btn" onclick="finishTask(${xp}, this)">Выполнить</button>
    `;
    list.prepend(item);
    nameInput.value = "";
}

function finishTask(xp, btn) {
    hero.xp += xp;
    
    // Эффект перехода уровня
    if (hero.xp >= hero.next) {
        hero.xp -= hero.next;
        hero.lvl++;
        hero.next = hero.lvl * 100;
        // Можно добавить эффект вспышки
    }

    // Плавное удаление элемента
    const item = btn.parentElement;
    item.style.transition = "0.3s";
    item.style.opacity = "0";
    item.style.transform = "scale(0.9)";
    
    setTimeout(() => {
        item.remove();
        updateUI();
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    updateUI();
    typeEffect();
});
