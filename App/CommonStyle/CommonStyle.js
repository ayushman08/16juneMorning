import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import Colors from '../Constants/Colors';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const window = Dimensions.get('window');


export default StyleSheet.create({

  mainContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: null,
    height: null,

  },

  container: {
    width:DEVICE_WIDTH,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#F5F5F5",

    
  },
  bottomTabIcons: { width: 36, height: 36 },
  activityIndicatorStyle: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TRANSPARENT,
    width: window.width,
    height: window.height
  },

});