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
  cells = document.querySelectorAll('.cell'); 
  console.log(cells);
  resetShips();
}

function cellClicked(cell) {
  $(`#${cell}`).css('background-color', 'red');
  playingBoard[cell] = 'x';
  console.log(cell + ' clicked');
  console.log(playingBoard);
}

function resetShips() {
  for (let i = 1; i <= 3; i++) {
    $('#ship-area').append(`<div id="ship${i}" class="ships"></div>`);
    $(`#ship${i}`).draggable({
      grid: [ 50, 50 ],
      stop: function( event, ui ) {
        const top = ui.offset.top;
        const left = ui.offset.left
        for (var i in cells) {
          if (cells[i].offsetTop === top && cells[i].offsetLeft === left) {
            console.log(cells[i]);
          }
        }
      }
    });
  }
}