document.addEventListener("DOMContentLoaded", function () {

    // Board and players
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player1Name = "Player 1"; 
let player2Name = "Player 2";
let gameActive = false;

 // DOM elements
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const turnDisplay = document.getElementById("turnDisplay");
const startBtn = document.getElementById("start-game");
const playerNamesDiv = document.getElementById("player-names");

// Start game after entering names
startBtn.addEventListener("click", () => {
        const p1 = document.getElementById("player1").value.trim();
        const p2 = document.getElementById("player2").value.trim();

        if (p1) player1Name = p1;
        if (p2) player2Name = p2;

        playerNamesDiv.style.display = "none"; // Hide name inputs
        gameActive = true;
        updateTurnDisplay();
    });

    // Reset game
    resetBtn.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = false;
        playerNamesDiv.style.display = "block"; // Show name inputs again
        turnDisplay.textContent = "Current Turn: " + currentPlayer;
    });
// Update whose turn it is
    function updateTurnDisplay() {
        if (!gameActive) {
            turnDisplay.textContent = "Enter player names to start";
            return;
        }

        if (currentPlayer === "X") {
            turnDisplay.textContent = `${player1Name}'s Turn (X)`;
        } else {
            turnDisplay.textContent = `${player2Name}'s Turn (O)`;
        }
    }

    // Handle cell clicks
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = cell.getAttribute("data-index");

            if (!gameActive || board[index] !== "") return;

            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            // Check for win
            if (checkWin()) {
                turnDisplay.textContent = `${currentPlayer === "X" ? player1Name : player2Name} Wins!`;
                gameActive = false;
                return;
            }

            // Check for draw
            if (!board.includes("")) {
                turnDisplay.textContent = "It's a Draw!";
                gameActive = false;
                return;
            }

            // Switch player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnDisplay();
        });
    });

    // Win checking
    function checkWin() {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6]           // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    // Initial message
    updateTurnDisplay();

});

