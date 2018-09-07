const smallBoard = [5, 5];
const regularBoard = [10, 10];
const largeBoard = [20, 20];
let playingBoard = null;
let cells = null;


$('#create-board').click(function() {
  generateBoard(regularBoard);
});

function generateBoard(boardSize) {
  const rowCount = boardSize[0];
  const columnCount = boardSize[1]; // 65
  const board = {};
  for (let i = 1; i <= columnCount; i++) {
    $('#playing-board').append(`<div id="row${i}" class="row"></div>`);
    for (let j = 0; j < rowCount; j++) {
      const charCode = String.fromCharCode(65 + j);
      // Add cell id to the board object, setting its value to null
      board[`${charCode}${i}`] = null;
      // Add cell div to the DOM
      $(`#row${i}`).append(`<div id="${charCode}${i}" class="cell"></div>`);
      // Add onclick handler to each cell
      $(`#${charCode}${i}`).click(function() {
        cellClicked(`${charCode}${i}`);
      });
    }
  }
  console.log(board);
  playingBoard = board;
}

function cellClicked(cell) {
  $(`#${cell}`).css('background-color', 'red');
  console.log(cell + ' clicked');
}