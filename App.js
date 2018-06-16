import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Actions, Router, Reducer, Scene } from 'react-native-router-flux';
import SplashScreen from './App/Components/SplashComponent/SplashScreen';
import AppIntro from "./App/Components/AppIntro/AppIntro"
import ContactComponent from "./App/Components/ContactComponent/ContactComponent"
import ServicePreferences from "./App/Components/ServicePreferenceComponent/ServicePreferenceComponent"
import ServicePreferencesDecided from "./App/Components/ServicePreferenceComponent/ServiceComponentDecideCompoenent"
//import ChildInformationSize from "./App/Components/ChildInformation/ChildInformationSize"
import KidsSelectionComponent from "./App/Components/KidsSelectionComponent/KidsSelectionComponent"
import WhatToBuyComponent from "./App/Components/WhatToBuyComponent/WhatToBuyComponent"
import PregnancySelection from "./App/Components/PregnancySelectionComponent/PregnancySelection"
import BrandSelection from "./App/Components/ClothesBrandComponent/ClothesBrandComponentNew"
import SizeAndProportion from "./App/Components/SizeAndProportionComponent/SizeAndProportionComponent"
import PregnancyDueDate from "./App/Components/PregnancySelectionComponent/PregnancyDueDate";
import ChildDobInformation from "./App/Components/ChildInformation/ChildInformationDOB";
import StyleComponent from "./App/Components/StyleComponent/StyleComponent";
import TalkToUsComponent from "./App/Components/TalkToUs/TalkToUs";
import TransactionComponent from "./App/Components/TransactionComponent/TransactionComponent";
import MyBoxScreen from "./App/Components/MyBoxComponent/MyBoxScreen";
import GlobalFont from 'react-native-global-font'
import SignInScreen from "./App/Components/SignInComponent/SignInScreen";
import DashBoardScreen from "./App/Components/DashBoardComponent/DashBoardScreen";
import BillingContactInformation from "./App/Components/BillingComponent/BillingContactInformation";
import BillingShipmentComponent from "./App/Components/BillingComponent/BillingShipmentComponent";


const scenes = Actions.create(
  <Scene key="root">

    <Scene key="SplashScreen" component={SplashScreen}
      hideNavBar={true}
      initial

    />

    <Scene key="appIntro" component={AppIntro}
      hideNavBar={true}
      

    />

    <Scene key="contact" component={ContactComponent}
      hideNavBar={true}
    />

    <Scene key="servicePreferences" component={ServicePreferences}
      hideNavBar={true}

    />

    <Scene key="servicePreferencesdecided" component={ServicePreferencesDecided}
      hideNavBar={true}

    />



    <Scene key="kidsselection" component={KidsSelectionComponent}
      hideNavBar={true}

    />

    <Scene key="whattobuy" component={WhatToBuyComponent}
      hideNavBar={true}

    />
    <Scene key="pregnancyselection" component={PregnancySelection}
      hideNavBar={true}

    />

    <Scene key="brandSelection" component={BrandSelection}
      hideNavBar={true}

    />

    <Scene key="sizeandproportion" component={SizeAndProportion}
      hideNavBar={true}

    />

    <Scene key="pregnancyduedate" component={PregnancyDueDate}
      hideNavBar={true}
    />

    <Scene key="childDobInformation" component={ChildDobInformation}
      hideNavBar={true}


    />
    <Scene key="stylecomponent" component={StyleComponent}
      hideNavBar={true}


    />

    <Scene key="talktoUs" component={TalkToUsComponent}
      hideNavBar={true}


    />

    <Scene key="transactioncomponent" component={TransactionComponent}
      hideNavBar={true}


    />

    <Scene key="boxscreen" component={MyBoxScreen}
      hideNavBar={true}


    />

    <Scene key="SignInScreen" component={SignInScreen}
      hideNavBar={true}
    />

    <Scene key="DashBoardScreen" component={DashBoardScreen}
      hideNavBar={true}

    />

      <Scene key="billingContactInformation" component={BillingContactInformation}
      hideNavBar={true}
/>

  <Scene key="billingshipmentInformation" component={BillingShipmentComponent}
      hideNavBar={true}

    />






  </Scene>





);

export default class App extends Component {

  constructor() {
    super();
    context = this;
    this.state = {
      initLoaded: false,
    };

    // GLOBAL.AppGlobalConfig = AppGlobalConfig;

    // AppGlobalConfig.init().finally(() => {
    //   SplashScreen.hide();
    //   this.setState({
    //     initLoaded: true,
    //   });
    // });
  }

  componentDidMount() {
    let fontName = 'SF UI Display'
    GlobalFont.applyGlobal(fontName)
  }

  render() {
    return (
      <Router
        scenes={scenes}
      />
    );
  }
}
