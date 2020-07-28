import {DomListner} from '@core/DomListner';

export class ExcelComponent extends DomListner {
  constructor($root, options = {}) {
    super($root, options.listners);
    this.name = options.name || '';
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListners();
  }

  destroy() {
    this.removeDOMListners();
  }
}
