export const capitalize = (string) => {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const range = (a, b) => {
  const start = Math.min(a, b);
  const end = Math.max(a, b);

  return new Array(end - start + 1)
      .fill('')
      .map((_, idx) => start + idx);
};

export const storage = (key, data = null) => data
  ? localStorage.setItem(key, JSON.stringify(data))
  : JSON.parse(localStorage.getItem(key));

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return Object.keys(a).every((key) => isEqual(a[key], b[key]));
  }

  return a === b;
};

export const camelToDash = str => str
    .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

export const toInlineStyles = (styles = {}) => Object
    .entries(styles)
    .map(([key, val]) => `${camelToDash(key)}: ${val}`)
    .join(';');

export const debounce = (fn, wait = 0) => {
  let timeout;

  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
