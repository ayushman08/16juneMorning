import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	transactionReducerRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.MAKE_PAYMENT_RES:
			return { ...state, transactionReducerRes: action.payload}
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, transactionReducerRes: ''}
        default:
			return state;
	}

};
