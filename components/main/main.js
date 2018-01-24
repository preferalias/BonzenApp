import React from 'react';
import { Text, View, Platform} from 'react-native';

import { TabNavigator } from 'react-navigation'
import OrderList from './tabs/order_list/OrderListMain'
import SecondScreen from './tabs/new_order/NewOrderMain'
import ThirdScreen from './tabs/account/AccountMain'

var MainScreenNavigator = TabNavigator({
  OrderList : {screen: OrderList},
  NewOrder: {screen: SecondScreen},
  Settings: {screen: ThirdScreen}
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: '#7f8c8d',
    activeBackgroundColor: 'white',
    showIcon: true,
    showLabel: true,
    labelStyle: {
      fontSize:9,
      padding: 3 
    },
    style: {
      height: Platform.OS == "ios" ? 47 :66,
      paddingTop: 5,
      backgroundColor : 'white'
    }
  }
}
);

MainScreenNavigator.navigationOptions = {
  title : "Main" ,
  header : null,
  gesturesEnabled: false,
}
export default MainScreenNavigator;