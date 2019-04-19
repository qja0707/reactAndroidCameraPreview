/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
//import {Platform, StyleSheet, Text, View, } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import CameraHeimdall from "./src/CameraHeimdall";
import AfterRecord from "./src/AfterRecord";

import Test from "./src/Test";
import Main from "./src/Main";

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  CameraHeimdall: {
    screen: CameraHeimdall,
    navigationOption: () => ({
      headerTruncatedBackTitle: `to Main`
    }),
  },
  AfterRecord: {
    screen: AfterRecord,
    navigationOption: () => ({
      headerTruncatedBackTitle: `to CameraHeimdall`
    }),
  },
  Test: {
    screen: Test,
    navigationOption: () => ({
      headerTruncatedBackTitle: `to Main`
    }),
  }
});

export default createAppContainer(AppNavigator);