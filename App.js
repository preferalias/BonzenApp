import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation' ;

import Router from './components/router';

export default class App extends React.Component {
  render() {
    return (
      <Router />
    );
  }
}