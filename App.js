import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import initStore from './src/store/store';
import Layout from './src/Layout';

const store = initStore();

const APP = () => {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default APP;