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
