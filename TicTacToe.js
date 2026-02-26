document.addEventListener("DOMContentLoaded", function () {

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const turnDisplay = document.getElementById("turnDisplay");

function updateTurnDisplay() {
    turnDisplay.textContent = "Current Turn: " + currentPlayer;
}

cells.forEach(cell => {
    cell.addEventListener("click", function () {
        const index = cell.getAttribute("data-index");

        if (board[index] === "") {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnDisplay();
        }
    });
});

resetBtn.addEventListener("click", function () {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    updateTurnDisplay();
});

updateTurnDisplay();

});