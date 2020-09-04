import {DomListner} from '@core/DomListner';

export class ExcelComponent extends DomListner {
  constructor($root, options = {}) {
    super($root, options.listners);
    this.name = options.name || '';
    this.emitter = options.emitter;

    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emit(event, data) {
    return this.emitter.emit(event, data);
  }

  $on(event, fn) {
    const unsubscribe = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsubscribe);
  }

  init() {
    this.initDOMListners();
  }

  destroy() {
    this.removeDOMListners();
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }
}
