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
import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { LocaleProvider } from '@/components/environments/locale-provider';
import { LoginUserProvider } from '@/components/environments/login-user-provider';
import { ApolloClientProvider } from '@/components/environments/apollo-client-provider';

// エントリポイント。スタイルとストアの適用を行っている。
const App: React.FC<AppProps> = (props) => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement != null) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // const SafeHydrate = dynamic(() => import('../components/SafeHydrate'), { ssr: false });
  // console.log('app:render');

  return (
    <MuiThemeProvider theme={theme}>
      <ApolloClientProvider>
        <Provider store={store}>
          <CssBaseline />
          <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY ?? ''} onLoad={() => setMapApiLoaded(true)}>
            {mapApiLoaded && (
              <LoginUserProvider>
                <LocaleProvider>
                  <props.Component router={props.router} {...props.pageProps} />
                </LocaleProvider>
              </LoginUserProvider>
            )}
          </LoadScript>
        </Provider>
      </ApolloClientProvider>
    </MuiThemeProvider>
  );
};
export default App;
