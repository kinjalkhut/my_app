/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import AppNavigator from './src/navigation'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/redux/store'

export default function App() {

  return (
    <StoreProvider store={store}>
      <AppNavigator />
    </StoreProvider>
  )
}
