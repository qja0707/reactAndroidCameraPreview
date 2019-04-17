/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, View, } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import CameraHeimdall from "./CameraHeimdall";
import AfterRecord from "./AfterRecord";
import ExternalLink from "./ExternalLink";

const AppNavigator = createStackNavigator({
  CameraHeimdall: {
    screen: CameraHeimdall
  },
  AfterRecord: {
      screen: AfterRecord,
      navigationOption: () =>({
        headerTruncatedBackTitle: `to CameraHeimdall`
      }),
  },
  ExternalLink: {
    screen: ExternalLink,
    navigationOption: () =>({
      headerTruncatedBackTitle: `to CameraHeimdall`
    }),
}
});

export default createAppContainer(AppNavigator);