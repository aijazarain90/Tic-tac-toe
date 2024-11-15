const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const resultModal = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameOver = false;

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // If cell is already filled or game is over, do nothing
    if (board[index] || isGameOver) return;

    // Update board and UI
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for winner
    if (checkWinner()) {
        showResult(`Player ${currentPlayer} wins! 🎉`);
        isGameOver = true;
        return;
    }

    // Check for draw
    if (board.every(cell => cell !== null)) {
        showResult("It's a draw!");
        isGameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to show result in modal
function showResult(message) {
    resultMessage.textContent = message;
    resultModal.style.display = 'flex';
}

// Function to reset the game
function resetGame() {
    board.fill(null);
    isGameOver = false;
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => (cell.textContent = ''));
}

// Function to start a new game
function newGame() {
    resetGame();
    resultModal.style.display = 'none';
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);

// Initialize game status
statusText.textContent = "Player X's turn";
