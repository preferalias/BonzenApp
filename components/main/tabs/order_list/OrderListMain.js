import React, {Component} from 'react';
import { Platform, View , Text} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import OrderList from './OrderList';
import Details from './Details';

const OrderListStack = StackNavigator({
    OrderList: {screen: OrderList},
    Details: {screen: Details},
},
{
    navigationOptions: {
        headerStyle : {
            backgroundColor: '#3498db',
            marginTop: Platform.OS !== 'ios' ? 22 : 0,
        }
    }
}   
);
export default OrderListStack;