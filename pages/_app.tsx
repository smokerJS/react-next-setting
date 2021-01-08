import React from 'react';
import { Provider } from 'mobx-react';
import type { AppProps } from 'next/app';
import { useStore } from '../stores';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialState);
  return (
    <Provider {...store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
