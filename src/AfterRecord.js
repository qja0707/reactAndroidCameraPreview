import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Video from 'react-native-video';
import { TextInput } from "react-native-gesture-handler";


export default class AfterRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            position: new Animated.ValueXY({x:0, y:0}),
            curY:0.01,
            fromY: 0.01,
            toY: 150,        
          };
    }

    render() {
        const { navigation } = this.props;
        const filePath = navigation.getParam('filePath', 'null');
        navigation.state.params.onNavigateBack(true);
        //console.warn("after record : ", filePath);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Video source={{ uri: filePath }}
                        repeat={true}
                        style={styles.backgroundVideo} />
                    <Animated.View style={[{ position: 'absolute', height: '50%', width: '100%', backgroundColor: 'black', top: '50%' },this._boardGetStyle()]}>
                        <TouchableOpacity style={{ position: 'absolute', top: '5%', right: '5%', width: 20, height: 20, backgroundColor: 'white' }}
                            onPress={() => {this._moveY()}} />
                        <Text style={{ color: "white" }}>제목작성</Text>
                        <TextInput placeholder="#Tag 포함한 상세 글 작성 ex) 서울 종로구 #광화문 #경복궁에서 하늘 맑음" placeholderTextColor="white" style={{marginTop:20}}></TextInput>
                        <Text style={{ color: "white" }}>촬영시간</Text>
                        <Text style={{ color: "white" }}>위치정보</Text>
                        <Text style={{ color: "white" }}>마켓에서 판매</Text>
                    </Animated.View>
                </View>
            </SafeAreaView>
        );
    }
    _moveY(){        
        var toY = this.state.toY;
        var fromY = this.state.fromY
        if(this.state.curY == this.state.fromY){
            this.setState({curY:toY})
        }else if(this.state.curY == this.state.toY) {
            this.setState({curY:fromY})
        }   
        //console.warn('posY : ', this.state.curY)
        Animated.timing (
          this.state.position, {
            toValue : {x:0, y:this.state.curY},
            //friction : 2,
            //tension : 100,
        }).start();
        //console.warn(this.state.position.y)
      }
    _boardGetStyle(){
        return {
            transform:[
                {translateY:this.state.position.y},
            ]
        }        
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