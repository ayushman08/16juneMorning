import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const clearResponse = () => {
  return {
    type: ACTION_TYPES.CLEAR_RESPONSE,
    
  };
};

export const selectServiceOption = (text) => {
  return {
    type: ACTION_TYPES.SERVICE_PREF_OPTION,
    payload: text
    
  };
};
