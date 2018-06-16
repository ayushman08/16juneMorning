import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import {
    feedBackChanged,
    clearResponse
} from "./TalkToUsAction";
import {
    sendFeedback
} from "../../Action/ActionCreators";
import {Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from "../Common/Header"
import MaterialTextInput from 'react-native-material-textinput';
const { width, height } = Dimensions.get('window');
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import style from '../SizeAndProportionComponent/SizeAndProportionStyle';
import Spinner from 'react-native-spinkit';


class TalkToUs extends Component {
     constructor() {
        super();
        this.state = {
            isFeedback:false,
            isSpinnerVisible:false,
            userInfo:{}
     };
    }

    componentWillMount(){
        this.getUserData()
    }
    
    getUserData(){
        AsyncStorage.getItem("UserInfo").then((value) => {
            console.log("AsyncValue>>>>"+value);
    
          if (value) {
              var userData = JSON.parse(value);
              this.setState({userInfo:userData});
              
          }
      }).done();
    
    }

    onFeedbackChanged(text) { 
        this.props.feedBackChanged(text);
        this.setState({ isFeedback: true });
       // this.setState({ errorOnTextField: '' });
   }

    goToIntroScreen(){
        Actions.appIntro({type:'reset'})
     }

     sendBrandSelection(){
         
       
        postData = {
            question: this.props.talkToUsReducer.feedback,
            _id:this.state.userInfo._id,
            savedScreen:Strings.SCREEN_TEN

        }
        this.setState({isSpinnerVisible:true})
        this.props.sendFeedback(postData)
     }

   

     componentDidUpdate(){
         if(this.props.talkToUsReducer.talkToUsRes!=''){
            this.setState({isSpinnerVisible:false})
             if(this.props.talkToUsReducer.talkToUsRes.status === 'success'){
                AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.talkToUsReducer.talkToUsRes.data));
                Actions.billingContactInformation({type:'reset'}) 
                    
                
             }
             this.props.clearResponse()
         }
     }

    render() {
        return (
          <View style={style.mainContainer}>
         <Header headerText={Strings.TALK_TO_US_HEADER_TITLE} screenCount="05" />
         <View>
         <Text style={[style.titleStyle,{textAlign:'center',margin:30}]}>{Strings.TALK_TO_US_DESCRIPTION}</Text>
      
         <View style={{margin:30}}>
                     <MaterialTextInput
                            label={Strings.HINT_TEXT_TALK}
                            labelColor={Colors.LABEL_TEXT_COLOR}
                            activeColor={Colors.LABEL_TEXT_COLOR}
                            color={Colors.TEXT_COLOR}
                            fontSize={15}
                            labelActiveTop={-30}
                            underlineColor={Colors.TEXT_COLOR}
                            underlineActiveColor={Colors.TEXT_COLOR}
                            underlineHeight={0.7}
                            underlineActiveHeight={0.7}
                            autoCapitalize='none'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onChangeText={this.onFeedbackChanged.bind(this)}
                            value={this.props.talkToUsReducer.feedback}
                          
                            //onSubmitEditing={(event)=>{this.refs.lastname.focus()}}
                           
                        />

            </View>
            {
            (!this.state.isFeedback) ?  <View style={{flex:0.1}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.1}}/>
            }
           
           
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>this.sendBrandSelection()}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             <TouchableWithoutFeedback onPress={() => this.goToIntroScreen()}>
             <View>
             <Text style={{textAlign:"center",marginTop:10}}>{Strings.CAN_DO_THIS_LATER_NEW}</Text></View>
             </TouchableWithoutFeedback>
             {/* <TouchableWithoutFeedback onPress={() => this.goBack()}>
             <View>
             <Text style={{textAlign:"center"}}>{Strings.CAN_DO_THIS_LATER}</Text></View>
             </TouchableWithoutFeedback> */}
         
         </View>  
         <Spinner
             isVisible={this.state.isSpinnerVisible}
             style={{position:'absolute',alignSelf:'center',top:height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
               
         </View>  

         
        );
    }

}


const styles = {

  
  };

  function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        talkToUsReducer: state.talkToUsReducer
    }
}


export default connect(
    mapStateToProps,
    {
    feedBackChanged,
    clearResponse,
    sendFeedback
    }

)(TalkToUs)