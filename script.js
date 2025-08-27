const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restartButton');

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
let currentPlayer
let cellContents = ['', '', '', '', '', '', '', '', ''];
startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);

}

function cellClicked() {
    const index = this.getAttribute('cellIndex');

    if (cellContents[index] != '' || !isPlaying) {
        return;
    }
    updateCell(this, index);
    checkWinner;


}

function updateCell(cell, index) {


}

function checkWinner() {

}

function restartGame() {

}