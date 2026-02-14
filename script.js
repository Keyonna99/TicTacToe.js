const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const WINNING_COMBOS =[
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonal
];

statusText.TextContent = "Player X's turn";

function handleCellClick(e) {
    const index = e.target.dataset.index;

     // X stop invalid clicks 
     if (board[index] !== "" || !isGameActive) return;

     // place current player's symbol
     board[index] = currentPlayer;
     e.target.textContent = currentPlayer;

     // check win
     if (checkWinner()) {
        statusText.textContent = ' Player ${currentPlayer} wins!';
        isGameActive = false;
        return;
     }
     // check draw
     if (!board.includes("")){
        statusText.textContent = "It's a draw!";
        isGAmeActive = false;
        return;
     }

// switch player
currentPlayer = currentPlayer == "X"? "O" : "X";
statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function checkWinner() {
    return WINNING_COMBOS.some(combo =>
        combo.every(i => board[i] == currentPlayer)
    );
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGAmeActive = true;
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cellClicked.textContent ="";
    });
    }

cells.forEach(cell => 
    cell.addEventListener("click", handleCellClick)
);
restartBtn.addEventListener("click", restartGame);
