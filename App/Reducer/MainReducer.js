import { combineReducers } from 'redux';
import ContactReducer from '../Components/ContactComponent/ContactReducer';
import ServivePreferenceReducer from '../Components/ServicePreferenceComponent/ServicePreferenceReducer';
import KidsSelectionReducer from '../Components/KidsSelectionComponent/KidsSelectionReducer';
import ClothesBrandReducer from '../Components/ClothesBrandComponent/ClothesBrandReducer';
import WhatToBuyReducer from '../Components/WhatToBuyComponent/WhatToBuyReducer';
import SizeAndProportionReducer from '../Components/SizeAndProportionComponent/SizeAndProportionReducer';
import ChildInfoReducer from "../Components/ChildInformation/ChildInfoReducer";
import PregnancyDueDateReducer from "../Components/PregnancySelectionComponent/PregnancyDueDateReducer";
import StyleReducer from "../Components/StyleComponent/StyleReducer";
import billingInfoReducer from "../Components/BillingComponent/BillingContactReducer";
import billingInfoshipmentReducer from "../Components/BillingComponent/BillingShipmentReducer"
import TalkToUsReducer from "../Components/TalkToUs/TalkToUsReducer";
import MyBoxReducer from "../Components/MyBoxComponent/MyBoxReducer";
import TransactionReducer from "../Components/TransactionComponent/TransactionReducer";

import SignInReducer from "../Components/SignInComponent/SignInReducer";
import ProfileRerducer from "../Components/ProfileComponent/ProfileRerducer";
import MyKidsReducer from "../Components/MyKidsComponent/MyKidsReducer";
import appIntroReducer from "../Components/AppIntro/AppIntroReducer"


export default combineReducers({

	contactReducer: ContactReducer,
	servivePreferenceReducer:ServivePreferenceReducer,
	kidsSelectionReducer:KidsSelectionReducer,
	clothesBrandReducer:ClothesBrandReducer,
	whatToBuyReducer:WhatToBuyReducer,
	sizeAndProportionReducer:SizeAndProportionReducer,
	childInfoReducer:ChildInfoReducer,
	pregnancyDueDateReducer:PregnancyDueDateReducer,
	styleReducer:StyleReducer,
	talkToUsReducer:TalkToUsReducer,
	myBoxReducer:MyBoxReducer,
	appIntroReducer:appIntroReducer,
	transactionReducer:TransactionReducer,
	SignInReducer   : SignInReducer,
	ProfileRerducer : ProfileRerducer,
	MyKidsReducer   : MyKidsReducer,
	styleReducer:StyleReducer,
	billingInfoReducer:billingInfoReducer,
	billingInfoshipmentReducer:billingInfoshipmentReducer,

});