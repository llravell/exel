import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {onResize} from '@/components/table/table.resize';
import {
  shoodResize,
  isCell,
  getAllCellsInArea,
  nextSelector,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Table',
      listners: ['mousedown', 'keydown', 'input'],
      ...opts,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
  }

  init() {
    super.init();

    const $firstCell = this.$root.find('[data-id="0:0"]');
    this.selectCell($firstCell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select-cell', $cell.text());
  }

  onMousedown(event) {
    if (shoodResize(event)) onResize(event, this.$root);
    if (isCell(event)) {
      const $selectedCell = $(event.target);
      this.selectCell($selectedCell);

      document.onmousemove = (e) => {
        if (!isCell(e) || e.target === event.target) return;

        const $currentCell = $(e.target);
        const cells = getAllCellsInArea(
            $selectedCell.id,
            $currentCell.id
        );
        const $cells = cells
            .map((cell) => this.$root.find(`[data-id="${cell}"]`));

        this.selection.selectGroup($cells);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }

  onKeydown(event) {
    const codes = [
      'ArrowLeft',
      'ArrowUp',
      'Enter',
      'ArrowDown',
      'Tab',
      'ArrowRight',
    ];

    const {code, shiftKey} = event;
    if (!codes.includes(code) || shiftKey) return;
    event.preventDefault();

    const [row, col] = this.selection.current.id.split(':').map(Number);
    const next = nextSelector(code, {col, row});
    if (!next) return;

    const $next = this.$root.find(next);
    if (!$next.$el) return;

    this.selectCell($next);
  }

  onInput(event) {
    if (!isCell(event)) return;
    this.$emit('table:input-cell', event.target.textContent);
  }
}
