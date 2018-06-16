import {
    StyleSheet,
    Platform,
    Image,
    StatusBar
} from 'react-native';
import Dimensions from 'Dimensions';
import Colors from '../../../Constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const window = Dimensions.get('window');

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 75 : 56;

export default StyleSheet.create({

    headerTitle: {
       
        color: Colors.TEXT_COLOR,
       
        fontSize: 20,
        
      },


    toolBarStyle: {
        backgroundColor: Colors.WHITE,
        height: APPBAR_HEIGHT,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    drawerStyle: {
        backgroundColor: Colors.DRAWER_BACKGROUND_COLOR,
        flex:1,
    },

    drawerSecondPartStyle: {
        backgroundColor: Colors.TRANSPARENT,
        flex:0.85,
        flexDirection:'column',
       
    },

    drawerHeaderStyle: {
        backgroundColor: Colors.TRANSPARENT,
        flex:0.15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        width:'90%',
       
    },
    flatListItemContainer: {
        
        flexDirection: 'row',
        height: 65,
        width:'90%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:Colors.TRANSPARENT,
     
        
    },

    flatListItemTitle: {
        flex:1,
        color: Colors.WHITE,
        justifyContent: "center",
        fontSize: 20,
        width:"70%",
        alignItems: "center",
        alignSelf:'center',
        textAlign:'right'
        
      },
    
});