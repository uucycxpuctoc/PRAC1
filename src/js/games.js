// Главный файл для инициализации всех игр
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация игры на скорость реакции
    if (document.getElementById('reaction-area')) {
        window.reactionGame = new ReactionGame();
        window.reactionGame.init('reaction-area', 'reaction-score', 'reaction-timer', 'reaction-avg');
    }
    
    // Инициализация крестиков-ноликов
    if (document.getElementById('board')) {
        window.tictactoe = new TicTacToe();
        window.tictactoe.init('board', 'game-status', 'x-score', 'o-score');
    }
    
    // Инициализация лабиринта
    if (document.getElementById('maze-grid')) {
        window.maze = new MazeGame();
        window.maze.init('maze-grid', 'maze-timer', 'maze-status');
    }
});

// Функции для игры на скорость реакции
function startReactionGame() {
    if (window.reactionGame) {
        window.reactionGame.start();
    }
}

function resetReactionGame() {
    if (window.reactionGame) {
        window.reactionGame.reset();
    }
}

// Функции для крестиков-ноликов
function setGameMode(mode) {
    if (window.tictactoe) {
        window.tictactoe.setMode(mode);
    }
}

function resetTicTacToe() {
    if (window.tictactoe) {
        window.tictactoe.reset();
    }
}

function resetScores() {
    if (window.tictactoe) {
        window.tictactoe.resetScores();
    }
}

// Функции для лабиринта
function startMaze() {
    if (window.maze) {
        window.maze.start();
    }
}

function resetMaze() {
    if (window.maze) {
        window.maze.reset();
    }
}
