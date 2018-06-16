// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//     Image,
//     View,
//     Text,
//     AsyncStorage,
//     StyleSheet,
//     ImageBackground,
//     ScrollView,
//     Dimensions,
//     TouchableWithoutFeedback,
//     Modal,
//     FlatList
// }  from 'react-native';
// import {
//     clearResponse
// } from "./StyleAction";
// import {
//     getStyleList
// } from "../../Action/ActionCreators";
// const window = Dimensions.get('window');
// import Header from '../Common/Header';
// import style from '../SizeAndProportionComponent/SizeAndProportionStyle'
// import Colors from '../../Constants/Colors';
// import Strings from '../../Constants/Strings';
// const {height,width}= Dimensions.get('window');
// const BASE_URL = 'http://52.34.207.5:5032/';

// class StyleComponent extends Component{
//     constructor(){
//         super();
//         this.state ={
//             userInfo:{},
//             styleRes:{},

//         }
//     }

//     componentWillMount(){
//        this.getUserData();
//        this.getStyleListChild();

//     }

//      componentWillReceiveProps(nextProps) {
//         // console.log("====== Billing Response ========" + JSON.stringify(nextProps.billingInfoReducer.billingRes));

//         if(nextProps.billingInfoReducer.billingRes!=''){
//                        this.setState({isSpinnerVisible:false})

//                        //alert(this.props.billingInfoReducer.billingRes)
//                     if(nextProps.billingInfoReducer.billingRes.status==="success"){
//                               // this.setState({signUpData:this.props.contactreducer.signupRes.data})

//                          AsyncStorage.setItem("UserInfo", JSON.stringify(nextProps.billingInfoReducer.billingRes));
//                          console.log("HelloResponse"+nextProps.billingInfoReducer.billingRes)
//                           Actions.servicePreferences({type:"reset"})
//                        }else{
//                            alert(nextProps.billingInfoReducer.billingRes.message);
//                        }
//                         this.props.clearResponse();
//                    }
//     }

//     getUserData(){
//         AsyncStorage.getItem("UserInfo").then((value) => {
//             console.log(value);

//           if (value) {
//               var userData = JSON.parse(value);
//               this.setState({userInfo:userData});


//           }
//       }).done();
//     }


//       getStyleListChild(){
//         postData = {
//                  userId:this.state.userInfo._id,
//                  kid_no:1
//         }
//         this.props.getStyleList(postData)
//     }


//     _renderItem(item,index){

//         return (
//             <TouchableWithoutFeedback onPress={() => this.selectSize(item,index)} >

//             <View style={[{height:300,width: width/2.3},(this.state.onPressedBrand && this.state.selectedIndexes.indexOf(index)!=-1)?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
//             <Image style={{height:280,width:200}} source={{uri:BASE_URL+item.image_path}} />
//             </View>

//             </TouchableWithoutFeedback>
//         )
//     }


//     selectSize(item, index){
//     //  this.setState({})

//     }

//     render(){


//         return(
//             <View style={style.mainContainer}>
//             <Header headerText={Strings.STYLE_INFORMATION} screenCount="03" />
//             <View style={style.subContainer}>
//             <Text style={style.titleStyle}>{Strings.STYLE_INFO_TITLE}</Text>
//             </View>    


//             <View style={{flex:1}}>
//              <FlatList
//                 style ={{marginTop:20}} 
//                 data={this.props.styleReducer.styleListRes.data}
//                 numColumns={2}
//                 contentContainerStyle={style.list}
//                 renderItem={({item,index}) => this._renderItem(item,index)}/>

//                 </View>

//             </View>    

//         );
//     }

// }

// function mapStateToProps(state) {
//     console.log('mapStateToProps= ', JSON.stringify(state));
//     return {
//         styleReducer: state.styleReducer
//     }
// }


// export default connect(
//     mapStateToProps,
//     {
//     getStyleList,
//     clearResponse,
//     }

// )(StyleComponent)

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
import { Button } from 'native-base';
import {
    clearResponse
} from "./StyleAction";
import {
    styleSignup,
    getStyleList
} from "../../Action/ActionCreators";
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
import Header from '../Common/Header';
import style from '../SizeAndProportionComponent/SizeAndProportionStyle'
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import Spinner from 'react-native-spinkit';
const BASE_URL = 'http://52.34.207.5:5032/';

class StyleComponent extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: {},
            styleRes: {},
            onPressedBrand: false,
            selectedSize: '',
            selectedIndex: '',
            selectedIndexes: [],
            imageList: [],
            brandList: [],
            itemObjectSelected: [],
            isSpinnerVisible: false,
            enrolledKids: '',
            kidsDataInfo: []


        }
    }

    componentWillMount() {
        this.getUserData();



    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    getUserData() {
        AsyncStorage.getItem("UserInfo").then((value) => {
            console.log(value);

            if (value) {
                var userData = JSON.parse(value);
                this.setState({ userInfo: userData });
                this.fillData(userData);
                this.getStyleListChild();
            }
        }).done();
        AsyncStorage.getItem("EnrolledKids").then((value) => {
            console.log(value);

            if (value) {
                var userData = JSON.parse(value);
                this.setState({ enrolledKids: userData });
            }
        }).done();
    }


    fillData(userData) {
        console.log("Child data step 3>>>" + JSON.stringify(userData));
        if (userData.kids.length > 0) {

        }
        this.setState({ kidsDataInfo: userData.kids })
        //this.selectSize(userData.kids[userData.kids.length-1],length-1)

    }



    getStyleListChild() {
        postData = {
            userId: this.state.userInfo._id,
            //  userId:"5b1e3e5aa97a5c420319b07b",
            kid_no: 1
        }

        this.props.getStyleList(postData)
    }







    componentDidUpdate() {
        //  alert(JSON.stringify(this.props.styleReducer.styleListRes))
        if (this.props.styleReducer.styleListRes != '') {
            if (this.props.styleReducer.styleListRes.status === "success") {
                // this.setState({isSpinnerVisible: false})


                console.log("RESPONSE......" + this.props.styleReducer.styleListRes.data)


            }
            else {
                alert(this.props.styleReducer.styleListRes.data.message)
            }



        }


        if (this.props.styleReducer.selectedstyleListRes != '') {

            if (this.props.styleReducer.selectedstyleListRes.status === "success") {
                this.setState({ isSpinnerVisible: false })
                console.log("RESPONSE..dfdsdf...." + JSON.stringify(this.props.styleReducer.selectedstyleListRes.data))


                if (this.state.enrolledKids != '' && this.state.enrolledKids >= 1) {
                    console.log("enrolled kids 1>>>" + this.state.enrolledKids);
                    if (this.props.styleReducer.selectedstyleListRes.data.kids.length != this.state.enrolledKids) {
                        console.log("enrolled kids 2>>>" + this.state.enrolledKids);
                        AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.styleReducer.selectedstyleListRes.data));
                        //Actions.childDobInformation({type:'reset',childData:this.props.clothesBrandReducer.brandDataRes.data})
                        Actions.childDobInformation({ type: 'reset', fromscreen: 'style' });
                    } else {
                        console.log("enrolled kids 3>>>" + this.state.enrolledKids);
                        Actions.talktoUs({ type: 'reset' })
                    }

                }
                //    if(this.state.enrolledKids!='' && this.state.enrolledKids>=1){
                //         console.log("enrolled kids 1>>>"+this.state.enrolledKids);
                //         if(this.props.clothesBrandReducer.brandDataRes.data.kids.length!=this.state.enrolledKids){
                //             console.log("enrolled kids 2>>>"+this.state.enrolledKids);
                //             // Actions.childDobInformation({type:'reset',childData:this.props.clothesBrandReducer.brandDataRes.data})
                //         }else{
                //             console.log("enrolled kids 3>>>"+this.state.enrolledKids);
                //            Actions.talktoUs({type:'reset'})
                //         }

                //     }

                //this.setState({styleRes:this.props.styleReducer.styleListRes.data})
            }


        }
    }

    _renderItem(item, index) {

        return (

            <TouchableWithoutFeedback onPress={() => this.selectSize(item, index)} >
                {/* <View style={[{height:280,width:width/2.3},(this.state.onPressedBrand && this.state.selectedIndexes.indexOf(index)!=-1)?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>  */}
                <View style={{ height: 280, width: width / 2.3, marginLeft: 10, marginBottom: 10, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ height: 220, width: width / 2.5 }} source={{ uri: BASE_URL + item.image_path }} />
                    <View style={{ flexDirection: "row", paddingLeft: width / 3, paddingTop: 10 }}>
                        <Image source={(this.state.selectedIndexes.indexOf(index) != -1) ? require('../../Assets/heartena.png') : require('../../Assets/heartdis.png')} />
                        {/* </View> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    selectSize(item, index) {
        var selctedIndex = this.state.selectedIndexes.indexOf(index)
        if (selctedIndex != -1) {

            this.state.selectedIndexes.splice(selctedIndex, 1)
            this.state.itemObjectSelected.splice(selctedIndex, 1);

        }
        else {
            this.state.selectedIndexes.push(index)
            this.state.itemObjectSelected.push(item);
        }

        this.setState({ onPressedBrand: true, selectedIndex: index })
        //  alert(JSON.stringify(this.state.selectedIndexes))
        //  alert(JSON.stringify(this.state.itemObjectSelected))
    }


    submit() {


        //    if(!this.state.selectedIndexes){
        //        alert("Please select style")
        //    }
        let kidsData = []
        if (this.state.kidsDataInfo.length > 0 && this.state.kidsDataInfo != '') {
            // kidsDataInfo.map((item) => {
            //     kidsData.push(kidsDataInfo);
            // })
            for (var i = 0; i < this.state.kidsDataInfo.length - 1; i++) {
                kidsData.push(this.state.kidsDataInfo[i])
            }
            postData = {
                name: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].name,
                dob: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].dob,
                gender: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].gender,
                size: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].size,
                _id: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1]._id,
                proportion: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].proportion,
                fit_size: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].fit_size,
                other_brand: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].other_brand,
                brand: this.state.kidsDataInfo[this.state.kidsDataInfo.length - 1].brand,
                style: this.state.itemObjectSelected,

            }
            kidsData.push(postData)

            postDataKids = {
                _id: this.state.userInfo._id,
                kids: kidsData,
                savedScreen: Strings.SCREEN_NINE
            }
            this.setState({ isSpinnerVisible: true })
            console.log("Postdata>>>" + JSON.stringify(postDataKids));
            this.props.styleSignup(postDataKids);

        }


    }


    goBack() {
        Actions.brandSelection({ type: 'reset' })
    }

    goToIntroScreen() {
        Actions.appIntro({ type: 'reset' })
    }


    render() {


        return (
            <View style={style.mainContainer}>
                <Header headerText={Strings.STYLE_INFORMATION} screenCount="03" />
                <View>
                    <Text style={style.titleStyle}>{Strings.STYLE_INFO_TITLE}</Text>
                </View>
                <ScrollView style={{flex:0.7}}>
             <FlatList
                style ={{marginTop:20}} 
                data={this.props.styleReducer.styleListRes.data}
                 numColumns={2}
                 contentContainerStyle={style.list}
                renderItem={({item,index}) => this._renderItem(item,index)}/>

       
             

             
             
             
             <Spinner
             isVisible={this.state.isSpinnerVisible}
             style={{position:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
            />


        </ScrollView>

            <View style={{flex:0.3}}>

            <View style={{justifyContent:"space-around",alignItems:"center"}}>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR,padding:0}} onPress={()=>{this.submit()}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"800", fontSize: 16,fontFamily:"Roboto"}}>{Strings.NEXT}</Text>
             </Button>
             </View>

        
             <TouchableWithoutFeedback onPress={() => this.goBack()}>
             <View>
             <Text style={{textAlign:"center"}}>{Strings.HOME}</Text></View>
             </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.goToIntroScreen()}>
             <View>
             <Text style={{textAlign:"center",marginTop:10}}>{Strings.CAN_DO_THIS_LATER_NEW}</Text></View>
             </TouchableWithoutFeedback>
             </View>

             </View>
                <Spinner
                        isVisible={this.state.isSpinnerVisible}
                        style={{ position: 'absolute', alignSelf: 'center', top: window.height / 2 }} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
                    />

            </View>

        );
    }

}


function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        styleReducer: state.styleReducer
    }
}


export default connect(
    mapStateToProps,
    {
        styleSignup,
        getStyleList,
        clearResponse,
    }

)(StyleComponent)