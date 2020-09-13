import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLES,
  CHANGE_TITLE,
} from './types';

export const rootReducer = (state, action) => {
  const {type, data} = action;

  switch (type) {
    case TABLE_RESIZE:
      const {id, value, type: resizeType} = data;
      const map = {
        col: () => ({colState: {...state.colState, [id]: value}}),
        row: () => ({rowState: {...state.rowState, [id]: value}}),
      };

      return {...state, ...map[resizeType] && map[resizeType]()};

    case CHANGE_TEXT:
      return {
        ...state,
        currentText: data.value,
        dataState: {...state.dataState, [data.id]: data.value},
      };

    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: data,
      };

    case APPLY_STYLES:
      const newStyles = data.ids.reduce((acc, id) => {
        const oldVal = state.stylesState[id];
        return {...acc, [id]: {...oldVal, ...data.value}};
      }, {});

      return {
        ...state,
        stylesState: {...state.stylesState, ...newStyles},
        currentStyles: {...state.currentStyles, ...data.value},
      };

    case CHANGE_TITLE:
      return {...state, title: data};
    default: return state;
  }
};
