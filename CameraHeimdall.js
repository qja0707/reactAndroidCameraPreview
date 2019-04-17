import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactNative, {
  requireNativeComponent, ViewPropTypes, UIManager, findNodeHandle, Button, View, Alert, TouchableOpacity, StyleSheet, Easing, Text,
  SafeAreaView, PermissionsAndroid, NativeModules, Platform
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Torch from 'react-native-torch';



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
    fill: 0.01,
    cameraFacing : 0,
    isRecord: false, 
    isTorchOn : false,
    //timer: true,   
  };

  async componentWillMount() {
    await requestCameraPermission()
  } 
  render() {    
    //console.log('timer : ', this.state.timer);
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
                //onPress={() => { navigation.navigate('ExternalLink') }}
                onPress={() => { this.toggleTorch() }}
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
                fill={0.01}
                tintColor="#ff0000"
                onAnimationComplete={() => {
                  console.log('onAnimationComplete');
                  console.log(this.state.timer);
                }}
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
  handleOnNavigateBack = (foo) => {
    this.setState({
      timer:foo
    })
  }
  cameraChange() {
    console.log("camera is changed");
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this.ref),
      UIManager.CameraView.Commands.changeCamera,
      //UIManager.getViewManagerConfig.Commands.changeCamera,
      [],
    );    
    if(this.state.isTorchOn){
      this.toggleTorch();
    }
  }
  toggleTorch(){
    NativeModules.GetData.getCameraFacing(
      (err,status) => {
        this.setState({cameraFacing:status});
        console.log('camerafacing : ', this.state.cameraFacing);
        if(this.state.cameraFacing == 0){
          console.log('torch enable');          
          try{
            Torch.switchState(!this.state.isTorchOn);
            this.setState({isTorchOn:!this.state.isTorchOn});
          }catch(e){
            console.warn('this device does not have torch');
          }
          
        }else{
          console.log('torch disable');
        }
      }
    );
  }
  record(navigation) {
    //console.warn(NativeModules.GetData)
    NativeModules.GetData.getIsRecording(
      (err, status) => {
        //this.setState({ isRecord: status });
        UIManager.dispatchViewManagerCommand(
          ReactNative.findNodeHandle(this.ref),
          UIManager.CameraView.Commands.record,
          //UIManager.getViewManagerConfig.Commands.changeCamera,
          [],
        );
        console.log('is record : ', status);
        if (status == false) {
          this.setState({ fill: 100 })
          this.circularProgres.animate(100, 30000);
        } else {          
          //this.setState({timer:false});
          //console.log("fill: ", this.circularProgres.state.fill);
          this.circularProgres.animate(0.01, 30, Easing.quad);
          NativeModules.GetData.getFilePath(
            (err, getFilePath) => {
              //console.warn('file path ', getFilePath);
              if (getFilePath != "null") {
                console.warn('file path2 ', getFilePath);
                navigation.navigate('AfterRecord', { filePath: getFilePath, onNavigateBack: this.handleOnNavigateBack});
              }
              else {
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