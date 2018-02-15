import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default class LoginForm extends React.Component {
    updateParentState(data){
        this.props.updateInputState(data)
    }
  render() {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
            />
            <TextInput
                onChangeText={(input) => this.updateParentState({user:input})}
                style={styles.input}
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
            />
            <TextInput 
                onChangeText={(input) => this.updateParentState({pass:input})}
                style={styles.input} 
                placeholder="password"
                secureTextEntry
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                underlineColorAndroid="transparent"
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 20,        
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        paddingHorizontal: 10
    }
});
