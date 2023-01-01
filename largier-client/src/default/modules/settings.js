/**
 * Created by Henry Huang.
 */

export const LOCATE_CHANGE = 'settings/LOCATE_CHANGE';

const initialState = {
  locate: 'en',
};

export const changeLocate = locate => (dispatch) => {
  dispatch({
    type: LOCATE_CHANGE,
    payload: {
      locate,
    },
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATE_CHANGE: {
      return {
        ...state,
        locate: action.payload.locate,
      };
    }
    default:
      return state;
  }
};
