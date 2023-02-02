import process from 'process';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import './shim.js';
import Config from './src/core/utils/config';
import initStore from './src/store/store';
import Layout from './src/Layout';

Config.homePath = process.cwd() + '/';
const store = initStore();

const APP = () => {
  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

export default APP;