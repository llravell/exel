export class TableSelection {
  static className = 'selected';

  constructor($table) {
    this.$table = $table;
    this.selected = [];
    this.current = null;
  }

  get selectedIds() {
    return this.selected.map(($el) => $el.data.id);
  }

  select($cell) {
    this.clear();

    this.selected = [$cell];
    this.current = $cell;
    $cell.focus().addClass(TableSelection.className);
  }

  selectGroup($cells) {
    this.clear();

    this.selected = $cells;
    $cells.forEach(($cell) => $cell.addClass(TableSelection.className));
  }

  clear() {
    this.selected.forEach(($c) => $c.removeClass(TableSelection.className));
    this.selected = [];
  }

  applyStyle(style) {
    this.selected.forEach($el => $el.css(style));
  }
}
