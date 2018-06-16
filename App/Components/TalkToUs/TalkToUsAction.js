import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const clearResponse = () => {
  return {
    type: ACTION_TYPES.CLEAR_RESPONSE,
    
  };
};

export const feedBackChanged = (text) => {
    return {
      type: ACTION_TYPES.FEEDBACK_CHANGED,
      payload: text
    }
  };
