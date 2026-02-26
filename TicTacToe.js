let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player1Name = "";
let player2Name = "";

const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const turnDisplay = document.getElementById("turnDisplay");

// Update player names
player1Input.addEventListener("input", () => {
    player1Name = player1Input.value || "Player 1";
    updateTurnDisplay();
});
player2Input.addEventListener("input", () => {
    player2Name = player2Input.value || "Player 2";
    updateTurnDisplay();
});

// Display current turn
function updateTurnDisplay() {
    const currentName = currentPlayer === "X" ? (player1Name || "Player 1") : (player2Name || "Player 2");
    turnDisplay.textContent = `Current Turn: ${currentName} (${currentPlayer})`;
}

// Add click event for each cell
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        makeMove(index, cell);
    });
});

// Make a move
function makeMove(index, cellElement) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        cellElement.textContent = currentPlayer;

        if (checkWinner()) {
            const winnerName = currentPlayer === "X" ? (player1Name || "Player 1") : (player2Name || "Player 2");
            setTimeout(() => alert(`${winnerName} wins!`), 100);
            resetBoard();
        } else if (boardFull()) {
            setTimeout(() => alert("It's a tie!"), 100);
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnDisplay();
        }
    }
}

// Check winner
function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern => {
        const [a,b,c] = pattern;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

// Check tie
function boardFull() {
    return board.every(cell => cell !== "");
}

// Reset the board
function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = "");
    updatet/urnDisplay();
}

// Reset button
resetBtn.addEventListener("click", resetBoard);

// Initialize turn display
updateTurnDisplay();