import React from 'react';
import { Provider } from 'mobx-react';
import type { AppProps } from 'next/app';
import { createStores } from '../stores';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const { stores } = createStores(pageProps.initialState);
  return (
    <Provider {...stores}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
