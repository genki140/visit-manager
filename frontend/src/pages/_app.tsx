// next
import { AppProps } from 'next/app';

// redux
import { Provider } from 'react-redux';

// apollo
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// material ui
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// project
import { store } from '@/ducks/store';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

const client = new ApolloClient({
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

  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <CssBaseline />
          <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY ?? ''} onLoad={() => setMapApiLoaded(true)}>
            {mapApiLoaded && <props.Component router={props.router} {...props.pageProps} />}
          </LoadScript>
        </Provider>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};
export default App;
