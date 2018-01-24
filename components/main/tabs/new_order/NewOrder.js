import React from 'react';
import { StyleSheet, Text, Picker, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';

import { Icon } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';

const GLOBAL = require('../../../../Globals')


export default class NewOrder extends React.Component {
    static navigationOptions = {
        tabBarLabel : 'New Order',
        headerTitle: 'New',
        title: 'New',
    }
    constructor(){
      super();
      this.state = {
        data: [], 
        selectedValue: [],
        item:[],
        reporter_customer_id: 2,
        contact_name: '',
        contact_detail: '',
        phone: '',
        contact_email: '',
        title: '',
        area_id: '92e61c30-cb23-46eb-8e66-d051075d8148',
        problem: '',
        preorder_type: 1,
        coordinator: null,
        status: 3,
        report_date: new Date(),
        remark: '',
        result: false,
      };
    }
    componentDidMount(){
      this.fetchUsers();
    }

    onSelectedItemsChange = (selectedItems) => {
      this.setState({
          selectedValue : selectedItems
       });
      console.log('Selected Items: ', selectedItems)
    }

    fetchUsers(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            data: response
          })
        });
    }

    submitDetail = async (body) => {
      var form = new FormData();
      form.append('method', 'CreateOrder');
      form.append('order', body);

      await fetch(GLOBAL.SITE_URL, {
        method: 'POST' ,
        headers: {
          'token' : 'JH59',
        },
        body : form
      }).then((response) => response.json()).then(response => {this.setState({result: response})});
      console.log(this.state.result);
    }

    onSubmit = async () => {
      var body = JSON.stringify({
        reporter_customer_id : this.state.reporter_customer_id,
        contact_name: this.state.contact_name,
        contact_detail : this.state.contact_detail,
        phone: this.state.phone,
        contact_email: this.state.contact_email,
        title: this.state.title,
        area_id: this.state.area_id,
        problem: this.state.problem,
        preorder_type: this.state.preorder_type,
        coordinator: this.state.coordinator,
        status: this.state.status,
        report_date: this.state.report_date, 
        remark: this.state.remark , 
      })
      //console.log(body);
      await this.submitDetail(body);
      console.log(this.state.result);
      console.log('test');
      this.contactNameInput.clear();
      this.contactInfoInput.clear();
      this.phoneInput.clear();
      this.emailInput.clear();
      this.titleInput.clear();
      this.locationInput.clear();
      this.detailInput.clear();
      this.contactPersonInput.clear();
      this.props.navigation.navigate('UpdateStatus',{status: this.state.result});
    }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyAvoid}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Reporter Info</Text>
          </View>
          <View style={styles.textBox}>
              <Icon name="account-box" iconStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Contact name"
                underlineColorAndroid="transparent"
                onChangeText={(contactName) => this.setState({contact_name: contactName})}
                ref={input => {this.contactNameInput = input}}
              />
          </View>
          <View style={styles.textBox}>
              <Icon name="info" containerStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Contact info"
                underlineColorAndroid="transparent"
                onChangeText={(item) => this.setState({contact_detail : item})}
                ref={(input) => {this.contactInfoInput = input}}
              />
          </View>
          <View style={styles.textBox}>
              <Icon name="phone" containerStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Phone number"
                underlineColorAndroid="transparent"
                onChangeText={(item) => this.setState({phone: item})}
                keyboardType='numeric'
                returnKeyType='done'
                ref={(input) => {this.phoneInput = input}}
              />
          </View>
          <View style={styles.textBox}>
              <Icon name="mail" containerStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Email"
                underlineColorAndroid="transparent"
                onChangeText={(item) => this.setState({contact_email: item})}
                keyboardType= 'email-address'
                autoCapitalize='none'
                ref={(input) => {this.emailInput = input}}
              />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Issue</Text>
          </View>
          <View style={styles.textBox}>
              <Icon name="label" containerStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Enter your title here"
                underlineColorAndroid="transparent"
                onChangeText={(item) => this.setState({title: item})}
                ref={(input) => {this.titleInput = input}}
              />
          </View>
          <View style={styles.textBox}>
              <Icon name="place" iconStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Location"
                underlineColorAndroid="transparent"
                ref={(input) => {this.locationInput = input}}
              />
          </View>
          <TextInput style={styles.inputAreaText}
            multiline={true}
            blurOnSubmit={true}
            onChangeText={(item) => this.setState({problem : item})}
            placeholder="Place your problems detail here"
            ref={(input) => {this.detailInput = input}}
          />
         <View style={styles.textBox}>
              <Icon name="account-circle" iconStyle={styles.textBoxIcon} size={25} color="gray" />
              <TextInput
                style={{flex:1}}
                placeholder="Contact Person"
                underlineColorAndroid="transparent"
                ref={(input) => {this.contactPersonInput = input}}
              />
          </View> 
        <TouchableOpacity onPress={this.alertConfirm} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Submit Order</Text> 
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    );
  }
  alertConfirm = () => {
    Alert.alert(
      'Submit Order',
      'Comfirm to submit order ?',
      [
        {text: 'Confirm' , onPress: this.onSubmit},
        {text: 'Cancel', onPress: () => console.log('not yet naa')},
      ],
      {cancelable: false}
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20 ,
  },
  keyAvoid: {
    flex:1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 5
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  labelText: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5
  },
  inputAreaText: {
    height: 100,
    backgroundColor: '#f4f4f4',
    borderWidth: .5,
    borderColor: '#000',
    borderRadius: 5,
    margin: 10,
    color: 'black',
    paddingHorizontal:10
  },
  menuText: {
      fontSize:30,
  },
  buttonContainer: {
    backgroundColor: '#2980B9',
    paddingVertical: 15,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  textBox : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#f4f4f4',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  textBoxIcon: {
    paddingBottom : 3,
    paddingTop: 4,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 5,
    alignItems: 'center'

  },
});