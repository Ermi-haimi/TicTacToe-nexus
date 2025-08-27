const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restartButton');
const gameStatus = document.querySelector('.game-status');
const scoreElm = document.querySelector('.score');

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

let score = {
    'X': 0,
    'O': 0,
    'tie': 0
};

startGame();

function startGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    isPlaying = true;
    gameStatus.textContent = `${currentPlayer}'s Turn`;
    updateScore();

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
            document.querySelector(`[cellIndex='${pattern[0]}']`).classList.add("winning-line");
            document.querySelector(`[cellIndex='${pattern[1]}']`).classList.add("winning-line");
            document.querySelector(`[cellIndex='${pattern[2]}']`).classList.add("winning-line");
            break;
        }
    }

    if (haveAWinner) {
        gameStatus.classList.add('winner');
        isPlaying = false;
        gameStatus.textContent = `${currentPlayer} Won`;
        score[currentPlayer] = score[currentPlayer] + 1;
        updateScore();
    } else if (!cellContents.includes('')) {
        isPlaying = false;
        gameStatus.textContent = `It is a tie`;
        score['tie'] = score['tie'] + 1;
        updateScore();
    } else {
        changePlayer();
    }

}

function restartGame() {
    cellContents = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-line')
    });
    gameStatus.textContent = `${currentPlayer}'s Turn`;
    gameStatus.classList.remove('winner');
    isPlaying = true;
}

function updateScore() {
    scoreElm.innerHTML = `<p>X : ${score.X} </p>  <p> O : ${score.O} </p> <p>Tie : ${score.tie}</p>`;
}