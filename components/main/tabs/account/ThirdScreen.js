import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, AsyncStorage} from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import { Icon } from 'react-native-elements'

const list = [
  {
    title: 'Notifications',
    icon: 'notifications'
  },
  {
    title: 'Profile',
    icon: 'person'
  },
  {
    title: 'Update Contact Info',
    icon: 'account-box',
  },
  {
    title: 'Password',
    icon: 'lock', 
  }, 
  {
    title: 'Report a Problem',
    icon: 'report-problem'
  }
]
export default class ThirdScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel : 'Settings',
        headerTitle : 'Settings',
        tabBarIcon : ({tintColor}) => (<Icon iconStyle={styles.iconContainer} containerStyle={styles.iconContainer} name="account-circle" size={25} color={tintColor} />),
    }
    logOut = () => {
      AsyncStorage.removeItem('user');
      this.props.navigation.navigate('Login');
    }
  render() {
    return (
      <View style={styles.container}>
      <List>
        {
          <ListItem
            roundAvatar
            title='C. Cat Meow'
            subtitle='Bonzen Co.,Ltd'
            avatar={
              <Avatar
                medium
                rounded
                source={{uri: 'https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg'}}
              />
            }
          />
        }
      </List>
      <List style={{marginBottom:10}}>
        {
          list.map((list, i) => (
            <ListItem 
              key={i}
              title={list.title}
              leftIcon={{name:list.icon}}
            />
          ))
        }
      </List>
        <TouchableHighlight style={styles.loginButton} onPress={this.logOut}><Text style={styles.logoutText}>Log Out</Text></TouchableHighlight>
      </View>
    );
  }
}
/*
      <View style={styles.container}>
        <View style={styles.loginButton}>
          <Text>Setting Screen</Text>
        </View>
        <TouchableHighlight style={styles.loginButton} onPress={this.logOut}><Text style={styles.logoutText}>LOG OUT</Text></TouchableHighlight>
      </View>
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginButton: {
    marginTop: 40,
    height: 40, 
    justifyContent : 'center',
    backgroundColor: 'white',
    alignItems : 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1, 
    borderColor : '#bdc3c7',
  },
  logoutText:{
    color: 'red',
    fontWeight: '400',    
    fontSize: 15,
  } 
});