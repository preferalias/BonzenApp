import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';
import Account from './ThirdScreen';

const AccountStack = StackNavigator({
    Account : {screen: Account },
},
{
    navigationOptions: {
        headerTintColor : 'white',
        headerStyle : {backgroundColor : '#3498db', marginTop: Platform.OS !== 'ios' ? 20 : 0,},
    },
}
);
export default AccountStack ;