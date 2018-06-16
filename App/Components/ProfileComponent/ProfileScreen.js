import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    TextInput,
    ScrollView,
    AsyncStorage,
    ImageEditor,
    Button,
    KeyboardAvoidingView,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Avatar, Icon } from 'react-native-elements';
import CardView from 'react-native-cardview';
import {
    SkypeIndicator,
    UIActivityIndicator,
} from 'react-native-indicators';

import ImagePicker from 'react-native-image-picker';


import {
    getProfile,
    getLastBox,
    updateUserAvtar
} from "../../Action/ActionCreators";
import API from '../../Constants/APIUrls';



import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CommonStyles from '../../CommonStyle/CommonStyle';
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import ImagePath from '../../Constants/ImagePath';
import ProfileScreenStyle from './ProfileScreenStyle'

var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            product: [],
            userInfo: [],
            avatarSource: '',
            noOrderFound: false

        }
    }

    componentWillMount() {
        AsyncStorage.getItem("LoginUserInfo").then((value) => {
            console.log(value);

            if (value) {
                var userData = JSON.parse(value);
                //this.setState({ userInfo: userData });
                this.props.getProfile(userData.data);
            }
        }).done();
        //this.props.getProfile("5954972e2262f132ea97a12f");
    }

    componentWillReceiveProps(nextProps) {
        console.log("==== Profile Response =====", JSON.stringify(nextProps.ProfileRerducer.data));

        if (
            nextProps.ProfileRerducer.data != undefined &&
            nextProps.ProfileRerducer.data != ""
        ) {

            this.setState({ isLoading: false })
            if (nextProps.ProfileRerducer.data.messageId == 200) {


                this.setState({ avatarSource: { uri: API.IMAGE_BASE_USR + nextProps.ProfileRerducer.data.data.profile_pic }, userInfo: nextProps.ProfileRerducer.data.data })
                console.log("==== Profile Response =====", JSON.stringify(nextProps.ProfileRerducer.data.data));
                if (typeof nextProps.ProfileRerducer.data.data.order != "undefined") {

                    this.setState({ product: nextProps.ProfileRerducer.data.data.order.products })

                } else {
                    this.setState({ noOrderFound: true })
                }

            } else {
                //alert("No Data Found");
            }
        }


        if (
            nextProps.ProfileRerducer.imageData != undefined &&
            nextProps.ProfileRerducer.imageData != ""
        ) {
            console.log("==== Image Upload Response =====", JSON.stringify(nextProps.ProfileRerducer.imageData));

            if (nextProps.ProfileRerducer.imageData.messageId == 200) {



                console.log("==== Image Upload Response =====", JSON.stringify(nextProps.ProfileRerducer.imageData));
                this.setState({
                    avatarSource: { uri: API.IMAGE_BASE_USR + nextProps.ProfileRerducer.imageData.data }
                });
            } else {
                alert("Unable to upload Image");
            }
        }
    }



    //  Image Picker

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var imageSource = { uri: response.uri };

                // You can also display the image using data:
                var imageSource = { uri: 'data:image/jpeg;base64,' + response.data };

                var block = imageSource.uri.split(";");

                var realData = block[1].split(",")[1];

                // console.log("==== Base64 Image ======", realData);

                var postData = {
                    userId: '5954972e2262f132ea97a12f',
                    profile_pic: {
                        filename: response.fileName,
                        base64: realData
                    }
                }

                this.props.updateUserAvtar(postData);


                // this.setState({
                //   avatarSource: imageSource
                // });
            }
        });
    }



    // end of picker

    _keyExtractor = (item, index) => item.id;

    renderItem = itemData => {

        return (

            <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={5}
                style={ProfileScreenStyle.cardViewStyle}>


                <Image
                    style={ProfileScreenStyle.ImageStyle}
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSctLbawtMtFcGkOSHK-zYmOmk_4rg9VvQNJ5MT6gLnMPBJjFz5" }}
                />


                <Icon
                    name='heart'
                    type='font-awesome'
                    color={Colors.GRAY_COLOR}
                    size={25} />




            </CardView>
        );

    }

    render() {

        return (


            <View style={CommonStyles.container}>
                {
                    this.state.isLoading ?
                        <View style={CommonStyles.activityIndicatorStyle}>
                            <UIActivityIndicator color='gray' />
                        </View>
                        : <View style={{ flex: 1 }}>




                            <View style={ProfileScreenStyle.userInfoStyle}>


                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                                    <Image
                                        resizeMode={"cover"}
                                        style={ProfileScreenStyle.canvas}
                                        source={this.state.avatarSource} />

                                </TouchableOpacity>

                                <View style={ProfileScreenStyle.detailsInfoStyle}>
                                    <View style={ProfileScreenStyle.nameContainer}>
                                        <Text style={ProfileScreenStyle.nameStyle}> {this.state.userInfo.first_name} {this.state.userInfo.last_name} </Text>
                                        <Icon
                                            name='pencil'
                                            type='font-awesome'
                                            color={Colors.GRAY_COLOR}
                                            size={16} />
                                    </View>
                                    <Text style={ProfileScreenStyle.emailStyle}> {this.state.userInfo.email} </Text>

                                    <Text style={ProfileScreenStyle.numberStyle}> {this.state.userInfo.contact_no} </Text>

                                    <View style={ProfileScreenStyle.InfoStyle}>

                                        <View style={ProfileScreenStyle.InfoViewStyle}>
                                            <Text > Kids</Text>

                                            <Text > {this.state.userInfo.kids ? this.state.userInfo.kids.length : '0'} </Text>

                                        </View>
                                        <View style={ProfileScreenStyle.InfoViewStyle}>

                                            <Text > Sizes</Text>
                                            <Text > 12 / 4  </Text>
                                        </View>

                                        <View style={ProfileScreenStyle.InfoViewStyle}>
                                            <Text > Delivery</Text>
                                            <Text > 4/12  </Text>
                                        </View>

                                    </View>
                                </View>

                            </View>

                            <View style={ProfileScreenStyle.myBoxContainerStyle}>

                                <Text style={ProfileScreenStyle.myBoxTextStyle}> My Box </Text>

                                {this.state.noOrderFound ? <View style={ProfileScreenStyle.noDataFound}><Text style={ProfileScreenStyle.noDataFoundText}> No Order Found </Text></View> : <FlatList
                                    data={this.state.product}
                                    renderItem={this.renderItem}
                                    numColumns={1}
                                    key={"ONE COLUMN"}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={this._keyExtractor}
                                    horizontal={true}
                                />

                                }

                            </View>

                        </View>
                }

            </View>
        );
    }

}


function mapStateToProps(state) {

    return {
        ProfileRerducer: state.ProfileRerducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProfile, updateUserAvtar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);