// Генератор приключений
function initAdventureGame(container) {
    const characters = ['рыцарь', 'маг', 'вор', 'эльф', 'гном', 'варвар', 'паладин', 'друид'];
    const locations = ['тёмный лес', 'заброшенный замок', 'подводное царство', 'горный перевал', 'пустыня', 'волшебный лес', 'подземелье', 'летающий остров'];
    const villains = ['дракон', 'колдун', 'гоблин', 'тёмный лорд', 'гидра', 'вампир', 'оборотень', 'злой маг'];
    
    let savedAdventures = JSON.parse(localStorage.getItem('adventures')) || [];
    
    const gameHTML = `
        <div class="adventure-generator">
            <div class="adventure-text" id="adventureText">
                Нажмите "Сгенерировать" чтобы создать приключение!
            </div>
            <div class="game-controls">
                <button class="btn-game" id="generateBtn">Сгенерировать</button>
                <button class="btn-game" id="saveBtn">Сохранить</button>
            </div>
            <div class="saved-adventures" id="savedAdventures">
                <h4>Сохранённые приключения:</h4>
                ${savedAdventures.map(adv => `<div class="saved-adventure-item">${adv}</div>`).join('') || 'Пока нет сохранённых приключений'}
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const adventureText = document.getElementById('adventureText');
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const savedDiv = document.getElementById('savedAdventures');
    
    let currentAdventure = '';
    
    function generateAdventure() {
        const character = characters[Math.floor(Math.random() * characters.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const villain = villains[Math.floor(Math.random() * villains.length)];
        
        currentAdventure = `Ваш персонаж — ${character} находится в ${location} и сражается с ${villain}.`;
        adventureText.textContent = currentAdventure;
        
        // Добавляем анимацию
        adventureText.style.animation = 'none';
        adventureText.offsetHeight;
        adventureText.style.animation = 'fadeIn 0.5s';
    }
    
    function saveAdventure() {
        if (!currentAdventure) {
            showNotification('Сначала сгенерируйте приключение!', 'error');
            return;
        }
        
        savedAdventures.push(currentAdventure);
        localStorage.setItem('adventures', JSON.stringify(savedAdventures));
        
        // Обновляем список
        savedDiv.innerHTML = `
            <h4>Сохранённые приключения:</h4>
            ${savedAdventures.map(adv => `<div class="saved-adventure-item">${adv}</div>`).join('')}
        `;
        
        showNotification('Приключение сохранено!', 'success');
    }
    
    generateBtn.addEventListener('click', generateAdventure);
    saveBtn.addEventListener('click', saveAdventure);
    
    // Генерируем первое приключение автоматически
    generateAdventure();
}
