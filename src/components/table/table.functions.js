import {range} from '@core/utils';

const shoodResize = (e) => !!e.target.dataset.resize;

const isCell = (e) => e.target.dataset.type === 'cell';

const getAllCellsInArea = (start, end) => {
  const [startRow, startCol] = start.split(':').map(Number);
  const [endRow, endCol] = end.split(':').map(Number);

  return range(startRow, endRow).flatMap((row) => {
    return range(startCol, endCol).map((col) => `${row}:${col}`);
  });
};

const nextSelector = (key, {col, row}) => {
  switch (key) {
    case 'ArrowLeft':
      col--;
      break;
    case 'ArrowUp':
      row--;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;

    default: return null;
  }

  return `[data-id="${row}:${col}"]`;
};

export {shoodResize, isCell, getAllCellsInArea, nextSelector};
