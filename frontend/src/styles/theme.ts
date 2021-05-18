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

  // palette: {
  //   // background: {
  //   //   default: '#EEEEEE',
  //   // },
  //   type: 'dark',
  // },
});
