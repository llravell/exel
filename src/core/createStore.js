export const createStore = (rootReducer, initialState = {}) => {
  let state = rootReducer(initialState, {type: '__INIT__'});
  let listeners = [];

  const subscribe = (fn) => {
    listeners = [...listeners, fn];

    return {
      unsubscribe: () => listeners.filter(l => l !== fn),
    };
  };

  const dispatch = (action) => {
    state = rootReducer(state, action);
    listeners.forEach((l) => l(state));
  };

  const getState = () => state;

  return {
    subscribe,
    dispatch,
    getState,
  };
};
