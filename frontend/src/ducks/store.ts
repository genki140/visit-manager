import { AsyncThunk, configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const MapEditType = {
  None: 'None',
  Residence: 'Residence',
  Room: 'Room',
  Outline: 'Outline',
} as const;
export type MapEditType = typeof MapEditType[keyof typeof MapEditType];

/** ストアの型 */
export type StoreState = {
  loading: boolean;
  // loginUser?: User;
  apolloClientRefreshCount?: number; // apolloClientリフレッシュさせるためのカウンター
  currentUserRefreshCount?: number; // currentUserをリフレッシュさせるためのカウンター
  loginLoaded: boolean;
  loginSrcRoute?: { pathname: string; query: any };
  areaList: {
    editing: boolean;
  };
  map: {
    selectedResidenceId?: number;
    selectedOutlineId?: number;
    selectedOutlinePointId?: number;
    editType: MapEditType;
  };
  editingResidenceId?: number;
};

/** ストアの初期値 */
const createStoreInitial = () => {
  const value: StoreState = {
    loading: false,
    loginLoaded: false,
    areaList: {
      editing: false,
    },
    map: {
      editType: MapEditType.None,
    },
  };
  return value;
};

export const storeName = 'store';

export interface asyncLoginProps {
  username: string;
  password: string;
}

export const asyncLogin = createAsyncThunk<void, asyncLoginProps>(
  storeName + '/asyncLogin',
  async (props: asyncLoginProps): Promise<void> => {
    await axios.post('/system/api/login', {
      username: props.username,
      password: props.password,
    });
  },
);

// export const asyncRefreshLoginUser = createAsyncThunk<void>(
//   storeName + '/asyncRefreshLoginUser',
//   async (): Promise<void> => {
//     await axios.post('/system/api/current-user');
//   },
// );

export const asyncLogout = createAsyncThunk(storeName + '/asyncLogout', async (): Promise<void> => {
  await axios.post('/system/api/logout');
});

// sliceの定義
export const storeSlice = createSlice({
  name: storeName,
  initialState: createStoreInitial(),
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // setLoginUser: (state, action: PayloadAction<User | undefined>) => {
    //   state.loginUser = action.payload;
    // },
    refreshLoginUser: (state) => {
      state.currentUserRefreshCount = (state.currentUserRefreshCount ?? 0) + 1;
    },
    setLoginSrcPath: (state, action: PayloadAction<{ pathname: string; query: any } | undefined>) => {
      state.loginSrcRoute = action.payload;
    },
    setSelectedResidenceId: (state, action: PayloadAction<{ residenceId: number | undefined }>) => {
      state.map.selectedResidenceId = action.payload.residenceId;
    },
    setSelectedOutlineId: (state, action: PayloadAction<{ outlineId: number | undefined }>) => {
      state.map.selectedOutlineId = action.payload.outlineId;
    },
    setSelectedOutlinePointId: (state, action: PayloadAction<{ pointId: number | undefined }>) => {
      state.map.selectedOutlinePointId = action.payload.pointId;
    },
    setMapEditType: (state, action: PayloadAction<{ editType: MapEditType }>) => {
      state.map.editType = action.payload.editType;
      state.map.selectedResidenceId = undefined;
      state.map.selectedOutlineId = undefined;
      state.map.selectedOutlinePointId = undefined;
    },
    setAreaListEditing: (state, action: PayloadAction<{ editing: boolean }>) => {
      state.areaList.editing = action.payload.editing;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state) => {
      // カレントユーザーを再読み込みさせる
      state.apolloClientRefreshCount = (state.apolloClientRefreshCount ?? 0) + 1;
      state.currentUserRefreshCount = (state.currentUserRefreshCount ?? 0) + 1;
    });

    // builder.addCase(asyncRefreshLoginUser.fulfilled, (state) => {
    //   // state.loginUser = action.payload;
    //   state.loginLoaded = true;
    // });
    // builder.addCase(asyncRefreshLoginUser.rejected, (state) => {
    //   state.loginLoaded = true;
    // });
    builder.addCase(asyncLogout.fulfilled, (state) => {
      // カレントユーザーを再読み込みさせる
      state.currentUserRefreshCount = (state.currentUserRefreshCount ?? 0) + 1;
      state.apolloClientRefreshCount = (state.apolloClientRefreshCount ?? 0) + 1;
      // state.loginUser = undefined;
    });

    // 非同期実行時は全体のLoading状態を自動調整します
    builder.addMatcher<PendingAction>(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher<RejectedAction>(
      (action) => action.type.endsWith('/rejected'),
      (state) => {
        state.loading = false;
      },
    );
    builder.addMatcher<FulfilledAction>(
      (action) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.loading = false;
      },
    );
  },
});
export const actions = storeSlice.actions;

// 非同期のDispatchを正しく型処理するためのuseAppDispatch
export type AppDispatch = typeof store.dispatch;
export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

// ストアを作成
export const store = configureStore({
  reducer: storeSlice.reducer,
  // chrome の redux ツールキットを使う前提であれば logger による console 出力はむしろ邪魔
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: createStoreInitial(),
});

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

// useヘルパー
export const useStoreState = <T>(getter: (state: StoreState) => T): T => useSelector<StoreState, T>(getter);
