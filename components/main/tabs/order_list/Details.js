import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform, ScrollView} from 'react-native';

import OrderManager from './OrderManager'
import Moment from 'moment';
import { Icon, ListItem , List} from 'react-native-elements'

const GLOBAL = require('../../../../Globals')
const orderMgr =  new OrderManager();

export default class Details extends Component{

    static navigationOptions = {
        title : 'List',
        headerTitle: 'Detail',
        headerTintColor: 'white',
        tabBarIcon : ({tintColor}) => (<Icon name="list" size={30} color={tintColor} />),
    }

    constructor(){
      super();
      this.state = {
        data: {} , 
        isLoaded : false,
      };
    }

    async componentDidMount(){
        await this.fetchDetail(); 
    }

    async fetchDetail() {
        var form = new FormData();
        form.append('method', 'GetOrderDetail');
        form.append('preOrderID', this.props.navigation.state.params.id ); 

        await fetch(GLOBAL.SITE_URL, {
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
            })
            });
    }

    iconRender = (status) => {
        console.log(status);
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
              iconName = 'report-problem';
              iconColor = '#00000000';
              break;
      }
      return (
                <Icon name={iconName} color={iconColor} size={40}/>
             );
      }
    
    render(){
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconInside}>
                        {this.iconRender(this.state.data.status)}
                    </View>
                </View>
                <View style={styles.Container}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Report Date</Text>
                        <Text style={styles.detailText}>{Moment(this.state.data.report_date).format('D/M/YYYY เวลา hh:mm')}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Issue Category</Text>
                        <Text style={styles.detailText}>{orderMgr.getPreTypeEnum(this.state.data.preorder_type)}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Title</Text>
                        <Text style={styles.detailText}>{this.state.data.title}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Reporter Name</Text>
                        <Text style={styles.detailText}>{this.state.data.contact_name}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>E-mail</Text>
                        <Text style={styles.detailText}>{this.state.data.contact_email}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Contact Detail</Text>
                        <Text style={styles.detailText}>{this.state.data.contact_detail}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Phone Number</Text>
                        <Text style={styles.detailText}>{this.state.data.phone}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Location</Text>
                        <Text style={styles.detailText}>{this.state.data.area_id}</Text>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.titleText}>Problem Detail</Text>
                        <Text style={styles.detailText}>{this.state.data.problem}</Text>
                    </View>
                    <View style={styles.TextContainerLast}>
                        <Text style={styles.titleText}>Progress</Text>   
                        <Text style={styles.detailText}>{orderMgr.getStatusEnum(this.state.data.status)}</Text>
                    </View> 
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 13,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  TextContainer: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 0.5,
      borderColor: '#bdc6cf',
      justifyContent: 'space-between',
      height : 50,
      alignItems: 'center',
  },
  TextContainerLast: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    height : 50,
    alignItems: 'center',
    },
  titleText : {
    fontWeight: '400',
    fontSize: 15,
  },
  iconContainer : {
    height: 40,
    margin: 13,
    marginBottom: 4,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconInside : {
    height: 60,
    width : 60,
    borderRadius: 60/2,
    borderWidth: 1,
    borderColor: '#bdc6cf',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText : {
      color : '#7f8c8d',
  },
  mainContainer : {
      flex: 1,
  }
});