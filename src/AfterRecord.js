import React from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Video from 'react-native-video';
import { TextInput } from "react-native-gesture-handler";
import {Buffer} from 'buffer';


export default class AfterRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: new Animated.ValueXY({ x: 0, y: 0 }),
            curY: 0.01,
            fromY: 0.01,
            toY: 150,
        };
        this.serverAddr = 'http://172.30.1.47:3001';        
    }

    render() {
        const { navigation } = this.props;
        const filePath = navigation.getParam('filePath', 'null');
        this.filePath = filePath;
        this.fileName = filePath.split("/").pop();
        console.log("file name : "+this.fileName);
        navigation.state.params.onNavigateBack(true);
        //console.warn("after record : ", filePath);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Video source={{ uri: filePath }}
                        repeat={true}
                        style={styles.backgroundVideo} />
                    <Animated.View style={[{ position: 'absolute', height: '50%', width: '100%', backgroundColor: 'black', top: '50%' }, this._boardGetStyle()]}>
                        <TouchableOpacity style={{ position: 'absolute', top: '5%', right: '5%', width: 20, height: 20, backgroundColor: 'white' }}
                            onPress={() => { this._moveY() }} />
                        <Text style={{ color: "white" }}>제목작성</Text>
                        <TextInput placeholder="#Tag 포함한 상세 글 작성 ex) 서울 종로구 #광화문 #경복궁에서 하늘 맑음" placeholderTextColor="white" style={{ marginTop: 20 }}></TextInput>
                        <Text style={{ color: "white" }}>촬영시간</Text>
                        <Text style={{ color: "white" }}>위치정보</Text>
                        <Text style={{ color: "white" }}>마켓에서 판매</Text>
                        <TouchableOpacity style={[{ position: 'absolute', bottom: '5%', left: '5%' }, styles.record_button]}
                            onPress={async () => {
                                this.uploadVideo();
                            }} />
                    </Animated.View>
                </View>
            </SafeAreaView>
        );
    }

    async restModule(fetchAddr, method, header, body) {
        try {
            console.log(fetchAddr+" is proceeding");
            let response = await fetch(fetchAddr, {
                method: method,
                headers: header,
                body: body,
            });
            let responseJson = await response.json();
            await console.log(responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    async uploadVideo() {
        let loginResponse = await this.restModule(this.serverAddr + '/api/gloovir_account/login',
            'POST',
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            JSON.stringify({
                "mail": "test1@gloovir.com",
                "pass": "password",
                "country": "korea",
                "gcm_reg_id": "asdf",
                "device_model": "g7",
                "device_serial": "asdf",
                "device_sdk_version": "asdf"
            })
        );

        let uploadVideoStartResponse = await this.restModule(this.serverAddr + '/api/gloovir_video_upload',
            'POST',
            {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': loginResponse.token,
                'Cookie': 'session_name=' + loginResponse.sessid,
            },
            JSON.stringify({
                "title": "test",
                "video_upload_type": "heimdall",
                "video_upload_request_id": 0,
                "video_upload_accept_id": 0,
                "video_upload_original_file": this.fileName,
                "video_upload_tag": "test:test",
                "video_open_status": 1,
                "video_description": "string",
                "video_address": "string",
                "video_place": "string",
                "video_latitude": "37.5555",
                "video_longitude": "127.5555",
                "video_shooting_time": 12345678,
                "video_play_time": 15,
                "video_orientation": "portrait"
            })
        );

        let uploadVideoFileResponse = await this.restModule(this.serverAddr + '/api/gloovir_video_upload/testupload/'+uploadVideoStartResponse.upload_bucket_path+'/'+this.fileName,
            'POST',
            {
                Accept: 'application/json',
                'Content-Type': 'application/octet-stream',
                'X-CSRF-Token': loginResponse.token,
                'Cookie': 'session_name=' + loginResponse.sessid,
            },
            Buffer.from(this.filePath,'utf8')            
        );
    }
 

    _moveY() {
        var toY = this.state.toY;
        var fromY = this.state.fromY
        if (this.state.curY == this.state.fromY) {
            this.setState({ curY: toY })
        } else if (this.state.curY == this.state.toY) {
            this.setState({ curY: fromY })
        }
        //console.warn('posY : ', this.state.curY)
        Animated.timing(
            this.state.position, {
                toValue: { x: 0, y: this.state.curY },
                //friction : 2,
                //tension : 100,
            }).start();
        //console.warn(this.state.position.y)
    }
    _boardGetStyle() {
        return {
            transform: [
                { translateY: this.state.position.y },
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
    },
    record_button: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        padding: 10,
    },
},
);