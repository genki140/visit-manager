// next
import { AppProps } from 'next/app';

// redux
import { Provider } from 'react-redux';

// apollo
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/react-hooks';

// material ui
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// project
import store from '@/ducks/store';
import theme from '@/styles/theme';
import React from 'react';

// const IS_BROWSER = !!process.browser;

// if (!IS_BROWSER) {
//   // SSRのために必要？
//   global.fetch = fetch;
// }

// const URI_ENDPOINT = 'http://localhost:3003/graphql';
// function createClient(initialState?: any) {
//   return new ApolloClient({
//     connectToDevTools: IS_BROWSER,
//     ssrMode: !IS_BROWSER,
//     link: new HttpLink({
//       uri: URI_ENDPOINT, // Server URL (must be absolute)
//       credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//     }),
//     cache: new InMemoryCache().restore(initialState || {}),
//   });
// }
// const client = createClient();

const client = new ApolloClient({
  uri: 'http://localhost:3003/graphql',
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
