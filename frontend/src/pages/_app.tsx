// next
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// redux
import { Provider } from 'react-redux';

// apollo
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/react-hooks';

// material ui
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// project
import store from '@/ducks/store';
import theme from '@/styles/theme';
import React from 'react';

const client = new ApolloClient({
  uri: process.env.SITE_URL + ((process.env.SITE_PORT ?? '') === '' ? '' : ':' + process.env.SITE_PORT) + '/graphql',
  cache: new InMemoryCache(),
});

// エントリポイント。スタイルとストアの適用を行っている。
const App: React.FC<AppProps> = (props) => {
  React.useEffect(() => {
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
          <props.Component router={props.router} {...props.pageProps} />
        </Provider>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};
export default App;
