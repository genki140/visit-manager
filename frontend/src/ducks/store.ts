import { AsyncThunk, configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const MapEditType = {
  Residence: 'Residence',
  Room: 'Room',
  Polygon: 'Polygon',
} as const;
export type MapEditType = typeof MapEditType[keyof typeof MapEditType];

/** ストアの型 */
export type StoreState = {
  loading: boolean;
  map: {
    position: {
      lat: number;
      lng: number;
    };
    zoom: number;
    selectedResidenceId?: number;
    selectedPolygonId?: number;
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
    map: {
      position: {
        lat: 0,
        lng: 0,
      },
      zoom: 0,
      editType: MapEditType.Residence,
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
export interface asyncLoginResult {
  token: string;
}

export const asyncLogin = createAsyncThunk<asyncLoginResult, asyncLoginProps>(
  storeName + '/asyncLogin',
  async (props: asyncLoginProps): Promise<asyncLoginResult> => {
    const result = await axios.post<{ access_token: string }>('/api/login', {
      username: props.username,
      password: props.password,
    });
    return { token: result.data.access_token };
  },
);

// sliceの定義
export const storeSlice = createSlice({
  name: storeName,
  initialState: createStoreInitial(),
  reducers: {
    setMapPosition: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.map.position.lat = action.payload.lat;
      state.map.position.lng = action.payload.lng;
    },
    setMapZoom: (state, action: PayloadAction<{ zoom: number }>) => {
      state.map.zoom = action.payload.zoom;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedResidenceId: (state, action: PayloadAction<number | undefined>) => {
      state.map.selectedResidenceId = action.payload;
    },
    setMapEditType: (state, action: PayloadAction<{ editType: MapEditType }>) => {
      state.map.editType = action.payload.editType;
      if (action.payload.editType === MapEditType.Residence) {
        state.map.selectedResidenceId = undefined;
      }
    },
  },
  extraReducers: (builder) => {
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
