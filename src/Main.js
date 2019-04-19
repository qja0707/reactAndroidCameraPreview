import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default class Main extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Button title = "take a video" onPress={()=>{navigation.navigate('CameraHeimdall');}}/>
                <Text></Text>
                <Button title = "External link upload" onPress={()=>{navigation.navigate('Test');}}/>
            </View>
        );
    }
}