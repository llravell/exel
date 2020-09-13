import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, opts = {}) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...opts,
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select-cell', text => {
      this.$formula.text(text);
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
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
