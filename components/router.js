import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './auth/Login';
import Main from './main/main';

/*
  const Screen = LoginPage.getScreen();
  return Router;
*/
const Router = StackNavigator({
    Login: {screen: Login},
    Main : {screen: Main},
  },
  {
  }
);
export default Router

