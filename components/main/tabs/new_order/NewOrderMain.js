import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import NewOrder from './NewOrder';
import UpdateStatus from './UpdateStatus';

const NewOrderStack = StackNavigator({
    NewOrder : {screen: NewOrder},
    UpdateStatus : {screen: UpdateStatus},
},
{
    navigationOptions : {
        headerStyle: {backgroundColor: '#3498db', marginTop: Platform.OS !== 'ios' ? 22 : 0,},
        headerLeft: null,
        headerTintColor : '#FFF',
        tabBarIcon : ({tintColor}) => (<Icon name="playlist-add" size={30} color={tintColor} />),
    }
}
);
export default NewOrderStack;