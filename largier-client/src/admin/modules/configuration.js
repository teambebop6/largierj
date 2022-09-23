/**
 * Created by Henry Huang.
 */
import { get, post } from '../../common/helpers/api';

export const FETCH_REQUESTED = 'configuration/FETCH_REQUESTED';
export const FETCH_SUCCESS = 'configuration/FETCH_SUCCESS';
export const FETCH_FAILURE = 'configuration/FETCH_FAILURE';

export const SAVE_REQUESTED = 'configuration/SAVE_REQUESTED';
export const SAVED_SUCCESS = 'configuration/SAVED_SUCCESS';
export const SAVED_FAILURE = 'configuration/SAVED_FAILURE';

const initialState = {
  errors: null,
  isSaving: false,
  isFetching: false,
  configurationFetched: null,
};

export const fetchConfiguration = () => (
  (dispatch, getState) => {
    const authorization = `Bearer ${getState().auth.token}`;
    dispatch({
      type: FETCH_REQUESTED,
    });
    return get('/api/admin/configurations', {
      headers: {
        Authorization: authorization,
      },
    }).then((configuration) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          configuration,
        },
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_FAILURE,
        payload: {
          errors: error.errors,
        },
      });
    });
  });

export const saveConfiguration = data => ((dispatch, getState) => {
  const authorization = `Bearer ${getState().auth.token}`;
  dispatch({
    type: SAVE_REQUESTED,
  });
  return post('/api/admin/configurations', data, {
    headers: {
      Authorization: authorization,
    },
  }).then((configuration) => {
    dispatch({
      type: SAVED_SUCCESS,
      payload: {
        configuration,
      },
    });
  }).catch((error) => {
    dispatch({
      type: SAVED_FAILURE,
      payload: {
        errors: error.errors,
      },
    });
  });
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        configurationFetched: action.payload.configuration,
      };
    case FETCH_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    case SAVE_REQUESTED: {
      return {
        ...state,
        isSaving: true,
      };
    }
    case SAVED_SUCCESS:
      return {
        ...state,
        isSaving: false,
        configurationFetched: action.payload.configuration,
      };
    case SAVED_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        isSaving: false,
        errors,
      };
    }
    default:
      return state;
  }
};
