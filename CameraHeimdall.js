import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactNative, { requireNativeComponent, ViewPropTypes, UIManager, findNodeHandle, Button, View, Alert } from 'react-native';

//import console = require("console");
var viewProps = {
  name: 'CameraView',
  propTypes: {
    url: PropTypes.string,
    ...ViewPropTypes,
  }
}



const RNCameraHeimdall = requireNativeComponent('CameraView', viewProps);

/*
_testFn(){
  Alert.alert("asdf");
  
  
}
*/



export default class CameraHeimdall extends Component {

  render() {
    console.log('render called');
    return (
      <View
        style={{ flex: 1, width: '100%', height: '100%' }}>
        <RNCameraHeimdall
          style={{ flex: 1, width: '100%', height: '100%' }}
          ref={ref => this.ref = ref} />
        <Button
          onPress={() => { this.cameraChange() }}
          title="Camera" />
        <Button
          onPress={() => { this.recording() }}
          title="Camera" />
      </View>
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
  recording(){

  }

}
//module.exports = requireNativeComponent('CameraView', viewProps);