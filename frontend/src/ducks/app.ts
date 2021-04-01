// アプリケーション全体のステートを管理します。

import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

const typeName = 'app';

export type AppState = {
  isLoading: boolean;
  auth: {
    token: string; // 非ログイン時空欄
  };
};

export const appInitialState: AppState = {
  isLoading: false,
  auth: {
    token: '',
  },
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const appSlice = createSlice({
  name: typeName,
  initialState: appInitialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  // 非同期実行時Loading状態を自動調整します
  extraReducers: (builder) => {
    builder.addMatcher<PendingAction>(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true;
      },
    );
    builder.addMatcher<RejectedAction>(
      (action) => action.type.endsWith('/rejected'),
      (state) => {
        state.isLoading = false;
      },
    );
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.isLoading = false;
      },
    );
  },
});
export default appSlice;

export const useAppState = () => useSelector((state: { app: AppState }) => state);

// asyncLogin

export interface asyncLoginProps {
  username: string;
  password: string;
}
export interface asyncLoginResult {
  token: string;
}

export const asyncLogin = createAsyncThunk<asyncLoginResult, asyncLoginProps>(
  typeName + '/asyncLogin',
  async (props: asyncLoginProps): Promise<asyncLoginResult> => {
    const result = await axios.post<{ access_token: string }>('/api/login', {
      username: props.username,
      password: props.password,
    });
    return { token: result.data.access_token };
  },
);
