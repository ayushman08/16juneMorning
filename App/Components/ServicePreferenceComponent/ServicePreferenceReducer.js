import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	serviceprefRes:'',
	selectOption:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.HOME_PROPERTY_LIST_FETCHING_DATA:
			return { ...state, isHomeScreenLoading: true }

		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;
		case ACTION_TYPES.SERVICE_PREF_OPTION:
		return { ...state, selectOption: action.payload };

        case ACTION_TYPES.SERVICE_PREF_RES:
			return { ...state, serviceprefRes: action.payload, isHomeScreenLoading: false }
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, serviceprefRes: '', isHomeScreenLoading: false }

		


		default:
			return state;
	}

};
