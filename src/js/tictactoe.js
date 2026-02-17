// Крестики-нолики
class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.mode = 'two-player'; // 'two-player' или 'vs-computer'
        this.scores = { X: 0, O: 0 };
    }

    init(boardId, statusId, xScoreId, oScoreId) {
        this.boardElement = document.getElementById(boardId);
        this.statusElement = document.getElementById(statusId);
        this.xScoreElement = document.getElementById(xScoreId);
        this.oScoreElement = document.getElementById(oScoreId);
        
        this.render();
        this.updateStatus();
    }

    render() {
        this.boardElement.innerHTML = '';
        this.board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            if (cell) cellElement.classList.add('disabled');
            cellElement.textContent = cell;
            cellElement.onclick = () => this.handleMove(index);
            this.boardElement.appendChild(cellElement);
        });
    }

    handleMove(index) {
        if (!this.gameActive) return;
        if (this.board[index] !== '') return;
        if (this.mode === 'vs-computer' && this.currentPlayer === 'O') return;

        this.makeMove(index);

        if (this.mode === 'vs-computer' && this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.computerMove(), 500);
        }
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        
        if (this.checkWin()) {
            this.gameActive = false;
            this.scores[this.currentPlayer]++;
            this.updateScores();
            this.highlightWinners();
            this.statusElement.textContent = `Игрок ${this.currentPlayer} победил!`;
        } else if (this.board.every(cell => cell !== '')) {
            this.gameActive = false;
            this.statusElement.textContent = 'Ничья!';
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
        
        this.render();
    }

    computerMove() {
        if (!this.gameActive) return;
        
        // Простой AI: случайный ход
        const emptyCells = this.board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(randomIndex);
        }
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    highlightWinners() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                document.querySelectorAll('.cell')[a].classList.add('win');
                document.querySelectorAll('.cell')[b].classList.add('win');
                document.querySelectorAll('.cell')[c].classList.add('win');
            }
        });
    }

    updateStatus() {
        this.statusElement.textContent = `Ход игрока ${this.currentPlayer}`;
    }

    updateScores() {
        this.xScoreElement.textContent = this.scores.X;
        this.oScoreElement.textContent = this.scores.O;
    }

    setMode(mode) {
        this.mode = mode;
        this.reset();
        
        // Подсветка активной кнопки
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`${mode}-btn`).classList.add('active');
    }

    reset() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.render();
        this.updateStatus();
    }

    resetScores() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
    }
}
