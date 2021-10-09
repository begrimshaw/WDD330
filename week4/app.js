let playBoard = ["", "", "", "", "", "", "", "", ""];


//const board_container = document.querySelector(".play-area");

//Display "X" or "O" in Play_Board

//clear playboard on reset

//keep track of which player's turn it is

//touch even listner that connects to a block
const playArea = document.getElementById("play-area");
let turn = 0;

playArea.addEventListener('touchend', (event) => {
    let char = turn % 2 == 0 ? "X" : "O";

    //know what block it is in
    console.log(event.target.id);

    document.getElementById(event.target.id).innerHTML = char;
    let index = event.target.getAttribute('data-index');
    playBoard[index] = char;
    console.log(playBoard);
    turn++;


});

//reset
function resetBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`block_${i}`).innerHTML = '';
    }
} 

//game logic
function gameWon() {



}

