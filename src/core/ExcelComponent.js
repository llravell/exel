import {DomListner} from '@core/DomListner';

export class ExcelComponent extends DomListner {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];

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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  get $state() {
    return this.store.getState();
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }
}
