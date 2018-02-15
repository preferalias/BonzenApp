import React, {Component} from 'react';
import { Platform, View , Text} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import ServicesList from './ServicesList';

const ServiceListStack = StackNavigator({
    ServicesList : {screen: ServicesList},
},
{
    navigationOptions: {
        headerStyle : {
            backgroundColor: '#3498db',
            marginTop: Platform.OS !== 'ios' ? 22 : 0,
        },
        headerTintColor: 'white',
    }
}   
);
export default ServiceListStack;