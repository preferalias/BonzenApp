import React from 'react';
import { Text, View, Platform, AsyncStorage} from 'react-native';

import { TabNavigator } from 'react-navigation'
import OrderList from './tabs/order_list/OrderListMain'
import NewOrderMain from './tabs/new_order/NewOrderMain'
import ThirdScreen from './tabs/account/AccountMain'
import ServicesList from './tabs/services_list/ServicesMain'




    const ContactScreenNavigator = TabNavigator({
      ListTabs: {screen : OrderList},
      NewOrder: {screen: NewOrderMain},
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
            height: Platform.OS == "ios" ? 53 :66,
            paddingTop: 5,
            backgroundColor : 'white'
          }
        }
      }
    );
    ContactScreenNavigator.navigationOptions = {
      title : "Contact" ,
      header : null,
      gesturesEnabled: false,
    }
  
export default ContactScreenNavigator;

