import { Provider } from 'react-redux';
import App from 'next/app';
import store from '@/ducks/store';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Provider store={store}>
        <Component router={router} {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
