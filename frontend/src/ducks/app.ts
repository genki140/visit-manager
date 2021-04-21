export const app_dummy = 1;
// // アプリケーション全体のステートを管理します。

// import { DoubleArrow } from '@material-ui/icons';
// import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const typeName = 'app';

// export type AppState = {
//   loading: boolean;
//   // auth: {
//   //   token: string; // 非ログイン時空欄
//   // };

//   map: {
//     position: {
//       lat: number;
//       lng: number;
//     };
//   };
// };

// export const appInitialState: AppState = {
//   loading: false,
//   // auth: {
//   //   token: '', //とりあえずここに入れる。本当はクッキーとかに入れるべき
//   // },

//   map: {
//     position: {
//       lat: 0,
//       lng: 0,
//     },
//   },
// };

// // asyncLogin

// export interface asyncLoginProps {
//   username: string;
//   password: string;
// }
// export interface asyncLoginResult {
//   token: string;
// }

// export const asyncLogin = createAsyncThunk<asyncLoginResult, asyncLoginProps>(
//   typeName + '/asyncLogin',
//   async (props: asyncLoginProps): Promise<asyncLoginResult> => {
//     const result = await axios.post<{ access_token: string }>('/api/login', {
//       username: props.username,
//       password: props.password,
//     });
//     return { token: result.data.access_token };
//   },
// );

// // create slice

// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
// type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
// type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
// type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

// const appSlice = createSlice({
//   name: typeName,
//   initialState: appInitialState,
//   reducers: {
//     // setLoading: (state, action: PayloadAction<boolean>) => {
//     //   state.loading = action.payload;
//     // },

//     setMapPosition: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
//       state.map.position.lat = action.payload.lat;
//       state.map.position.lng = action.payload.lng;
//     },
//   },

//   extraReducers: (builder) => {
//     // // ログイン成功時トークンを保存します
//     // builder.addCase(asyncLogin.fulfilled, (state, action) => {
//     //   state.auth.token = action.payload.token;
//     // });

//     // 非同期実行時Loading状態を自動調整します
//     builder.addMatcher<PendingAction>(
//       (action) => action.type.endsWith('/pending'),
//       (state) => {
//         state.loading = true;
//       },
//     );
//     builder.addMatcher<RejectedAction>(
//       (action) => action.type.endsWith('/rejected'),
//       (state) => {
//         state.loading = false;
//       },
//     );
//     builder.addMatcher<FulfilledAction>(
//       (action) => action.type.endsWith('/fulfilled'),
//       (state) => {
//         state.loading = false;
//       },
//     );
//   },
// });
// export default appSlice;

// export const useAppState = () => useSelector((state: { app: AppState }) => state);
