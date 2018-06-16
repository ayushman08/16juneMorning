import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

    talkToUsRes:'',
    feedback:''

	
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.TALK_TO_US_RES:
        console.log("From reducer>>>"+JSON.stringify(action.payload));
            return { ...state, talkToUsRes: action.payload}
		case ACTION_TYPES.CLEAR_RESPONSE:
            return { ...state, talkToUsRes: ''}
        case ACTION_TYPES.FEEDBACK_CHANGED:
			return { ...state, feedback: action.payload}
	
        default:
			return state;
	}

};
