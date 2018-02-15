import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './auth/Login';
import Contact from './main/contact';
import Staff from './main/staff';
/*
  const Screen = LoginPage.getScreen();
  return Router;
*/
const Router = StackNavigator({
    //Login: {screen: Login},
    Contact : {screen: Contact},
    Staff : {screen: Staff},
  },
  {
  }
);
export default Router

