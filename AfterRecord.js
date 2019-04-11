import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import Video from 'react-native-video';

export default class AfterRecord extends React.Component {
    render() {
        const { navigation } = this.props;
        const filePath = navigation.getParam('filePath', 'null');
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Video source={{ uri:filePath}}
                        repeat={true}
                        style={styles.backgroundVideo} />
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
},
);