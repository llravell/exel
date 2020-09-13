import {DEFAULT_STYLES} from '@/constants';
import {toInlineStyles} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const MIN_COL_WIDTH = 120;
const MIN_ROW_HEIGHT = 24;

const getColWidth = (col, colState = {}) =>
  (colState[col] || MIN_COL_WIDTH) + 'px';

const getRowHeight = (row, rowState = {}) =>
  (rowState[row] || MIN_ROW_HEIGHT) + 'px';

const toCell = ({row, col, width, dataState, stylesState}) => {
  const id = `${row}:${col}`;
  const style = toInlineStyles({...DEFAULT_STYLES, ...stylesState[id]});

  return `
    <div
      class="cell"
      data-col="${col}"
      data-id="${id}"
      style="${style};width: ${width}"
      data-type="cell"
      data-value="${dataState[id] || ''}"
      contenteditable
    >${parse(dataState[id] || '')}</div>
  `;
};

const toColumn = ({col, name, width}) => `
  <div
    class="column"
    data-type="resizable"
    data-col="${col}"
    style="width: ${width}"
  >
    ${name}
    <div class="col-resize" data-resize="col"></div>
  </div>
`;

const createRow = ({content, row, height}) => {
  const resizer = row ? '<div class="row-resize" data-resize="row"></div>' : '';

  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${row}"
      style="height: ${height}"
    >
      <div class="row-info">
        ${row || ''}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export const createTable = (opts = {}) => {
  const {rowsCount = 25, state} = opts;
  const {colState = {}, rowState ={}, dataState = {}, stylesState} = state;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((char, idx) => toColumn({
        col: idx,
        name: char,
        width: getColWidth(idx, colState),
      }))
      .join('');

  rows.push(createRow({content: cols, height: getRowHeight()}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, idx) => toCell({
          row,
          col: idx,
          width: getColWidth(idx, colState),
          dataState,
          stylesState,
        }))
        .join('');

    rows.push(createRow({
      content: cells,
      row: row + 1,
      height: getRowHeight(row + 1, rowState),
    }));
  }

  return rows.join('');
};
