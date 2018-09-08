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
    const ship = `#ship${i}`;
    $('#ship-area').append(`<div id="ship${i}" class="ships"></div>`);
    $(`${ship}`).draggable({
      grid: [ 50, 50 ],
      stop: function( event, ui ) {
        const top = ui.offset.top;
        const left = ui.offset.left;
        detectCellsUnderShips(ship, top, left);
      }
    }).click(function() {
      $(this).toggleClass('rotated');
      const top = $(ship).offset().top;
      const left = $(ship).offset().left;
      detectCellsUnderShips(ship, top, left);
    });
  }
}

function detectCellsUnderShips(ship, top, left) {
  const shipSize = ship.slice(-1);
  // const top = top;
  // const left = left;
  let coords = [[top, left]];

  for (var i = 1; i <= shipSize; i++) {
    // If ships are vertical
    if ($(ship).hasClass('rotated')) {
      coords.push([top + (50 * i), left]);
    } else {
    // If ships are horizontal
      coords.push([top, left + (50 * i)]);
    }
  }
  let overlappingCells = [];
  for (var j of coords) {
    for (var k in cells) {
      if (j[0] === cells[k].offsetTop && j[1] === cells[k].offsetLeft) {
        overlappingCells.push(cells[k].id);
      }
    }
  }
  console.log(overlappingCells);
}