// Игра на скорость реакции
class ReactionGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.reactionTimes = [];
        this.timeoutId = null;
        this.startTime = null;
        this.timerInterval = null;
    }

    init(areaId, scoreId, timerId, avgTimeId) {
        this.area = document.getElementById(areaId);
        this.scoreElement = document.getElementById(scoreId);
        this.timerElement = document.getElementById(timerId);
        this.avgTimeElement = document.getElementById(avgTimeId);
        
        this.createButton();
        this.showWaitingMessage();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'reaction-btn';
        this.button.textContent = 'КЛИК!';
        this.button.style.display = 'none';
        this.button.onclick = () => this.handleClick();
        this.area.appendChild(this.button);
    }

    showWaitingMessage() {
        this.waitingMessage = document.createElement('div');
        this.waitingMessage.className = 'waiting-message';
        this.waitingMessage.textContent = 'Ожидание...';
        this.area.appendChild(this.waitingMessage);
    }

    start() {
        if (this.gameActive) return;
        
        this.score = 0;
        this.timeLeft = 30;
        this.reactionTimes = [];
        this.gameActive = true;
        
        this.updateScore();
        this.updateTimer();
        this.hideWaitingMessage();
        
        // Запускаем таймер
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.end();
            }
        }, 1000);
        
        // Запускаем появление кнопки
        this.scheduleNextAppearance();
    }

    scheduleNextAppearance() {
        if (!this.gameActive) return;
        
        const delay = Math.random() * 4000 + 1000; // 1-5 секунд
        
        this.timeoutId = setTimeout(() => {
            this.showButton();
        }, delay);
    }

    showButton() {
        if (!this.gameActive) return;
        
        // Случайная позиция (с учетом размеров кнопки)
        const maxX = this.area.clientWidth - 200;
        const maxY = this.area.clientHeight - 100;
        const x = Math.random() * maxX + 100;
        const y = Math.random() * maxY + 50;
        
        this.button.style.left = x + 'px';
        this.button.style.top = y + 'px';
        this.button.style.display = 'block';
        
        // Засекаем время
        this.startTime = Date.now();
        
        // Меняем цвет
        const hue = Math.random() * 360;
        this.button.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
        this.button.style.color = '#0f0f0f';
    }

    handleClick() {
        if (!this.gameActive || !this.startTime) return;
        
        // Считаем время реакции
        const reactionTime = Date.now() - this.startTime;
        this.reactionTimes.push(reactionTime);
        
        // Увеличиваем счет
        this.score++;
        this.updateScore();
        
        // Прячем кнопку
        this.button.style.display = 'none';
        this.startTime = null;
        
        // Планируем следующее появление
        this.scheduleNextAppearance();
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        
        // Считаем среднее время
        if (this.reactionTimes.length > 0) {
            const avg = this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length;
            this.avgTimeElement.textContent = avg.toFixed(0) + 'мс';
        }
    }

    updateTimer() {
        this.timerElement.textContent = this.timeLeft + 'с';
    }

    hideWaitingMessage() {
        if (this.waitingMessage) {
            this.waitingMessage.style.display = 'none';
        }
    }

    end() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        clearTimeout(this.timeoutId);
        
        this.button.style.display = 'none';
        this.waitingMessage.style.display = 'block';
        this.waitingMessage.textContent = `Игра окончена! Счёт: ${this.score}`;
        
        // Подсчитываем статистику
        const avgTime = this.reactionTimes.length > 0 
            ? (this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length).toFixed(0)
            : 0;
            
        alert(`Игра окончена!\nУспешных нажатий: ${this.score}\nСреднее время реакции: ${avgTime}мс`);
    }

    reset() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        clearTimeout(this.timeoutId);
        
        this.score = 0;
        this.timeLeft = 30;
        this.reactionTimes = [];
        
        this.updateScore();
        this.updateTimer();
        
        this.button.style.display = 'none';
        this.waitingMessage.style.display = 'block';
        this.waitingMessage.textContent = 'Ожидание...';
    }
}
