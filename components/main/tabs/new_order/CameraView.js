import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import Camera from 'react-native-camera';

export default class CameraView extends React.Component{
    static navigationOptions = {
        headerTitle: 'Camera',
        title: 'New',
        tabBarIcon : ({tintColor}) => (<Icon name="playlist-add" size={30} color={tintColor} />),
        tabBarVisible: false,
        header: null,
    }
    constructor(){
        super();
        this.state = {
            showButton : true,
        }
    }

    componentDidMount() {
        this.setState({showButton: true})
    }

    takePicture() {
        const options = {};
        this.setState({showButton: false})
        this.camera.capture({metadata: options})
            .then((data) => {
                var imagePath = data.path;
                this.props.navigation.navigate('NewOrder',{imgPath : imagePath});
            })
            .catch(err => console.error(err));
    }

    renderButton() {
        if (this.state.showButton) {
            return (   <TouchableOpacity style={styles.captureButton} onPress={this.takePicture.bind(this)}>
                                </TouchableOpacity>
                            )
        } else {
            return null;
        }
    }
    render(){
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <View style={styles.backButtonContainer}>
                        <Icon name="chevron-left" size={50} onPress={()=>goBack()} color="white" /> 
                    </View>
                    <View style={styles.capButtonContainer}>
                        {this.renderButton()}
                    </View>
                </Camera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    preview : {
        flex: 1,
        justifyContent: 'space-between',
    },
    backButton: {
        
    } ,
    backButtonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'rgba(52,52,52,0.0)',
        marginTop: 30,
        marginLeft: 10,
    },
    captureButton: {
        width : 60,
        height: 60,
        borderRadius: 60/2,
        borderColor: 'gray',
        borderWidth: 2,
        backgroundColor: 'white',
        
    },
    capButtonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});