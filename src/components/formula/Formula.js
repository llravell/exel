import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Formula',
      listners: ['input', 'keydown'],
      ...opts,
    });
  }

  init() {
    super.init();
    const formula = this.$root.find('#formula');

    this.$on('table:select-cell', text => {
      formula.text(text);
    });
    this.$on('table:input-cell', text => {
      formula.text(text);
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const codes = ['Enter', 'Tab'];
    if (!codes.includes(event.code)) return;

    event.preventDefault();
    this.$emit('formula:done');
  }
}
