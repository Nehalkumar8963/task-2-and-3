const gridElement = document.getElementById('sudoku-grid');

// Create 81 input fields for Sudoku
for (let i = 0; i < 81; i++) {
  const cell = document.createElement('input');
  cell.type = 'text';
  cell.maxLength = 1;
  cell.oninput = function() {
    this.value = this.value.replace(/[^1-9]/g, '');
  };
  gridElement.appendChild(cell);
}

function getGrid() {
  const cells = Array.from(document.querySelectorAll('.sudoku-grid input'));
  let grid = [];
  for (let r = 0; r < 9; r++) {
    let row = [];
    for (let c = 0; c < 9; c++) {
      const value = cells[r * 9 + c].value;
      row.push(value === '' ? 0 : parseInt(value));
    }
    grid.push(row);
  }
  return grid;
}

function setGrid(grid) {
  const cells = Array.from(document.querySelectorAll('.sudoku-grid input'));
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      cells[r * 9 + c].value = grid[r][c] === 0 ? '' : grid[r][c];
    }
  }
}

function isValid(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  let grid = getGrid();
  if (solve(grid)) {
    setGrid(grid);
    alert('✅ Sudoku Solved!');
  } else {
    alert('❌ No solution found.');
  }
}

function clearGrid() {
  const cells = document.querySelectorAll('.sudoku-grid input');
  cells.forEach(cell => cell.value = '');
}
