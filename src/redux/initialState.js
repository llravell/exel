import {storage} from '@core/utils';
import {DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentStyles: {...DEFAULT_STYLES},
  currentText: '',
  title: DEFAULT_TITLE,
};

export const initialState = {
  ...defaultState,
  ...storage('excel-state'),

  currentText: '',
  currentStyles: {...DEFAULT_STYLES},
};
