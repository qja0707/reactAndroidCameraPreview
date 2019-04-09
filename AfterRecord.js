import React from "react";
import { View, Text, Button } from "react-native";

export default class AfterRecord extends React.Component {    
    render() {
      const {navigation} = this.props;
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Home Screen</Text>
          <Button
          title="Go to Jane's profile"
          //onPress={() => navigation.navigate('App', {name: 'Jane'})}
        />
        </View>
      );
    }
  }