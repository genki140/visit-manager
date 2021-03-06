import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const typeName = 'counter';

export type CounterState = {
  count: number;
  loading: boolean;
  error: string;
};

export const initialState: CounterState = {
  count: 0,
  loading: false,
  error: '',
};

const sleep = (microSecond: number) =>
  new Promise((resolve) => setTimeout(resolve, microSecond));

export interface asyncIncrementCounterResult {
  value: number;
}

export const asyncIncrementCounter = createAsyncThunk<
  asyncIncrementCounterResult,
  number
>(
  typeName + '/asyncIncrementCounter',
  async (arg: number): Promise<asyncIncrementCounterResult> => {
    await sleep(1000);

    // エラーが起きた際の動きを確認する為、一定確率でエラーが起きるようにしてある
    const randNum = Math.floor(Math.random() * Math.floor(10));
    if (randNum === 0 || randNum === 5 || randNum === 1) {
      return Promise.reject(new Error('asyncIncrementCounter error'));
    }

    return { value: arg };
  },
);

const counterSlice = createSlice({
  name: typeName,
  initialState,
  reducers: {
    incrementCounter: (state, action) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decrementCounter: (state, action) => ({
      ...state,
      count: state.count - action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncrementCounter.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(asyncIncrementCounter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? '';
    });
    builder.addCase(asyncIncrementCounter.fulfilled, (state, action) => {
      state.count += action.payload.value;
      state.loading = false;
    });
  },
});
export default counterSlice;

export const useCounterState = () => {
  return useSelector((state: { counter: CounterState }) => state);
};
