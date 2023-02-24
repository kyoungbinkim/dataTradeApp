import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { initTradeContract } from './src/core/web3';

import initStore from './src/store/store';
import Layout from './src/Layout';

initTradeContract();

const store = initStore();

const APP = () => {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default APP;