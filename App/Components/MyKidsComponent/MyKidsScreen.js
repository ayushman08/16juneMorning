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
import FAB from 'react-native-fab'

import {
    getProfile,
    getLastBox
} from "../../Action/ActionCreators";
import API from '../../Constants/APIUrls';



import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CommonStyles from '../../CommonStyle/CommonStyle';
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import ImagePath from '../../Constants/ImagePath';
import MyKidsScreenStyle from './MyKidsScreenStyle'

import girl_mykid from '../../Assets/girl_mykid.png';
import boy_mykid from '../../Assets/boy_mykid.png';
import edit from '../../Assets/edit.png';



class MyKidsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            myKidsData: []
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
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: false })
        if (
            nextProps.MyKidsReducer.data != undefined &&
            nextProps.MyKidsReducer.data != ""
        ) {

            this.setState({ isLoading: false })
            if (nextProps.MyKidsReducer.data.messageId == 200) {
                this.setState({ myKidsData: nextProps.MyKidsReducer.data.data.kids })
                console.log("==== MyKids Response =====", JSON.stringify(nextProps.MyKidsReducer.data.data));
            } else {
                alert("No Data Found");
            }
        }
    }

    keyExtractor = (item, index) => item.id;
    renderItem = itemData => {

        return (
            <TouchableOpacity onPress={() => this._onPress(itemData)}>
                <View style={MyKidsScreenStyle.rowContainer}>

                    <Avatar
                        small
                        source={itemData.item.gender = 1 ? boy_mykid : girl_mykid}
                        onPress={() => console.log("Works!")}
                        containerStyle={MyKidsScreenStyle.userImage}
                    />


                    <View style={MyKidsScreenStyle.InfoContainer}>

                        <Text style={MyKidsScreenStyle.nameTextStyle}> {itemData.item.name}</Text>
                        <View style={MyKidsScreenStyle.detailsContainer}>
                            <Text style={MyKidsScreenStyle.dateSizeStyle}> {itemData.item.dob.substr(0, itemData.item.dob.indexOf('T'))} | </Text>

                            <Text style={MyKidsScreenStyle.dateSizeStyle}> Size {itemData.item.size}</Text>


                        </View>



                    </View>



                    <Avatar
                    small
                        rounded
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        icon={{name: 'edit'}}
                        containerStyle={MyKidsScreenStyle.editImage}
                    />

                </View>

            </TouchableOpacity>

        );

    }


    render() {
        return (
            <View style={MyKidsScreenStyle.container}>
                            <FAB 
                            buttonColor={Colors.TRANSLUCENT_BLACK_TEXT_SHADOW} 
                            iconTextColor="#FFFFFF" 
                            onClickAction={() => {console.log("FAB pressed")}} 
                            visible={true} 
                            iconTextComponent={<Icon name="add"/>} />

                {

                    this.state.isLoading ?
                        <View style={CommonStyles.activityIndicatorStyle}>
                            <UIActivityIndicator color='gray' />
                        </View>
                        :
                        <FlatList
                            data={this.state.myKidsData}
                            renderItem={this.renderItem}
                            numColumns={1}
                            key={"ONE COLUMN"}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={this._keyExtractor}
                        />
                }



            </View>
        );
    }


}

function mapStateToProps(state) {

    return {
        MyKidsReducer: state.MyKidsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyKidsScreen);