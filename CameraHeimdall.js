import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactNative, { requireNativeComponent, ViewPropTypes, UIManager, findNodeHandle, Button, View, Alert, TouchableOpacity, StyleSheet } from 'react-native';

//import console = require("console");
var viewProps = {
  name: 'CameraView',
  propTypes: {
    url: PropTypes.string,
    ...ViewPropTypes,
  }
}

const RNCameraHeimdall = requireNativeComponent('CameraView', viewProps);

export default class CameraHeimdall extends Component {

  render() {
    console.log('render called');
    return (
      <View
        style={{ flex: 1, width: '100%', height: '100%' }}>
        <RNCameraHeimdall
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          ref={ref => this.ref = ref}>
        </RNCameraHeimdall>
        <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', position: 'absolute' }}>

          <View style={{ flex: 1 , justifyContent: 'flex-end', marginBottom: 20}}>
            <TouchableOpacity style={[styles.record_button, { alignSelf: 'bottom', backgroundColor: 'red' , alignSelf: 'center'}]}
              onPress={() => { this.cameraChange() }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.record_button, { backgroundColor: 'white' }]}
              onPress={this._onPressButton}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.record_button, { backgroundColor: 'blue' }]}
              onPress={this._onPressButton}
            />
          </View>


        </View>


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
  record() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this.ref),
      UIManager.CameraView.Commands.record,
      //UIManager.getViewManagerConfig.Commands.changeCamera,
      [],
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  record_button: {
    //alignItems: 'center',
    //position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    //backgroundColor: '#DDDDDD',
    padding: 10,
  },
})

//module.exports = requireNativeComponent('CameraView', viewProps);