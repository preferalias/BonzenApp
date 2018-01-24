import React from 'react';
import { StyleSheet, Text, View, TextInput, ListView , FlatList, TouchableHighlight, ActivityIndicator, StatusBar } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Moment from 'moment';
import OrderManager from './OrderManager'

const GLOBAL = require('../../../../Globals')
const orderMgr =  new OrderManager();

export default class OrderList extends React.Component {
    static navigationOptions = {
        title : 'List',
        headerRight: (<Icon name='menu' color='white' containerStyle={{paddingRight:15}} />) ,
        headerTintColor : 'white',
        tabBarIcon : ({tintColor}) => (<Icon name="list" size={30} color={tintColor} />),
    }
    
    constructor(){
      super();
      this.state = {
        data: [], 
        isLoaded : false,
      };
    }

    componentDidMount(){
      this.fetchUsers();
    }

    fetchUsers(){
      var form = new FormData();
      form.append('method', 'GetOrderList');
      form.append('reportID', '2');

      fetch(GLOBAL.SITE_URL, {
        method: 'POST' ,
        headers: {
          'token' : 'JH59',
        },
        body : form
      })
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            data: response,
            isLoaded : true,
            refreshing: false,
          })
        });
    }

    iconRender = (status) => {
      var iconName = '';
      var iconColor = '';
      switch(status){
        case 1 :
            iconName = 'watch-later';
            iconColor = '#f39c12';
            break;
        case 2 :
            iconName = 'work';
            iconColor = '#3498db';
            break;
        case 3 : 
            iconName = 'check-circle';
            iconColor = '#2ecc71';
            break;
        case 4 :
            iconName = 'cancel';
            iconColor = '#c0392b';
            break;
        default :
            result = 'Unknown Status'
    }
    return (
              <Icon name={iconName} color={iconColor} size={35}/>
           );
    }

    _renderItem = ({item}) => (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Details', {id:item.preorder_id})}>
        <View style={styles.rowContainer}>
          <View style={styles.iconCon}>
            {this.iconRender(item.status)}
          </View>
          <View style={styles.columnTitleContainer}>
            <View style={styles.rowTitle}>
              <Text style={styles.rowTextNumber}>{item.preorder_id}</Text>
            </View>
            <View style={styles.rowTitle}>
              <Text style={styles.rowTextData}>{item.title}</Text>
            </View>
            <View style={styles.rowTitle}>
              <Text style={styles.rowTextTitle}>โดย {item.contact_name}</Text>
            </View>
          </View>
          <View style={styles.columnDetailContainer}>
            <Text style={styles.timeText}>{Moment(item.report_date).calendar(null,{
                sameDay: 'hh:mm A',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: 'dddd',
                sameElse: 'DD/MM/YYYY'
            })}</Text>
            
          </View>
          <View style={styles.columnIconContainer}>
            <Icon name='chevron-right' color='#bdc6cf' />
          </View>
        </View>
      </TouchableHighlight>
    );

    _keyExtractor = (item, index) => item.preorder_id;

    handleRefresh = () => {
      this.setState({
        refreshing : true,
      },
      () => {
        this.fetchUsers();
      }
      );
    }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1,backgroundColor:'#f4f4f4'}}>
      { this.state.isLoaded ? 
        <FlatList
          style={{marginTop:0}}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          ItemSeparatorComponent={()=>(<View style={styles.itemSeparator}></View>)}
        />
        :
        <ActivityIndicator style={{backgroundColor:'#f4f4f4', marginTop: 20}} size="small" color="black" />
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconCon:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnDetailContainer: {
    flexDirection: 'column',
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingLeft: 5,
  },
  columnTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 8,
    paddingLeft: 10,
  },
  rowText: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding:10,
  },
  rowTextData : {
    flex: 5,
    fontSize: 15,
  },
  rowTextNumber : {
    fontSize: 17,
  },
  timeText:{
    flex: 1,
    color: '#7f8c8d',
  },
  rowTextTitle: {
    flex: 1,
    color: '#7f8c8d',
  },
  label : {
    flex: 1,
    color: 'gray',
  },
  rowTitle : {
    flexDirection: 'row',
    justifyContent : 'flex-start',
    paddingVertical: 2,
  },
  itemSeparator : {
    height: 1,
    backgroundColor: '#CED0CE',
  },
  columnIconContainer:{
    flex: 0.6,
    alignItems: 'flex-end',
  },
});