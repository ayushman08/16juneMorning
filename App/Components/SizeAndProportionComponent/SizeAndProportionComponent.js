import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    Modal,
    FlatList
} from 'react-native';
import Spinner from 'react-native-spinkit';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
    clearResponse,
    clearList
} from "./SizeAndProportionAction";
import {
    getSizes,
    sendSizeAndProportion
} from "../../Action/ActionCreators";
import { Button } from 'native-base';
import Header from "../Common/Header"
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';

import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
// import AppIntro from "../AppIntro/AppIntro"
import style from './SizeAndProportionStyle';
import Card from '../Common/Card';



class SizeAndProportionComponent extends Component {
    constructor() {
        super();
        this.state = {
            onPressed: false,
            selectedIndex: '',
            selectedSize: '',
            onPressedAvg: false,
            onPressedPetite: false,
            onPressedPudgy: false,
            selectedProportion: '',
            isSpinnerVisible: false,
            userInfo: {},
            kidsDataInfo: [],
            sizeList: []
        }
    }
    componentWillMount() {
        this.getSizeList();


    }

    goToIntroScreen() {
        Actions.appIntro({ type: 'reset' })
    }
    getSizeList() {
        this.props.getSizes()

    }
    getUserData() {
        AsyncStorage.getItem("UserInfo").then((value) => {
            console.log(value);

            if (value) {
                var userData = JSON.parse(value);
                this.setState({ userInfo: userData });
                this.fillData(userData)
            }
        }).done();


    }



    fillData(userData) {
        console.log("Child data>>>" + JSON.stringify(userData));
        if (userData.kids.length > 0) {
            if (userData.kids[userData.kids.length - 1].size != '') {
                console.log("Size list>>" + JSON.stringify(this.state.sizeList));
                this.state.sizeList.map((item, index) => {
                    if (item.value === userData.kids[userData.kids.length - 1].size) {
                        this.selectSize(item, index)
                    }
                })
            }

            if (userData.kids[userData.kids.length - 1].proportion != '') {
                this.selectOption(userData.kids[userData.kids.length - 1].proportion)
            }




        }
        this.setState({ kidsDataInfo: userData.kids })
        //this.selectSize(userData.kids[userData.kids.length-1],length-1)

    }

    // componentWillReceiveProps(newProps){
    //     console.log("New props from child info>>>"+JSON.stringify(newProps))
    //     this.setState({kidsDataInfo:newProps.kids})
    //  }


    componentDidUpdate() {
        if (this.props.sizeAndProportionReducer.sendDataRes != '') {
            this.setState({ isSpinnerVisible: false })
            if (this.props.sizeAndProportionReducer.sendDataRes.status === "success") {
                AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.sizeAndProportionReducer.sendDataRes.data));
                Actions.brandSelection({ type: 'reset', kids: this.props.sizeAndProportionReducer.sendDataRes.data.kids })
            } else {
                alert(this.props.sizeAndProportionReducer.sendDataRes.message)
            }
            this.props.clearResponse()
        }

        if (this.props.sizeAndProportionReducer.sizeAndProportionRes != '') {
            if (this.props.sizeAndProportionReducer.sizeAndProportionRes.status === "success") {

                this.setState({ sizeList: this.props.sizeAndProportionReducer.sizeAndProportionRes.data })
                this.getUserData();
            } else {
                alert(this.props.sizeAndProportionReducer.sizeAndProportionRes.message)
            }
            this.props.clearList()
        }


    }

    _renderItem(item, index) {

        return (
            <TouchableWithoutFeedback onPress={() => this.selectSize(item, index)} >
                <View style={[style.itemContainer, (this.state.onPressed && this.state.selectedIndex === index) ? { backgroundColor: Colors.BACKGROUND_COLOR } : null]}>
                    <Text>{item.value}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    selectSize(item, index) {
        console.log("Item>>>" + JSON.stringify(item))
        this.setState({ onPressed: true, selectedIndex: index, selectedSize: item.value })
    }

    selectOption(option) {
        switch (option) {
            case Strings.OPTION_ONE:
                this.setState({ onPressedAvg: true, onPressedPetite: false, onPressedPudgy: false, selectedProportion: Strings.OPTION_ONE })
                break;
            case Strings.OPTION_TWO:
                this.setState({ onPressedAvg: false, onPressedPetite: true, onPressedPudgy: false, selectedProportion: Strings.OPTION_TWO })
                break;
            case Strings.OPTION_THREE:
                this.setState({ onPressedAvg: false, onPressedPetite: false, onPressedPudgy: true, selectedProportion: Strings.OPTION_THREE })
                break;
        }
    }

    sendData() {
        // Actions.brandSelection({type:'reset'})
        let kidsData = []



        if (this.state.selectedSize === '') {
            alert("Please select size")
        } else if (this.state.selectedProportion === '') {
            alert("Please select proportion")
        } else {
            console.log("New kids data from child info>>" + JSON.stringify(this.state.kidsDataInfo))
            if (this.state.kidsDataInfo.length > 0 && this.state.kidsDataInfo != '') {
                // kidsDataInfo.map((item) => {
                //     kidsData.push(kidsDataInfo);
                // })
                for (var i = 0; i < this.state.kidsDataInfo.length - 1; i++) {
                    kidsData.push(this.state.kidsDataInfo[i])
                }
            }

            postData = {
                name: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].name,
                dob: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].dob,
                gender: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].gender,
                _id: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1]._id,
                size: this.state.selectedSize,
                proportion: this.state.selectedProportion,
                fit_size: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].fit_size,
                other_brand: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].other_brand,
                brand: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].brand

            }

            kidsData.push(postData)

            postDataKids = {
                _id: this.state.userInfo._id,
                kids: kidsData,
                savedScreen: Strings.SCREEN_EIGHT
            }

            //  Actions.whattobuy({type:'reset'})
            this.setState({ isSpinnerVisible: true })
            console.log("Postdata>>>" + JSON.stringify(postDataKids));
            this.props.sendSizeAndProportion(postDataKids)
        }

    }

    goBack() {
        Actions.childDobInformation({ type: 'reset', kids: this.state.kidsDataInfo })
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <Header headerText={Strings.CHILD_INFORMATION} screenCount="03" />
                <ScrollView>
                    <View style={style.subContainer}>
                        <Text style={style.titleStyle}>{Strings.SELECT_SIZE_TITLE}</Text>
                        <View style={{ flex: 0.7 }}>
                            <FlatList
                                style={{ marginTop: 20 }}
                                data={this.state.sizeList}
                                numColumns={3}
                                contentContainerStyle={style.list}
                                renderItem={({ item, index }) => this._renderItem(item, index)} />
                        </View>
                        <Text style={style.titleStyle}>{Strings.SELECT_SIZE_TITLE_TWO}</Text>
                        <View style={style.proportionContainer}>
                            <TouchableWithoutFeedback onPress={() => this.selectOption(Strings.OPTION_ONE)} >
                                <View style={[style.proportionImage, this.state.onPressedAvg ? { backgroundColor: Colors.BACKGROUND_COLOR } : null]}>
                                    <Image source={require('../../Assets/Average.png')} />
                                    <Text style={{ marginTop: 30, fontSize: 15, fontWeight: '600' }}>{Strings.OPTION_ONE}</Text>
                                </View>
                            </TouchableWithoutFeedback >
                            <TouchableWithoutFeedback onPress={() => this.selectOption(Strings.OPTION_TWO)} >
                                <View style={[style.proportionImage, this.state.onPressedPetite ? { backgroundColor: Colors.BACKGROUND_COLOR } : null]}>
                                    <Image source={require('../../Assets/Peteti.png')} />
                                    <Text style={{ marginTop: 30, fontSize: 15, fontWeight: '600' }}>{Strings.OPTION_TWO}</Text>
                                </View>
                            </TouchableWithoutFeedback >
                            <TouchableWithoutFeedback onPress={() => this.selectOption(Strings.OPTION_THREE)} >
                                <View style={[style.proportionImage, this.state.onPressedPudgy ? { backgroundColor: Colors.BACKGROUND_COLOR } : null]}>
                                    <Image source={require('../../Assets/Pudgy.png')} />
                                    <Text style={{ marginTop: 30, fontSize: 15, fontWeight: '600' }}>{Strings.OPTION_THREE}</Text>
                                </View>
                            </TouchableWithoutFeedback >
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Button rounded style={{ width: width / 2.4, justifyContent: "center", margin: 10, alignItems: "center", backgroundColor: Colors.BUTTON_COLOR }} onPress={() => this.sendData()}>
                                <Text style={{ color: "white", textAlign: "center", fontWeight: "400", fontSize: 16 }}>NEXT</Text>
                            </Button>
                        </View>

                        <TouchableWithoutFeedback onPress={() => this.goBack()}>
                            <View>
                                <Text style={{ textAlign: "center" }}>{Strings.CAN_DO_THIS_LATER}</Text></View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.goToIntroScreen()}>
                            <View>
                                <Text style={{ textAlign: "center", marginTop: 10 }}>{Strings.CAN_DO_THIS_LATER_NEW}</Text></View>
                        </TouchableWithoutFeedback>

                    </View>
                </ScrollView>
                <Spinner
                    isVisible={this.state.isSpinnerVisible}
                    style={{ position: 'absolute', alignSelf: 'center', top: height / 2 }} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}

                />
            </View>

        );
    }
}

function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        sizeAndProportionReducer: state.sizeAndProportionReducer
    }
}


export default connect(
    mapStateToProps,
    {
        getSizes,
        sendSizeAndProportion,
        clearResponse,
        clearList
    }

)(SizeAndProportionComponent)