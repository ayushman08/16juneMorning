import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	kidsBoxlistRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.KIDS_BOX_LIST_RES:
			return { ...state, kidsBoxlistRes: action.payload}
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, kidsBoxlistRes: ''}
        default:
			return state;
	}

};
