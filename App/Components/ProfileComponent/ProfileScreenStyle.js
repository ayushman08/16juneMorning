import {
    StyleSheet,
    Platform,
} from 'react-native';
import Dimensions from 'Dimensions';
import Colors from '../../Constants/Colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({

    userInfoStyle: {
        flex:0.3,
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        borderBottomWidth: 8,
        borderBottomColor: '#E9E9E9',
        
    },
    canvas: {
        height: 120,
        width: 120,
        borderRadius: 60,
        marginRight: 12
    },

    detailsInfoStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.TRANSPARENT,
        paddingLeft: 15,
        paddingRight: 15,
    },

    contactInfoStyle: {
        flex: 0.25,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: Colors.TRANSPARENT,

    },
    nameContainer: {
        flex: 0.25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: Colors.TRANSPARENT,

    },

    InfoStyle: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: Colors.TRANSPARENT,

    },

    InfoViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",

        backgroundColor: Colors.TRANSPARENT,

    },
    myBoxTextStyle: {
        fontSize: 25,
        color:Colors.GRAY_COLOR
    },
    noDataFoundText: {
        fontSize: 25,
        color:Colors.GRAY_COLOR,
        alignItems:'center',
    },
    noDataFound: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    nameStyle: {
        fontSize: 18
    },
    emailStyle: {
        flex: 0.2,
        color: Colors.GRAY_COLOR,
        fontSize: 12
    },

    numberStyle: {
        flex: 0.2,

        color: Colors.GRAY_COLOR,
        fontSize: 12
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.TRANSPARENT,

    },

    myBoxContainerStyle: {
        flex:0.7,
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        
    },

    cardViewStyle: {
        width: 230,
        height: 270,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        marginLeft: 15,
        marginTop: 20,
        flexDirection: 'column',
        padding:10
      },

      middleCardViewStyle: {
        height: 250,
        flex: 1,
        backgroundColor: Colors.WHITE,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        flexDirection: 'column',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#E9E9E9',
        shadowColor: '#E9E9E9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
      },

      ImageStyle: {
        height: "85%",
        width: "100%",
      },



});