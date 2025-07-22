const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let options = ["", "","","","","","","",""];
let currentPlayer = 'X';
let running = false;

function gameOverMusic(){
  const gameOverMusic = document.getElementById('gameOverMusic');
  gameOverMusic.play();
}
function gameOverMusicDraw(){
  const gameOverMusicDraw = document.getElementById('gameOverMusicDraw');
  gameOverMusicDraw.play();
}
function popSound(){
  const popSound = document.getElementById('popSound');
  popSound.play();
}

function POPSOUND(){
  const tickSound = document.getElementById('POPSOUND');
  tickSound.play();
}

function startGame(){
  running = true;
cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);
statusText.textContent = `${currentPlayer}'s turn!` 
}
function cellClicked(){
const cellIndex = this.getAttribute('cellIndex');
if( options[cellIndex] != "" || !running){
return;
} 
UpdateCell(this, cellIndex);
checkWinner();
if(running){
  changePlayer();
}
popSound();
}

function UpdateCell(cell,index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer(){
currentPlayer = currentPlayer =="X" ? "O" : "X"
statusText.textContent = `${currentPlayer}'s turn!`
}

function checkWinner(){
let roundWon = false;
 
    for(let i = 0; i < winConditions.length; i++){

       const condition = winConditions[i]
       const cellA = options[condition[0]]
       const cellB = options[condition[1]]
       const cellC = options[condition[2]]


    if(cellA === '' || cellB === '' || cellC ===""){
      continue;
    }
    if(cellA === cellB && cellB === cellC){
      roundWon = true;
        break;
    }
}
if(roundWon){
cells.forEach(cell =>cell.classList.add('cellChangeColor'));
  statusText.textContent =   `${currentPlayer} wins!`
  statusText.classList.add('winText');
  running = false;
  gameOverMusic();
} else if(!options.includes('')){
cells.forEach(cell =>cell.classList.add('drawColor'))
  statusText.textContent =   `Draw!`
   gameOverMusicDraw();
  running = false;
}
}
function restartGame(){
  
  currentPlayer = 'X'
  options = ["", "","","","","","","",""];
  statusText.textContent = `${currentPlayer}'s turn!`
  cells.forEach(cell => cell.textContent = '')
  cells.forEach(cell =>cell.classList.remove('drawColor'));
  cells.forEach(cell =>cell.classList.remove('cellChangeColor'));
  running=true;
}
startGame();
  let notMute = document.getElementById('notMute')
  let isMuted = false;
  notMute.addEventListener('click', () => {
    isMuted = !isMuted;
    notMute.src = isMuted ? 'Muted.png' : 'Unmuted.png';
  notMute.src.includes('Muted.png')
     document.querySelectorAll('audio').forEach(audio => {
      audio.muted = isMuted;
    });
  })