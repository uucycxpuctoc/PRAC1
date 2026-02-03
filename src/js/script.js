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

// RPG Логика (с обновленным дизайном)
let hero = JSON.parse(localStorage.getItem('hero_v2')) || { lvl: 1, xp: 0, next: 100 };

function updateUI() {
    document.getElementById('char-lvl').textContent = hero.lvl;
    document.getElementById('xp-text').textContent = `${hero.xp} / ${hero.next}`;
    document.getElementById('xp-fill').style.width = (hero.xp / hero.next * 100) + "%";
    localStorage.setItem('hero_v2', JSON.stringify(hero));
}

function addTask() {
    const name = document.getElementById('task-name').value;
    const xp = parseInt(document.getElementById('task-diff').value);
    if (!name) return;

    const list = document.getElementById('task-list');
    const item = document.createElement('div');
    item.className = 'quest-item';
    item.innerHTML = `
        <span>⚔️ ${name} (+${xp} XP)</span>
        <button onclick="finishTask(${xp}, this)" style="background:none; color:var(--gold); border:1px solid var(--gold); border-radius:5px; cursor:pointer;">Завершить</button>
    `;
    list.appendChild(item);
    document.getElementById('task-name').value = "";
}

function finishTask(xp, btn) {
    hero.xp += xp;
    if (hero.xp >= hero.next) {
        hero.xp -= hero.next;
        hero.lvl++;
        hero.next = hero.lvl * 100;
        alert("💥 LEVEL UP! Ваш уровень: " + hero.lvl);
    }
    btn.parentElement.remove();
    updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
    updateUI();
    typeEffect();
});
