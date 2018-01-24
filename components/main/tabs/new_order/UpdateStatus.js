import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
export default class UpdateStatus extends React.Component{
    static navigationOptions = {
        headerTitle: 'Status',
        title: 'New',
        tabBarIcon : ({tintColor}) => (<Icon name="playlist-add" size={30} color={tintColor} />),
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}>Update Status</Text>
                    <Text style={styles.statusText}>{this.props.navigation.state.params.status == true ? 'Success': 'Fail'}</Text>
                </View>
                <TouchableOpacity 
                style={styles.loginButton} 
                onPress={() => this.props.navigation.navigate('NewOrder')}
                >
                    <Text>Go back to new order</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    loginButton: {
        marginTop: 20,
        height: 40, 
        justifyContent : 'center',
        backgroundColor: 'white',
        alignItems : 'center',
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 18,
    },
    textContainer: {
        height: 50,
        backgroundColor: 'white',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});