import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    TextInput,
    ScrollView,
    AsyncStorage,
    ImageEditor,
    Button,
    KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar, Icon } from 'react-native-elements';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'
import Drawer from "react-native-drawer";


import DashBoardScreenStyle from './DashBoardScreenStyle'


import CommonStyles from '../../CommonStyle/CommonStyle';
import Colors from '../../Constants/Colors';
import ImagePath from '../../Constants/ImagePath';
import NavDrawerStyle from './NavDrawer/NavDrawerStyle'
import ProfileScreen from '../ProfileComponent/ProfileScreen'
import MyKidsScreen from '../MyKidsComponent/MyKidsScreen'
import Strings from '../../Constants/Strings'
import drawer_cross_icon from '../../Assets/close.png';






export default class DashBoardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: 'Home',
            selectedMenuItem: 'My Profile',
            firstName: '',
            lastName: '',

            drawerType: 'overlay',
            openDrawerOffset: 100,
            closedDrawerOffset: 0,
            panOpenMask: .1,
            panCloseMask: .9,
            relativeDrag: false,
            panThreshold: .25,
            tweenHandlerOn: false,
            tweenDuration: 350,
            tweenEasing: 'linear',
            disabled: false,
            tweenHandlerPreset: null,
            acceptDoubleTap: false,
            acceptTap: false,
            acceptPan: true,
            tapToClose: true,
            negotiatePan: false,
            side: "right",
        }
    }

    state = {
        drawerVisible: false,
        active: false
    };

    closeControlPanel = () => {
        this._drawer.close();
    };

    openControlPanel = () => {
        if (this._drawer.open()) {
            this._drawer.close();
        } else if (this._drawer.close()) {
            this._drawer.open();
        }
    };

    callScreen(tag) {
        this._drawer.close();
        this.setState({ selectedMenuItem: tag });
    }

    logout() {
        this._drawer.close();
        // AsyncStorage.clear();

    }
    tabs = [
        {
            key: 'games',
            icon: 'gamepad-variant',
            barColor: Colors.WHITE,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'movies-tv',
            icon: 'movie',
            barColor: 'Colors.WHITE',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'music',
            icon: 'music-note',
            barColor: 'Colors.WHITE',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    _showSelectedScreen() {
        return (
            <View style={DashBoardScreenStyle.dashBoardViewContainer}>
                {this.navBar()}
                {this.staticView()}



            </View>
        );
    }

    bottomNavigationView() {
        return (
            <BottomNavigation
                onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                renderTab={this.renderTab}
                tabs={this.tabs}
                style={DashBoardScreenStyle.bottomNavigationStyle}

            />


        );

    }

    staticView() {

        if (this.state.selectedMenuItem == 'My Profile') {
            return (

                <ProfileScreen />
            );
        } else if (this.state.selectedMenuItem == 'My Kids') {
            return (

                <MyKidsScreen />
            );
        }


    }

    navBar() {

        return (

            <View style={NavDrawerStyle.toolBarStyle}>

                <Text style={NavDrawerStyle.headerTitle}>{this.state.headerTitle}</Text>

                <Icon
                    name='align-left'
                    type='font-awesome'
                    color={Colors.GRAY}
                    onPress={() => this.openControlPanel()} />

            </View>
        );
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )


    drawerContentView() {


        return (
            <View style={NavDrawerStyle.drawerStyle}>

              <View style={NavDrawerStyle.drawerHeaderStyle}>
              <TouchableOpacity onPress={() => this.closeControlPanel()}>
								<Image source={drawer_cross_icon} />
							</TouchableOpacity>

              </View>


                

                    <View style={NavDrawerStyle.drawerSecondPartStyle}>

                        <TouchableOpacity onPress={() => this.callScreen("My Profile")}>
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.HOME}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity >
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.MY_BOX}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.callScreen("My Kids")}>

                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.MY_KIDS}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.SHIPPING_AND_PAYMENT}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.REFERRALS}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.CREDITS}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.ORDER_HISTORY}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.logout()} >
                            <View style={NavDrawerStyle.flatListItemContainer}>


                                <Text
                                    style={NavDrawerStyle.flatListItemTitle}
                                    numberOfLines={1}>
                                    {Strings.LOGOUT}
                                </Text>

                            </View>
                        </TouchableOpacity>

                    </View>


            </View>
        );
    }

    render() {
        return (
            <View style={CommonStyles.container}>

                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type={this.state.drawerType}
                    animation={this.state.animation}
                    openDrawerOffset={this.state.openDrawerOffset}
                    closedDrawerOffset={this.state.closedDrawerOffset}
                    content={this.drawerContentView()}
                    styles={drawerStyles}
                    tapToClose={this.state.tapToClose}
                    side={this.state.side}
                    tweenHandler={(ratio) => ({
                        main: { opacity: (2 - ratio) / 2 }
                    })}
                >
                    {this._showSelectedScreen()}
                    {this.bottomNavigationView()}
                </Drawer>


                


            </View>
        );
    }
}

const drawerStyles = {
    drawer: { shadowColor: "white", shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 0 }
};