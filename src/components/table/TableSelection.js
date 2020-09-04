export class TableSelection {
  static className = 'selected';

  constructor($table) {
    this.$table = $table;
    this.selected = [];
    this.current = null;
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
}
