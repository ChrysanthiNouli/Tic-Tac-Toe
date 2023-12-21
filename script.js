let form1 = document.getElementById("name1");
let form2 = document.getElementById("name2");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

function helpFunction1() {
  player1.name = form1.value;
}

function helpFunction2() {
  player2.name = form2.value;
}

btn1.addEventListener("click", helpFunction1);
btn2.addEventListener("click", helpFunction2);

function restart () {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player1;
  cells.forEach(cell => cell.textContent = "");
  form1.value = "";
  form2.value = "";
  player1.name = "";
  player2.name = "";
  eventCreator();
}

let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restart);


// ----------------------------Step 1---------------------------
// Create the board with 9 cells

let board = ["", "", "", "", "", "", "", "", ""];

// create the  players Object

function Player(marker, name) {
  this.name = name;
  this.marker = marker;
};

const player1 = new Player("X", "");
const player2 = new Player("O", "");

// The current player, starts with "X"
// let currentPlayer = ??

let currentPlayer = player1; 

// ----------------------------Step 2---------------------------
let drawMessage = "It' s a draw!";

// Function to handle a player's move

function handleMove(cellIndex) {

// Check if the clicked cell is already occupied

if (board[cellIndex] !== "") {
 	return;
}

// Mark the cell with the current player's marker

else {
  board[cellIndex] = currentPlayer.marker;
}

// Update the display of the board

cells[cellIndex].textContent = currentPlayer.marker;

// Check for a winning combination

let winner = true;
if (checkWin()) {
  winner = true;
} else {
  winner = false;
}

// Check if the board is full (game ends in a tie)

let check = true;
for (let i = 0; i < board.length; i ++) {
  if (board[i] !== "") {
    check = true;
  } else {
    check = false;
    break;
  } 
} if (check == true && winner == false) {
    alert (drawMessage);
  return;
}  

// Switch the turn to the next player

if (currentPlayer == player1) {
  currentPlayer = player2;
} else if (currentPlayer == player2) {
  currentPlayer = player1;
}
}

// --------------------------------Step 3-------------------------
// Function to render the board array on the screen

function renderBoard() {
// Your code here
}

// --------------------------------Step 4-------------------------
// Function to check for a winning combination

function checkWin() {   
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal combinations
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical combinations
    [0, 4, 8],
    [2, 4, 6], // Diagonal combinations
  ];
  
  for(let i = 0; i < winningCombinations.length; i++){
    let combination = winningCombinations[i];
    let element1 = board[combination[0]];
    let element2 = board[combination[1]];
    let element3 = board[combination[2]];

    if (element1 == element2 && element2 == element3 && element1 !== "") {
      alert("The winner is " + currentPlayer.name);
      endGame("Game over! Press Restart.");
      return true;
    } 
  };
};

// --------------------------------Step 5-------------------------
// Function to end the game
 
function endGame(message) {
  cells.forEach ((cell) => {
    cell.removeEventListener("click", cellClickHandler);
    })
  alert(message);
};

// Add event listeners to the cells (click event for each cell)

const cells = document.querySelectorAll(".cell");

function eventCreator () {
  cells.forEach ((cell) => {
    cell.addEventListener("click", cellClickHandler);
  }
  );
}

//--------------- Do not change this code ------------------

// Event handler for cell clicks

function cellClickHandler() {
  const cellIndex = parseInt(this.dataset.index);
  handleMove(cellIndex);
}

// Render the initial board

renderBoard();
