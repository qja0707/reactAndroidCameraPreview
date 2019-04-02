/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PermissionsAndroid, Button, Alert} from 'react-native';
import CameraHeimdall from './CameraHeimdall';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.CAMERA,      
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      //this.camera.toastFn();
    } else {
      console.log('Camera permission denied');
      //this.camera.toastFn();
    }
  } catch (err) {
    console.warn(err);
  }
}

function testFn(){
  this.camera.toastFn();
}



type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {a : true};
  }

  async componentDidMount(){
    await requestCameraPermission()
  }
  
  render() {
    console.log('re rander app.js');
    return (
      <View style={styles.container}>
      <CameraHeimdall/>               
      </View>
    );
  }

  SampleFunction1(){
 
    Alert.alert("Function Without Argument");
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
