import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactNative, {
  requireNativeComponent, ViewPropTypes, UIManager, findNodeHandle, Button, View, Alert, TouchableOpacity, StyleSheet, Easing, Text,
  SafeAreaView, PermissionsAndroid, NativeModules
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



//import console = require("console");
var viewProps = {
  name: 'CameraView',
  propTypes: {
    url: PropTypes.string,
    ...ViewPropTypes,
  }
}

const RNCameraHeimdall = requireNativeComponent('CameraView', viewProps);

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

export default class CameraHeimdall extends Component {
  state = {
    fill: 0,
    isRecord: false,
  };

  async componentWillMount() {
    await requestCameraPermission()
  }

  render() {
    //console.log(this.state.isRecord);
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#ddd' }}>
          <RNCameraHeimdall
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            ref={ref => this.ref = ref}>
          </RNCameraHeimdall>
          <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', position: 'absolute' }}>

            <View style={[styles.camera_wraping_view, { marginBottom: 20 }]}>
              <TouchableOpacity style={[styles.record_button, { backgroundColor: 'yellow', alignSelf: 'center' }]}
                onPress={() => { this.cameraChange() }}
              />
            </View>

            <View style={[styles.camera_wraping_view, { marginBottom: 15 }]}>
              <AnimatedCircularProgress
                style={{ alignSelf: 'center' }}
                ref={(ref) => this.circularProgres = ref}
                size={60}
                width={5}
                duration={30000}
                rotation={0}
                fill={this.state.fill}
                tintColor="#ff0000"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875"
              >
                {
                  (fill) => (
                    <TouchableOpacity
                      //onPress={() => { this.start() }}
                      onPress={() => this.record(navigation)}
                    >
                      <View style={[styles.record_button]} />
                      <View style={[styles.record_start]} />
                    </TouchableOpacity>
                  )
                }
              </AnimatedCircularProgress>
            </View>

            <View style={[styles.camera_wraping_view, { marginBottom: 20 }]}>
              <TouchableOpacity
                style={[styles.record_button, { backgroundColor: 'blue', alignSelf: 'center' }]}
                onPress={() => { this.cameraChange() }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  cameraChange() {
    console.log("1");
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this.ref),
      UIManager.CameraView.Commands.changeCamera,
      //UIManager.getViewManagerConfig.Commands.changeCamera,
      [],
    );
  }
  record(navigation) {
    console.warn(NativeModules.GetData)
    NativeModules.GetData.getIsRecording(
      (err,status) => {        
        this.setState({ isRecord: status });
        this.setState({ fill: 100 })

        UIManager.dispatchViewManagerCommand(
          ReactNative.findNodeHandle(this.ref),
          UIManager.CameraView.Commands.record,
          //UIManager.getViewManagerConfig.Commands.changeCamera,
          [],
        );
        console.warn('is record : ', status);
        if (status == false) {

        } else {
          NativeModules.GetData.getFilePath(
            (err,getFilePath) => {
              console.warn('file path ', getFilePath);
              if(getFilePath != "null"){
                console.warn('file path2 ', getFilePath);
                navigation.navigate('AfterRecord', { filePath : getFilePath });
              }
              else{
                console.log("file path is null");
              }
            }
          )          
        }
      }
    );

  }
  /*
  start() {
    this.setState({ fill: 100 })
    this.record()
    //this.circularProgres.performLinearAnimation(100,8000);
  }*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  record_button: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    padding: 10,
  },
  record_start: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 13,
  },
  record_stop: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    padding: 10,
  },
  camera_wraping_view: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})

//module.exports = requireNativeComponent('CameraView', viewProps);