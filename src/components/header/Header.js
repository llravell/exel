import {ExcelComponent} from '@core/ExcelComponent';
import {DEFAULT_TITLE} from '@/constants';
import {changeTitle} from '@/redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...opts,
    });
  }

  toHTML() {
    const title = this.$state.title || DEFAULT_TITLE;

    return `
    <input type="text" class="input" value="${title}">

    <div>
      <div class="button">
        <span class="material-icons">
          delete
        </span>
      </div>
      <div class="button">
        <span class="material-icons">
          exit_to_app
        </span>
      </div>
    </div>
    `;
  }

  onInput(e) {
    const {value} = e.target;
    this.$dispatch(changeTitle(value));
  }
}
