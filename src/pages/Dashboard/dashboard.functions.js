import {storage} from '@core/utils';

const toHTML = (key) => {
  const {title, date} = storage(key);
  console.log(date.to);
  const [, id] = key.split(':');

  return `
    <li class="db__record">
      <a href="#excel/${id}">${title}</a>
      <strong>${date}</strong>
    </li>
  `;
};

const getAllKeys = () => new Array(localStorage.length)
    .fill()
    .map((_, idx) => localStorage.key(idx))
    .filter((key) => key.includes('excel'));

export const createRecordsTable = () => {
  const keys = getAllKeys();
  if (!keys.length) return `<p>Empty</p>`;

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
};
