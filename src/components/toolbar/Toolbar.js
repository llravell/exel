import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '@core/dom';
import {DEFAULT_STYLES} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...opts,
    });
  }

  prepare() {
    this.initState({...DEFAULT_STYLES});
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles);
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.data.type !== 'button') return;

    const value = JSON.parse($target.data.value);
    this.$emit('toolbar:applyStyle', value);
    this.setState(value);
  }
}
