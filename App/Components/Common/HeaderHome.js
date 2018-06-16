import React , { Component }from 'react';
import { Text, View,TouchableWithoutFeedback } from 'react-native';
import COLORS from '../../Constants/Colors';


class HeaderHome extends Component {
  constructor(props){
    super(props)
    console.log("Props>>"+JSON.stringify(props));
  }
  checkout(){
    this.props.checkout();
  }
   render(){
    const { textStyle, viewStyle,textStyle1 } = styles;
    return (
      <View style={viewStyle}>
          
        <Text style={textStyle1}>My Box</Text>
       <TouchableWithoutFeedback>
        <Text style={[textStyle,{color:'black'}]}>Prev</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress = {() => this.checkout()}>
        <Text style={textStyle}>CheckOut</Text>
        </TouchableWithoutFeedback>
  
      </View>
    );
   }
 

  
};

const styles = {
  viewStyle: {
    flexDirection:'row',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    margin:5,
    color:'#E3AB73'
   
  },
  textStyle1: {
    flex:1,
    marginLeft: 10,
    
    fontSize: 20,
    textColor:'#E3AB73',
    fontWeight:"800"
  }
};

// Make the component available to other parts of the app
export default HeaderHome;