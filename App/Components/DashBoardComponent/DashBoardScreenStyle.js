import {
    StyleSheet,
    Platform,
} from 'react-native';
import Dimensions from 'Dimensions';
import Colors from '../../Constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({

    dashBoardViewContainer :{
        flex: 1,
         backgroundColor: Colors.TRANSPARENT
    },
    bottomNavigationStyle:{
        flex: 1, 
        height: 64, 
        elevation: 8, 
        position: 'absolute', 
        left: 0, 
        bottom: 0, 
        right: 0
    }

  


});