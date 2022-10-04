let box = document.querySelector(".container");
console.log(box);

let gameStatus = document.querySelector(".game-status");

let game = true
let currentPlayer = "X"
let currentTurn = () => `${currentPlayer} Turn`
gameStatus.innerHTML = currentTurn()
let winMessage = () => `${currentPlayer} has won!`
let drawMessage = () => `It's a Draw!`
let gameBoard = ["", "", "", "", "", "", "", "", ""]

let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

document.querySelectorAll(`.cell`).forEach((cell) => cell.addEventListener("click", handleCellClick))

function handleCellClick(e) {
  let clickedCell = e.target
  let cellIndex = parseInt(clickedCell.dataset.cell)
  console.log(cellIndex);
  if (gameBoard[cellIndex] !== "" || !game) {
    return
  }
  handleCellPlayed(clickedCell, cellIndex)
  handleGameResult()
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  gameStatus.innerHTML = currentTurn()
}

function handleGameResult() {
  let roundWin = false
  for (let i = 0; i < winningConditions.length; i++) {
    let win = winningConditions[i]
    let a = gameBoard[win[0]]
    let b = gameBoard[win[1]]
    let c = gameBoard[win[2]]
    console.log(a,b,c);
    if (a === "" || b === "" || c === "") {
      continue
    }
    if (a === b && b === c) {
      roundWin = true
      break
    }
  }
  if (roundWin) {
    gameStatus.innerText = winMessage()
    game = false
    console.log(winMessage());
    console.log(gameStatus.innerText);
  }
  let gameDraw = !gameBoard.includes("")
  if (gameDraw) {
    game = false
    gameStatus.innerHTML = drawMessage()
    console.log("It's a Draw!");
  }
  changePlayer()
}

function handleCellPlayed(clickedCell, cellIndex) {
  gameBoard[cellIndex] = currentPlayer
  clickedCell.innerHTML = currentPlayer
}

document.querySelector(".reset").addEventListener("click", resetClick)

function resetClick() {
  game = true
  currentPlayer = "X"
  gameBoard = ["", "", "", "", "", "", "", "", ""]
  gameStatus.innerHTML = currentTurn()
  document.querySelectorAll(`.cell`).forEach((cell) => (cell.innerHTML = ""))
}

