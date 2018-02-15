
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

export default class RNSignatureExample extends React.Component {
    static navigationOptions = {
        headerTitle: 'Signature',
        title: 'New',
        tabBarIcon : ({tintColor}) => (<Icon name="playlist-add" size={30} color={tintColor} />),
        tabBarVisible: false,
        header: null,
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column",}}>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent.bind(this)}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={true}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>
            </View>
        );
    }

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        this.props.navigation.navigate('NewOrder');
    }
    _onDragEvent() {

    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});