import { createMuiTheme } from '@material-ui/core';
export const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none', // 大文字にしない
    },
    h1: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 17,
      fontWeight: 'bold',
    },
  },

  palette: {
    // type: 'dark',
    // primary: '#5b3c88',
    // primary: {
    //   main: '#aaaaaa',
    //   light: '#ffffff',
    //   dark: '#000000',
    //   // dark: '#002884',
    //   // contrastText: '#fff',
    // },
    // primary: {
    //   // light: '#757ce8',
    //   main: '#5b3c88',
    //   // dark: '#002884',
    //   // contrastText: '#fff',
    // },
    // secondary: {
    //   light: '#ff7961',
    //   main: '#f44336',
    //   dark: '#ba000d',
    //   contrastText: '#000',
    // },
    // contrastThreshold: 0.1,
    // tonalOffset: 0.2,
    // background: {
    //   default: '#e4f0e2',
    // },
    // type: 'dark',
  },

  // palette: {
  //   // background: {
  //   //   default: '#EEEEEE',
  //   // },
  //   type: 'dark',
  // },
});

// 5b3c88

// 型の拡張
// https://qiita.com/tachibanayu24/items/b93537fced5c17f3d42d
