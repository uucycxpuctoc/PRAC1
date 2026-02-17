// Лабиринт
class MazeGame {
    constructor() {
        this.maze = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,0,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,1,0,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,1,1,0,1,1,1,0,1,1],
            [1,0,0,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,1,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];
        
        this.playerPos = { x: 1, y: 1 };
        this.exitPos = { x: 8, y: 8 };
        this.gameActive = false;
        this.timeLeft = 60;
        this.timerInterval = null;
    }

    init(mazeId, timerId, statusId) {
        this.mazeElement = document.getElementById(mazeId);
        this.timerElement = document.getElementById(timerId);
        this.statusElement = document.getElementById(statusId);
        
        this.render();
        this.setupControls();
    }

    render() {
        this.mazeElement.innerHTML = '';
        
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                
                if (this.maze[y][x] === 1) {
                    cell.classList.add('wall');
                }
                
                if (x === this.playerPos.x && y === this.playerPos.y) {
                    cell.classList.add('player');
                }
                
                if (x === this.exitPos.x && y === this.exitPos.y) {
                    cell.classList.add('exit');
                }
                
                this.mazeElement.appendChild(cell);
            }
        }
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameActive) return;
            
            const key = e.key;
            let newX = this.playerPos.x;
            let newY = this.playerPos.y;
            
            switch(key) {
                case 'ArrowUp': newY--; break;
                case 'ArrowDown': newY++; break;
                case 'ArrowLeft': newX--; break;
                case 'ArrowRight': newX++; break;
                default: return;
            }
            
            // Проверяем, можно ли туда пойти
            if (this.maze[newY] && this.maze[newY][newX] === 0) {
                this.playerPos.x = newX;
                this.playerPos.y = newY;
                this.render();
                
                // Проверяем, дошел ли до выхода
                if (newX === this.exitPos.x && newY === this.exitPos.y) {
                    this.win();
                }
            }
        });
    }

    start() {
        this.gameActive = true;
        this.statusElement.textContent = 'Игра началась! Ищите выход 🧭';
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft + 'с';
            
            if (this.timeLeft <= 0) {
                this.gameActive = false;
                clearInterval(this.timerInterval);
                this.statusElement.textContent = 'Время вышло! Вы проиграли 💀';
                alert('Время вышло! Попробуйте снова.');
            }
        }, 1000);
    }

    win() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        const timeSpent = 60 - this.timeLeft;
        this.statusElement.textContent = `Победа! Вы нашли выход за ${timeSpent} секунд! 🎉`;
        alert(`Поздравляю! Вы прошли лабиринт за ${timeSpent} секунд!`);
    }

    reset() {
        this.playerPos = { x: 1, y: 1 };
        this.gameActive = false;
        this.timeLeft = 60;
        
        clearInterval(this.timerInterval);
        
        this.render();
        this.timerElement.textContent = '60с';
        this.statusElement.textContent = 'Нажмите "Старт" чтобы начать';
    }
}
