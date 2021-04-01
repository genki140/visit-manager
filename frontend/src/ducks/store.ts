import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import counterSlice, { counterInitialState } from './counter';
import appSlice, { appInitialState } from './app';
import { useDispatch } from 'react-redux';

// refucer追加時ここに記入
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  app: appSlice.reducer,
});

// refucer追加時ここに記入
const initialState = () => ({
  counter: counterInitialState,
  app: appInitialState,
});

export type StoreState = ReturnType<typeof initialState>;
export type ReduxStore = Store<StoreState>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState(),
});

// 非同期のDispatchを正しく型処理するためのuseAppDispatch
export type AppDispatch = typeof store.dispatch;
export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default store;
