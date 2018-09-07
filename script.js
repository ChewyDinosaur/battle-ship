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
  const board = [];
  for (let i = 1; i <= columnCount; i++) {
    let boardRow = [];
    $('#playing-board').append(`<div id="row${i}" class="row"></div>`);
    for (let j = 0; j < rowCount; j++) {
      const charCode = String.fromCharCode(65 + j);
      boardRow.push(`[${charCode}${i}, ${null}]`);
      $(`#row${i}`).append(`<div id="${charCode}${i}" class="cell"></div>`);
      $(`#${charCode}${i}`).click(function() {
        cellClicked(`${charCode}${i}`);
      });
    }
    board.push(boardRow);
  }
  console.log(board);
  playingBoard = board;
}

function cellClicked(cell) {
  $(`#${cell}`).css('background-color', 'red');
  console.log(cell + ' clicked');
}