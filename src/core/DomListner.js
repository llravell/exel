import {capitalize} from '@core/utils';

export class DomListner {
  constructor($root, listeners = [], name) {
    if (!$root) {
      throw new Error('No $root provided forDomListner');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listner => {
      const method = getMethodName(listner);
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listner, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listner => {
      const method = getMethodName(listner);
      this.$root.off(listner, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
