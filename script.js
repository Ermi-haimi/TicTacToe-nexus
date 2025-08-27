const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restartButton');
const gameStatus = document.querySelector('.game-status');

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let isPlaying = false;
let currentPlayer = 'X';
let cellContents = ['', '', '', '', '', '', '', '', ''];
startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    isPlaying = true;
    gameStatus.textContent = `${currentPlayer}'s Turn`;

}

function cellClicked() {
    const index = this.getAttribute('cellIndex');

    if (cellContents[index] != '' || !isPlaying) {
        return;
    }
    updateCell(this, index);
    checkWinner();
}

function updateCell(cell, index) {
    cell.textContent = currentPlayer;
    cellContents[index] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    let haveAWinner = false;
    for (let i = 0; i < winningPatterns.length; i++) {
        const pattern = winningPatterns[i];

        if (cellContents[pattern[0]] === '' || cellContents[pattern[1]] === '' || cellContents[pattern[2]] === '') {
            continue;
        }
        if (cellContents[pattern[0]] === cellContents[pattern[1]] && cellContents[pattern[1]] === cellContents[pattern[2]]) {
            haveAWinner = true;
            break;
        }
    }

    if (haveAWinner) {
        isPlaying = false;
        gameStatus.textContent = `${currentPlayer} Won`;
    } else if (!cellContents.includes('')) {
        isPlaying = false;
        gameStatus.textContent = `It is a tie`;

    } else {
        changePlayer();
    }

}

function restartGame() {

}