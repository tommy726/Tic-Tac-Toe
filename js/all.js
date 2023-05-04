const checkerboard = document.querySelector('.checkerboard');
const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.gameStatus');
const restartBtn = document.querySelector('.restartBtn');

let currentPlayer = 'O';
let gameOver = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  if (gameOver || cell.textContent !== '') return;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    gameOver = true;
    gameStatus.textContent = `Player ${currentPlayer} win!`;
    return;
  } else if (checkDraw()) {
    gameOver = true;
    gameStatus.textContent = `Draw!`;
    return;
  }
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  gameStatus.textContent = `Turn : ${currentPlayer}`;
}

function checkWin() {
  //透過 array.some 將所有勝利的情況，帶入 array.every 中檢查是否為同一位 player
  return winningConditions.some(condition => condition.every(index => cells[index].textContent === currentPlayer));
}

function checkDraw() {
  return [...cells].every( cell => cell.textContent !== '' );
}

function restartGame() {
  cells.forEach((e) => e.textContent = '');
  currentPlayer = 'O';
  gameStatus.textContent = 'Turn : O';
  gameOver = false;
}

checkerboard.addEventListener('click', handleCellClick, false);
restartBtn.addEventListener('click', restartGame, false);
