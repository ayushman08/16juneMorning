import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {
	isScreenLoading:false,
	data : '',
}
 
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

		case ACTION_TYPES.VALIDATE_USER:
            return { ...state, data: action.payload,isScreenLoading:false }
            
		default:
			return state;
	}

};
