// next
import { AppProps } from 'next/app';

// redux
import { Provider } from 'react-redux';

// apollo
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// material ui
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/global.css';

// project
import { store } from '@/ducks/store';
import { theme } from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { LocaleProvider } from '@/components/locale-provider';
import { LoginUserProvider } from '@/components/login-user-provider';

const client = new ApolloClient({
  // クライアントからアクセスできるURLであること
  uri: process.env.SITE_URL + (process.env.SITE_PORT == null ? '' : ':' + process.env.SITE_PORT) + '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Polygon: {
        fields: {
          points: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Area: {
        fields: {
          polygons: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
          residences: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

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
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </MuiThemeProvider>
  );
};
export default App;
