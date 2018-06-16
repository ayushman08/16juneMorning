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
    FlatList,

}  from 'react-native';
import {
    clearResponse
} from "./MyBoxAction";
import {
    getKidsBoxList,
} from "../../Action/ActionCreators";
const window = Dimensions.get('window');
import Header from '../Common/Header';
import style from '../SizeAndProportionComponent/SizeAndProportionStyle'
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import HeaderHome from '../Common/HeaderHome';
import { Content, Container, Title, Button, Icon, List, ListItem, Input, Thumbnail, DeckSwiper, Card, CardItem } from 'native-base';

import Deck from './Deck';
const cards = [
    {
        name: 'One',
        image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2016/02/red-wallpaper-3D.jpg'
    },
    {
        name: 'Two',
        image: 'http://g01.a.alicdn.com/kf/HTB1U84HKpXXXXbOXpXXq6xXFXXXn/Washable-wrinkle-resistant-font-b-photo-b-font-font-b-backdrops-b-font-150cm-x-200.jpg'
    },
    {
        name: 'Three',
        image: 'http://a.rgbimg.com/cache1nGAOw/users/b/br/branox/300/mi2ZMGO.jpg'
    },
    {
        name: 'Four',
        image: 'http://files.gretastyleinitaly.webnode.it/200002182-308f5318c9/friends-forever-red-pattern.jpg'
    }
];

var selectedProductList =[]

class MyBoxScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            responseData:[],
            productList:[],
            sizeSelected:[],
            styleSelected:[],
            priceSelected:[],
            
        }

        this.checkoutItems = this.checkoutItems.bind(this);
        //this.checkout = this.checkout.bind(this)
    }
    handleSelectedServiceSize(){
        alert("hii")
    }
    componentWillMount(){
        this.getUserData()
    }

    getUserData(){
        AsyncStorage.getItem("UserInfo").then((value) => {
            console.log(value);
    
          if (value) {
              var userData = JSON.parse(value);
              this.setState({userInfo:userData});
              this.getKidsStyleBoxList()
            
          }
      }).done();
    }

   

  
    componentDidUpdate(){
     
        if(this.props.myBoxReducer.kidsBoxlistRes!=''){
            if(this.props.myBoxReducer.kidsBoxlistRes.status==='success'){
                console.log("Product List>>>"+JSON.stringify(this.props.myBoxReducer.kidsBoxlistRes.data))
                    this.setState({productList:this.props.myBoxReducer.kidsBoxlistRes.data.products})
                    this.setState({responseData:this.props.myBoxReducer.kidsBoxlistRes.data})
                   // this.getProductList();
            }
            this.props.clearResponse()
        }
    }

  

    getKidsStyleBoxList(userData){
        postData ={
            _id:"5954972e2262f132ea97a12f",
           
         }
        this.props.getKidsBoxList(postData);

    }

    selectSize(option,item,index){
         //  item.feedback.size = option
            var oldArray = [...this.state.sizeSelected];
            oldArray[this.state.productList.indexOf(item)] = option
              this.setState({
                sizeSelected: oldArray
              },() => {
                console.log(this.state.sizeSelected);})

    }

    selectStyle(option,item,index){
       // item.feedback.style = option
       var oldArray = [...this.state.styleSelected];
       oldArray[this.state.productList.indexOf(item)] = option
         this.setState({
            styleSelected: oldArray
         },() => {
           console.log(this.state.styleSelected);})
        
    }
     selectPrice(option,item,index){
       // item.feedback.price = option
       var oldArray = [...this.state.priceSelected];
       oldArray[this.state.productList.indexOf(item)] = option
         this.setState({
            priceSelected: oldArray
         },() => {
           console.log(this.state.priceSelected);})
    }

    keepItem(itemValue,index){
      

        
            if(selectedProductList.length> 0 && selectedProductList.indexOf(itemValue)!=-1){
                selectedProductList.map((item,index) => {
                    if(item._id === itemValue._id){
                        item.product_status = 'true'
                    }
              })
            }else{
                itemValue.product_status = 'true';
                console.log("Updated value>>"+JSON.stringify(itemValue))
                selectedProductList.push(itemValue)
            }
        
       
        
       
       
    }

    checkoutItems(){
        
            if(selectedProductList!=''){
                if(selectedProductList.length<this.state.productList){
                    alert("Please complete all ")
                }else{
                    console.log("Selected product list>>>"+JSON.stringify(this.state.responseData));
                    // var uppertax_rate = this.state.responseData.uppertax_rate;
                    // alert(uppertax_rate);
                }
            }
         
    }

    clearState(){
        this.setState({sizeSelected:'',styleSelected:'',priceSelected:''})
    }

    render(){
        console.log("Product list>>"+this.state.productList)
        return(
            <View style={style.mainContainer}>
                <HeaderHome checkout = {this.checkoutItems}/>
                <View style={style.titleStyleView}>
                    <Text style={[style.titleStyle,{fontWeight:"100"}]}>{Strings.BOX_SCREEN_TITLE}</Text>
                </View>
                <View style={{flex:1}}>
                <View style={{flex:1}}>
                {
                        (this.state.productList!='')
                            ?
                            <DeckSwiper dataSource={this.state.productList}
                            looping = {false}
                           
                           
                            renderEmpty={() =>
                                <View style={{ alignSelf: "center" }}>
                                  <Text>No more products availaible</Text>
                                </View>}
                            renderItem={(item,index)=>
                                <Card style={[styles.viewStyle,{height:500}]}>
                                   <View style={style.headerSection}>
                                    <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                                    <Text style={[style.textStyle,{fontSize:20}]}>{item.vendor_name}</Text>
                                    <Text style={[style.subTitle]}>{item.product_style}</Text>
                                    </View>
                                    <Text style={styles.priceStyle}>{`$${item.product_price}`}</Text>    
                                    </View>
                                    <View style={{flex:0.6}}>
                                    <Image source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} style={style.imageStyle} />
                                    </View>
                                    <View style={style.headerSection}>
                      <View style={{flex:1}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={[style.textStyle,{fontSize:15,color:Colors.TEXT_COLOR_NEW}]}>{Strings.QUANTITY}</Text>
                        <Text style={[style.textStyle,{marginLeft:10}]}>{item.product_qty}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={[style.subTitle,{fontSize:15}]}>{Strings.SIZE}</Text>
                        <Text style={[style.textStyle,{marginLeft:10,marginTop:10,fontSize:15}]}>{item.product_size}</Text>
                        </View>
                        
                    </View>  <Button rounded  style={{width:80,height:30,marginTop: 10,padding:10,justifyContent:'center',backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>this.keepItem(item,index)}>
                    <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>{Strings.KEEP}</Text>
                     </Button>
                     <Button rounded  style={{width:80,height:30,padding:10,marginTop: 10,marginLeft:10,justifyContent:'center',alignItems:'center',backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>this.sendBrandSelection()}>
                    <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>{Strings.RETURN}</Text>
                     </Button>
                      </View>  
                      <Text style={{textAlign:'center',fontSize:20}}>Share your experience</Text> 
                      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                
                <View style={{margin:10}}>
                    <Text>{Strings.SIZE}</Text>
                </View>
           
                <TouchableWithoutFeedback onPress={()=>this.selectSize(Strings.SMALL,item,index)}>
                <View style={[styles.optionStyle,this.state.sizeSelected[this.state.productList.indexOf(item)]===Strings.SMALL?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.SMALL}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.selectSize(Strings.PERFECT,item,index)}>
                <View style={[styles.optionStyle,this.state.sizeSelected[this.state.productList.indexOf(item)]===Strings.PERFECT?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.PERFECT}</Text>
                </View> 
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.selectSize(Strings.BIG,item,index)}>
                <View style={[styles.optionStyle,this.state.sizeSelected[this.state.productList.indexOf(item)]===Strings.BIG?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.BIG}</Text>
                </View>     
                </TouchableWithoutFeedback>   
                </View> 
                <View style={{flexDirection:'row'}}>
               
                <View style={{margin:10}}>
                    <Text>{Strings.STYLE}</Text>
                </View>
                
                <TouchableWithoutFeedback onPress={()=>this.selectStyle(Strings.LOVE,item,index)}>
                <View style={[styles.optionStyle,this.state.styleSelected[this.state.productList.indexOf(item)]===Strings.LOVE?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.LOVE}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.selectStyle(Strings.JUSTOK,item,index)}>
                <View style={[styles.optionStyle,this.state.styleSelected[this.state.productList.indexOf(item)]===Strings.JUSTOK?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.JUSTOK}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.selectStyle(Strings.DISLIKE,item,index)}>
                <View style={[styles.optionStyle,this.state.styleSelected[this.state.productList.indexOf(item)]===Strings.DISLIKE?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.DISLIKE}</Text>
                </View> 
                </TouchableWithoutFeedback>        
                </View> 
                <View style={{flexDirection:'row'}}>
             
                <View style={{margin:10}}>
                    <Text>{Strings.PRICE}</Text>
                </View>
                
                <TouchableWithoutFeedback onPress={()=>this.selectPrice(Strings.LOW,item,index)}>
                <View style={[styles.optionStyle,this.state.priceSelected[this.state.productList.indexOf(item)]===Strings.LOW?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.LOW}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this.selectPrice(Strings.PERFECT,item,index)}>
                <View style={[styles.optionStyle,this.state.priceSelected[this.state.productList.indexOf(item)]===Strings.PERFECT?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.PERFECT}</Text>
                </View> 
                </TouchableWithoutFeedback> 
                <TouchableWithoutFeedback onPress={()=>this.selectPrice(Strings.HIGH,item,index)}>
                <View style={[styles.optionStyle,this.state.priceSelected[this.state.productList.indexOf(item)]===Strings.HIGH?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
                    <Text>{Strings.HIGH}</Text>
                </View> 
                </TouchableWithoutFeedback>      
                </View>
                </View>   
                       
                                </Card>
                            }>
                    </DeckSwiper>
                            :
                        null

                 }
                
                
                </View>
              
                </View>    
              
                  
            </View>   
        );
    }
}

const styles = {
    viewStyle: {
      backgroundColor: 'white',
      flex:1,
      width:null,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      elevation: 5,
      flexDirection:'column',
      marginLeft:30,
      marginRight:30,
      marginTop:20,
      marginBottom:20,
      borderRadius:10,
      justifyContent:'space-between'

    },
    priceStyle:{
        marginRight:10,
        marginTop:10,
        color:'#E3AB73',
        fontWeight:'600',
        fontSize:18
    },
    optionStyle:{
        margin:10,
        borderWidth:1,
        borderRadius:20,
        padding:5,
        width:70,
        justifyContent:'center',
        alignItems:'center'
        
    }
  
  };

  function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        myBoxReducer: state.myBoxReducer
    }
}


export default connect(
    mapStateToProps,
    {
   
        getKidsBoxList,
        clearResponse
    }

)(MyBoxScreen)