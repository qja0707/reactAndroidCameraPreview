import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity, WebView } from "react-native";
import Video from 'react-native-video';
import { TextInput } from "react-native-gesture-handler";

export default class AfterRecord extends React.Component {

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <WebView style={{ width: 350, height: null }}
                        source={{ uri: 'https://twitter.com/Lovelyz_PureKei/status/1048479029941088257' }} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});