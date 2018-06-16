import {
    StyleSheet,
    Platform,
} from 'react-native';
import Dimensions from 'Dimensions';
import Colors from '../../Constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        width:DEVICE_WIDTH,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#F5F5F5",
        padding:10,
        marginBottom:50
      },

    rowContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.TRANSPARENT,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_COLOR
    },
    InfoContainer: {
        flex:1,
        flexDirection: "column",
        alignItems:'flex-start',
        marginLeft:15
    },

    nameTextStyle: {
        color: Colors.BLACK,
        fontSize: 20,
        fontWeight: '400',
        paddingBottom:5
    },
    dateSizeStyle: {
        color: Colors.GRAY_COLOR,
        fontSize: 15,
        fontWeight: '400',
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    userImage: {
      
        backgroundColor:Colors.TRANSPARENT,
    },

    editImage: {
      
        backgroundColor:Colors.BLACK,
    },

    
    
});