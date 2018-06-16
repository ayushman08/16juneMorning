import {
    StyleSheet,
    Platform,
  } from 'react-native';
  import Colors from '../../Constants/Colors';
  export default StyleSheet.create({
  
  mainContainer:{
      flex:1,
      backgroundColor:'#F5F5F5'
    
  },
  subContainer:{
      flex:1,
      marginLeft:20,
      marginRight:20,
      marginTop:20,
      alignItems:'center'
  },
  titleStyle:{
      marginTop:20,
     fontSize:18,
     fontWeight:'600',
     textAlign:'center'
  },
  list: {
    justifyContent:'center',
     flexDirection: 'row',
     flexWrap: 'wrap',
   },
   image: {
     width: 80,
     height: 50,
    
     
    
 },
 itemContainer:{
     width:60,
     height:30,
     borderBottomWidth: 1,
     padding: 5,
     margin:5,
     backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems:'center',
     flexDirection: 'row',
     borderColor: '#ddd',
     position: 'relative'
 },
 proportionContainer:{
     flexDirection:'row',
     marginTop: 20
 },
 proportionImage:{
    margin:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
   
 },
 titleStyleView:{
     marginTop:20,
     textAlign:'center',
     alignItems:'center'
 },
 headerSection:{
     flexDirection:'row',
     margin:10,
     flex:0.15,
     justifyContent:'center',
     alignItems:'center'
    
    
 },
 textStyle:{
     fontWeight:'600'
 },
 subTitle:{
     marginTop:5,
     color:Colors.TEXT_COLOR_NEW,
     fontSize:18
 },
 imageStyle:{
     margin:5,
     width:window.width,
     height:'100%',
     borderRadius:10
 }

  });