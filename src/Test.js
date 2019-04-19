import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import LinkPreview from 'react-native-link-preview';


export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkDisable: true,
            title: "",
            description: "",
            link: "",

            youtubeIcon: require("../res/images/youtubeIcon.png"),
            twitterIcon: require("../res/images/twitterIcon.png"),
            facebookIcon: require("../res/images/facebookIcon.png"),
            instagramIcon: require("../res/images/instagramIcon.png"),
            defaultImage: require("../res/images/defaultImage.png"),
            image:"",
        };
        console.log("constructor");

        const images = {
            
        }
    }
    render() {
        
        //const { navigation } = this.props;
        console.log("render, ", this.state.defaultImage);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <TextInput placeholder="Link" onChangeText={
                        (link) => {this.setState({ link: link });                        
                    }

                    }></TextInput>
                    <TouchableOpacity style={{ backgroundColor: "yellow", height: 40, width: 100 }} title="업로드" onPress={() => { this.linkChanged() }} />
                    <TextInput placeholder="Title" >{this.state.title}</TextInput>
                    <TextInput placeholder="Description">{this.state.description}</TextInput>
                    <Image style={{ height: 50, width: 50 }} source={this.serviceIcon()} />
                    <Text>경복궁 등등 위치 정보</Text>
                    <Image source={{uri:this.state.image}} style={{height:150,width:400}}/>

                    <TouchableOpacity style={{ backgroundColor: "blue", height: 40, width: 100 }} title="업로드" disabled={this.state.linkEnable} />
                </View>
            </SafeAreaView>
        );
    }
    thumbnailImageError(error){
        console.log("error: ",error)
        this.setState({image:require("../res/images/defaultImage.png")})
    }
    serviceIcon(){
        let temp = this.state.link;
        if(temp.indexOf("youtube")>-1){
            return this.state.youtubeIcon;
        }else if(temp.indexOf("twitter")>-1){
            return this.state.twitterIcon;
        }else if(temp.indexOf("instagram")>-1){
            return this.state.instagramIcon;
        }else{
            return this.state.defaultImage;
        }
    }
    linkChanged() {
        console.log('link parsing', this.state.link);
        // test link : 'https://www.instagram.com/p/BwCbOUADLsF/?utm_source=ig_web_copy_link'
        LinkPreview.getPreview(this.state.link)
            .then(data => {
                console.log("preview");
                console.log(data);                
                this.autoFill(data);
                console.log("preview end");
            });

        LinkPreview.getPreview(
            this.state.link,
            {
                imagesPropertyType: 'og', // fetches only open-graph images
            })
            .then(data => {
                console.log("preview with link og");
                console.debug(data);          
                this.autoFill(data);      
                console.log("preview with link og end");
            }
            
            );
    }
    autoFill(data){
        this.setState({title:data.title,
            description:data.description,
            image:data.images[0],
        })
        console.log("image : ",this.state.image.uri);
    }
}