import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacknav from './src/navigation/Stacknav';
import { Provider } from 'react-redux';
import authstore from './src/redux/store/authstore';

const store=authstore();
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacknav />
      </NavigationContainer>
    </Provider>
  );
}
