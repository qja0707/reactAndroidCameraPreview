/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, View, } from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import CameraHeimdall from "./CameraHeimdall";
import AfterRecord from "./AfterRecord";

const AppNavigator = createSwitchNavigator({
  CameraHeimdall: {
    screen: CameraHeimdall
  },
  AfterRecord: {
      screen: AfterRecord,
      navigationOption: () =>({
        headerTruncatedBackTitle: `to CameraHeimdall`
      }),
  }
});

export default createAppContainer(AppNavigator);