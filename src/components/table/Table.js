import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {onResize} from '@/components/table/table.resize';
import {parse} from '@core/parse';
import {
  shoodResize,
  isCell,
  getAllCellsInArea,
  nextSelector,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '../../redux/actions';
import {DEFAULT_STYLES} from '@/constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...opts,
    });
  }

  toHTML() {
    return createTable({state: this.$state});
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
  }

  init() {
    super.init();

    const $firstCell = this.$root.find('[data-id="0:0"]');
    this.selectCell($firstCell);

    this.$on('formula:input', (text) => {
      this.setCurrentText(text);
      this.selection.current
          .attr('data-value', text)
          .text(parse(text));
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select-cell', $cell.data.value);

    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.changeStyles(styles));
  }

  async tableResize(event) {
    const data = await onResize(event, this.$root);
    this.$dispatch(actions.tableResize(data));
  }

  onMousedown(event) {
    if (shoodResize(event)) this.tableResize(event);
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

  setCurrentText(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.data.id,
      value,
    }));
  }

  onInput(event) {
    if (!isCell(event)) return;
    this.setCurrentText($(event.target).text());
  }
}
