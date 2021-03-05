import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import counterSlice, { initialState as counterState } from '@/ducks/counter';

// refucer追加時ここに記入
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});

// refucer追加時ここに記入
const preloadedState = () => ({
  counter: counterState,
});

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

const store = createStore();

export default store;
