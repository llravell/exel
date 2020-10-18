import {ExcelComponent} from '@core/ExcelComponent';
import {ActiveRoute} from '@core/routes/activeRoute';
import {DEFAULT_TITLE} from '@/constants';
import {changeTitle} from '@/redux/actions';
import {createButtons} from './header.template';
import {$} from '@core/dom';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...opts,
    });
  }

  toHTML() {
    const title = this.$state.title || DEFAULT_TITLE;

    const buttons = [
      {icon: 'delete', action: 'delete'},
      {icon: 'exit_to_app', action: 'exit'},
    ];

    return `
    <input type="text" class="input" value="${title}">

    <div>
      ${createButtons(buttons)}
    </div>
    `;
  }

  onInput(e) {
    const {value} = e.target;
    this.$dispatch(changeTitle(value));
  }

  onClick(e) {
    const {type, action} = $(e.target).data;
    if (type !== 'button') return;

    switch (action) {
      case 'delete':
        this.deleteTable();
        break;
      case 'exit':
        this.exit();
        break;
    }
  }

  deleteTable() {
    const [id] = ActiveRoute.param;
    localStorage.removeItem(`excel:${id}`);

    this.exit();
  }

  exit() {
    ActiveRoute.push('dashboard');
  }
}
