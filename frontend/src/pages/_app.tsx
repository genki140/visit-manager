// next
import { AppProps } from 'next/app';

// redux
import { Provider } from 'react-redux';

// material ui
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/global.css';

// project
import { store } from '@/ducks/store';
import { theme } from '@/styles/theme';
import React, { useEffect } from 'react';
import { LocaleProvider } from '@/components/environments/locale-provider';
import { LoginUserProvider } from '@/components/environments/login-user-provider';
import { ApolloClientProvider } from '@/components/environments/apollo-client-provider';
import { GoogleMapProvider } from '@/components/environments/google-map-provider';

// エントリポイント。スタイルとストアの適用を行っている。
const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement != null) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <SafeHydrate>
          <ApolloClientProvider>
            <LoginUserProvider>
              <LocaleProvider>
                <GoogleMapProvider>
                  {() => <props.Component router={props.router} {...props.pageProps} />}
                </GoogleMapProvider>
              </LocaleProvider>
            </LoginUserProvider>
          </ApolloClientProvider>
        </SafeHydrate>
      </Provider>
    </MuiThemeProvider>
  );
};
export default App;

// このコンポーネント以降はサーバーサイドではレンダリングされない
function SafeHydrate(props: { children: any }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : props.children}</div>;
}
