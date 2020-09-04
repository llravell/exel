const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (row) => (_, col) => `
  <div
    class="cell"
    data-col="${col}"
    data-id="${row}:${col}"
    data-type="cell"
    contenteditable
  ></div>
`;

const toColumn = (col, index) =>
  `<div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;

const createRow = (content, idx) => {
  const resizer = idx ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `<div class="row" data-type="resizable">
      <div class="row-info">
        ${idx || ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export const createTable = (rowsCount = 25) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');

    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
};
