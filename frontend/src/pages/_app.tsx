import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from '@/ducks/store';
import theme from '@/styles/theme';

// エントリポイント。スタイルとストアの適用を行っている。
const MyApp: React.FC<AppProps> = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <props.Component router={props.router} {...props.pageProps} />
      </Provider>
    </MuiThemeProvider>
  );
};
export default MyApp;
