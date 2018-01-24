import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';

import LoginForm from './LoginForm'

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  }

  saveAsync = async () => {
    let user = 'John Doe';
    await AsyncStorage.setItem('user',user);
    if (await AsyncStorage.getItem('user') !== null ) {
      this.props.navigation.navigate('Main');
    }
  }

  async componentWillMount() {
    let user = await AsyncStorage.getItem('user');
    if (user !== null) {
      this.props.navigation.navigate('Main');
    }
  }
 /* 
  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      alert(user);
    } catch(error) {
      alert(error);
    }
  }
  removeData() {
    AsyncStorage.removeItem('user');
  }
  */
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
          <LoginForm />
          <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={this.saveAsync}>
                    <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
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
