import { User } from '@/types/graphql';
import { AsyncThunk, configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// export const AreaListEditType = {
//   None: 'None',
// } as const;
// export type AreaListEditType = typeof AreaListEditType[keyof typeof AreaListEditType];

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
  loginUser?: User;
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
  // residences: {
  //   test: number;
  // }[];
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
    // residences: [],
  };
  return value;
};

export const storeName = 'store';

export interface asyncLoginProps {
  username: string;
  password: string;
}
// export interface asyncLoginResult {
//   token: string;
// }

export const asyncLogin = createAsyncThunk<User, asyncLoginProps>(
  storeName + '/asyncLogin',
  async (props: asyncLoginProps): Promise<User> => {
    const result = await axios.post<User>('/system/api/login', {
      username: props.username,
      password: props.password,
    });
    return result.data;
  },
);

export const asyncRefreshLoginUser = createAsyncThunk<User>(
  storeName + '/asyncRefreshLoginUser',
  async (): Promise<User> => {
    const result = await axios.post<User>('/system/api/current-user');
    return result.data;
  },
);

export const asyncLogout = createAsyncThunk(storeName + '/asyncLogout', async (): Promise<void> => {
  await axios.post('/system/api/logout');
});

// sliceの定義
export const storeSlice = createSlice({
  name: storeName,
  initialState: createStoreInitial(),
  reducers: {
    // setMapPosition: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
    //   state.map.position.lat = action.payload.lat;
    //   state.map.position.lng = action.payload.lng;
    // },
    // setMapZoom: (state, action: PayloadAction<{ zoom: number }>) => {
    //   state.map.zoom = action.payload.zoom;
    // },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoginUser: (state, action: PayloadAction<User | undefined>) => {
      state.loginUser = action.payload;
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
      // if (action.payload.editType === MapEditType.Residence) {
      //   state.map.selectedResidenceId = undefined;
      // }
    },
    setAreaListEditing: (state, action: PayloadAction<{ editing: boolean }>) => {
      state.areaList.editing = action.payload.editing;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncRefreshLoginUser.fulfilled, (state, action) => {
      state.loginUser = action.payload;
      state.loginLoaded = true;
    });
    builder.addCase(asyncRefreshLoginUser.rejected, (state) => {
      state.loginLoaded = true;
    });
    builder.addCase(asyncLogout.fulfilled, (state) => {
      state.loginUser = undefined;
    });

    // 非同期実行時Loading状態を自動調整します
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

// export type StoreState = ReturnType<typeof createStoreInitial>;
// export type ReduxStore = Store<StoreState>;

// useヘルパー
export const useStoreState = <T>(getter: (state: StoreState) => T): T => useSelector<StoreState, T>(getter);

// 使い方
// const loading = useStoreState((x) => x.loading);

// export function useSelector<TState = DefaultRootState, TSelected = unknown>(
//   selector: (state: TState) => TSelected,
//   equalityFn?: (left: TSelected, right: TSelected) => boolean
// ): TSelected;
