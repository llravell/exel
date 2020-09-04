export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, data) {
    if (!this.listeners[event]) return false;

    this.listeners[event]
        .forEach((listener) => listener(data));

    return true;
  }

  subscribe(event, fn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== fn);
    };
  }
}
