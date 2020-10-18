import {storage} from '@core/utils';
import {DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month.toString().length === 1 ? '0' : ''}${month}.${year}`;
};

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentStyles: {...DEFAULT_STYLES},
  currentText: '',
  title: DEFAULT_TITLE,
};

export const getInitialState = (storageName) => ({
  ...defaultState,
  ...storage(storageName),

  currentText: '',
  currentStyles: {...DEFAULT_STYLES},
  date: formatDate(new Date()),
});
