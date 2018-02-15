import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, AsyncStorage,ActivityIndicator} from 'react-native';

import LoginForm from './LoginForm'

const GLOBAL = require("../../Globals");

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  }

  constructor(){
    super();
    this.state = {
      user: '',
      pass: '',
      loggedIn: [],
      fetching: false,
    }
  }
  saveAsync = async () => {
    if (this.state.loggedIn === false) {
      alert('Invalid username or password')
      this.setState({fetching: false,})
    } else {
      let user = this.state.loggedIn.fullName;
      let role = this.state.loggedIn.roleType;
      await AsyncStorage.setItem('user',user);
      await AsyncStorage.setItem('role', role )
      let getUser = await AsyncStorage.getItem('user')
      let getRole = await AsyncStorage.getItem('role')
      if ((getUser !== null ) && (getRole !== null)) {
        if (role == 'staff'){
          this.props.navigation.navigate('Staff');
        } else {
          this.props.navigation.navigate('Contact');
        }
        
      }
    }
  }

  async componentWillMount() {
    let user = await AsyncStorage.getItem('user');
    let role = await AsyncStorage.getItem('role');
    if ((user !== null) && (role !== null)){
      if (role == 'staff') {
        this.props.navigation.navigate('Staff')
      } else {
        this.props.navigation.navigate('Contact');
      }
    }
  }

  fetchLogin(){
    if (this.validate()){
      this.setState({fetching:true,})
      var form = new FormData();
      form.append('method', 'Login');
      form.append('user', this.state.user);
      form.append('pass', this.state.pass);
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
            loggedIn: response,
          }, () => this.saveAsync())
        }).catch((err) => {this.setState({fetching:false}); alert(err)});
    } else {
      alert("Please input user and password");
    }
  }

  validate(){
    var valid = false;
    this.state.user && this.state.pass ? valid = true : valid = false;
    return valid
  }

  updateState(data){
      this.setState(data)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            source={require('../../images/logo.png')}
            />
            <Text style={styles.title}>Genedia properties solutions by react-native</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm updateInputState={this.updateState.bind(this)} />
          {
            this.state.fetching ?
            <TouchableOpacity 
              style={styles.buttonContainer}
              >
             <ActivityIndicator style={{backgroundColor:'rgba(0,0,0,0.0)',}} size="small" color="black" />
            </TouchableOpacity>
            :
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => this.fetchLogin()}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          }
          
        </View>
      </KeyboardAvoidingView>
    );
  }
}
 
const styles = StyleSheet.create({
  buttonContainer:{
    backgroundColor: '#2980b9',
    paddingVertical: 15,
},
buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'   
},
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center' ,
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo:{
    width:100,
    height: 100
  },
  title:{
    color : '#FFF',
    marginTop: 10,
    width: 200,
    textAlign: 'center',
    opacity: 0.9
  },
  loginButton: {
    backgroundColor: 'red',
  },
  formContainer: {
    padding: 20
  }
});
