import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    TextInput,
    ScrollView,
    AsyncStorage,
    ImageEditor,
    TouchableWithoutFeedback,
    Dimensions,
    Linking,

} from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'native-base';
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    LoginButton,
    AccessToken,
} = FBSDK;

import {
    userLogin,
    forgotPassword,
    loginUser
} from "../../Action/ActionCreators";

import {
    loginUserNameChanged,
    loginPasswordChanged,
    forgotEmailChanged,
    clearForgotResponse,
    showLoading,
    resetState,
    clearResponse
} from "./SignInAction";

import { bindActionCreators } from "redux";
import {
    SkypeIndicator,
    UIActivityIndicator,
} from 'react-native-indicators';

import { Actions } from 'react-native-router-flux';
import CommonStyles from '../../CommonStyle/CommonStyle';
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import ImagePath from '../../Constants/ImagePath';
import SignInStyle from './SignInScreenStyle';
import { TextField } from 'react-native-material-textfield';
import SignInScreenStyle from './SignInScreenStyle';

const { width, height } = Dimensions.get('window');



class SignInScreen extends Component {

    constructor() {
        super();
        this.state = {
            isKeepSignedIn: false,
            isPasswordVisible: true,
            errorMsg: '',
            errorOnTextField: '',
            signIn: true,
            user: null,
            isModalVisible: false,
            email: '',
            password: '',
            isErrorOnEmailText: false,
            isErrorOnPasswordText: false,
            isLoading: false,
            isLoginWithFB: false

        };
    }





    componentDidMount() {
        this._setupFBLogin();

    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL(event) {
        console.log('handleOpenURL event.url', event.url);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: false });

        if (
            nextProps.SignInReducer.data != undefined &&
            nextProps.SignInReducer.data != ""
        ) {
            if (nextProps.SignInReducer.data.messageId == 200) {
                this.setState({ isLoading: false });
                console.log("===Login Response=====", JSON.stringify(nextProps.SignInReducer.data))
                AsyncStorage.setItem("LoginUserInfo", JSON.stringify(nextProps.SignInReducer.data));
                Actions.DashBoardScreen({ type: 'reset' });

            } else {
                this.setState({ isLoading: false });

                alert("Invalid Credential");
            }
        }
    }



    _setupFBLogin() {
        Linking.addEventListener('url', this.handleOpenURL);
        Linking.getInitialURL()

    }


    signIn() {
        //  Actions.dashboardScreen({type:'reset'});
        if (this.props.signInReducer.userName.trim() == '') {

            this.setState({ errorMsg: Strings.ERROR_EMPTY_EMAIL });
            this.setState({ errorOnTextField: 0 });
        }

        else if (this.props.signInReducer.password.trim() == '') {

            this.setState({ errorMsg: Strings.ERROR_EMPTY_PASSWORD });
            this.setState({ errorOnTextField: 0 });
        } else {

            postData = {
                username: this.props.signInReducer.userName,
                password: this.props.signInReducer.password,
            };
            this.props.showLoading();
            this.props.userLogin(postData);
        }
    }


    signInWithFacebook() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    Actions.dashboardScreen({ type: 'reset' });
                    alert('Login success with permissions: '
                        + result.grantedPermissions.toString());
                }
            },
            function (error) {
                alert('Login fail with error: ' + error);
            }
        );
    }








    onEmailChange(text) {

        this.setState({ isErrorOnEmailText: false, email: text });

    }

    onPasswordChange(text) {

        this.setState({ isErrorOnPasswordText: false, password: text });

    }


    onSingInClick() {

        // if (this.state.isSnackBarVisible) this.setState({ isSnackBarVisible: false });


        if (this.state.email != '') {

            if (this.state.password != '') {
                this.setState({ isLoading: true, isErrorOnPasswordText: false, isErrorOnEmailText: false });

                var postData = {
                    email: this.state.email,
                    password: this.state.password,
                    device_info: {
                        uuid: "123123",
                        model: "iPhone6", // need to change
                        platform: (Platform.OS == 'android') ? "android" : "ios",
                    }
                }

                this.props.loginUser(postData);



            } else {
                this.setState({ isErrorOnPasswordText: true });
            }

        } else {
            this.setState({ isErrorOnEmailText: true });
        }

    }

    onSingInWithFBClick() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    console.log('Login was successful with permissions: ', result.email);

                    // var postData = {
                    //     email: this.state.email,
                    //     password: this.state.password,
                    //     device_info: {
                    //         uuid: "123123",
                    //         model: "iPhone6", // need to change
                    //         platform: (Platform.OS == 'android') ? "android" : "ios",
                    //     }
                    // }

                    // this.props.loginUser(postData);
                }
            },
            function (error) {
                alert('Login failed with error: ' + error);
            }
        );
    }

    _gotBack() {
        Actions.appIntro();

    }

    render() {
        return (
            <View style={SignInStyle.signInContainer}>

                <View
                    animationType="slide"
                    transparent={false}
                    style={{ flex: 1 }}
                    onRequestClose={() => {
                        // alert('Modal has been closed.');
                    }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                                <Text style={{ fontSize: 20, margin: 30 }}>Welcome back to</Text>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    source={require('../../Assets/logo.png')} /></View>
                            <View style={{ marginLeft: 25, marginRight: 25, marginTop: 25, marginBottom: 5 }}>
                                <TextField
                                    baseColor="#662200"
                                    tintColor="black"
                                    textColor="grey"
                                    placeholder='EMAIL'
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={this.onEmailChange.bind(this)} />
                            </View>

                            <View style={{ marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 25 }}>
                                <TextField
                                    fontWeight="100"
                                    secureTextEntry
                                    baseColor="#662200"
                                    tintColor="black"
                                    textColor="black"
                                    placeholder='PASSWORD'
                                    // value={this.state.value}
                                    onChangeText={this.onPasswordChange.bind(this)} />
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 20, marginHorizontal: 20 }}>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({ modalVisible: false, passwordComponentVisible: true })
                                }}><View><Text style={{ fontWeight: "400", color: "#331100" }}>Forgot Password ?</Text></View></TouchableWithoutFeedback>
                            </View>
                            <Button rounded dark style={{ width: width / 1.1, justifyContent: "center", margin: 15 }} onPress={() => this.onSingInClick()}>
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "400", fontSize: 16 }}>LOGIN</Text>
                            </Button>

                            <Text style={{ textAlign: "center", margin: 7, fontWeight: "400" }}>or</Text>

                            <Button rounded style={{ width: width / 1.1, justifyContent: "center", margin: 15, backgroundColor: "#3b5998" }} onPress={() => this.onSingInWithFBClick()}>
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "400", fontSize: 16 }}>CONNECT WITH FACEBOOK</Text>
                            </Button>



                            <TouchableWithoutFeedback
                                style={{ flexDirection: "row" }}
                                onPress={() => this._gotBack()}>
                                <View style={{ flexDirection: "row", justifyContent: "center" }}><Text style={{ textAlign: "center", color: "black" }}>{"Don't have an account ? "}</Text><Text style={{ fontWeight: "400", color: "#331100" }}>Sign Up</Text></View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => this._gotBack()}>
                                <View style={{ margin: 20 }}><Text style={{ textAlign: "center", color: "#331100" }}>Back</Text></View>
                            </TouchableWithoutFeedback>
                        </View>

                    </ScrollView>
                </View>

                {
                    this.state.isLoading ?
                        <View style={CommonStyles.activityIndicatorStyle}>
                            <UIActivityIndicator color='gray' />
                        </View>
                        : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: 50,
        width: 50,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: Platform.OS === "ios" ? 15 : 5,
    },
    input: {
        flex: 1,
        width: null,
        marginLeft: 20,
        fontSize: 15

    },
    inputBox: {
        flex: 1,
        width: null,
        margin: 10,
        fontSize: 20
    }
});

function mapStateToProps(state) {

    return {
        SignInReducer: state.SignInReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);


