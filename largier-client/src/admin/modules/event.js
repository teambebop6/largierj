/**
 * Created by Henry Huang.
 */
import { post } from '../../common/helpers/api';


export const DELETE_REQUESTED = 'event/DELETE_REQUESTED';
export const DELETED_SUCCESS = 'event/DELETED_SUCCESS';
export const DELETED_FAILURE = 'event/DELETED_FAILURE';

const initialState = {
  idDeleting: null,
  errors: null,
  isDeleting: false,
  idFetching: null,
  eventFetched: null,
  isFetching: false,
};

export const deleteEvent = id => (dispatch, getState) => {
  const authorization = `Bearer ${getState().auth.token}`;
  dispatch({
    type: DELETE_REQUESTED,
    payload: {
      id,
    },
  });
  return post('/api/admin/events/delete', {
    id,
  }, {
    headers: {
      Authorization: authorization,
    },
  }).then(() => {
    dispatch({
      type: DELETED_SUCCESS,
    });
  }).catch((error) => {
    dispatch({
      type: DELETED_FAILURE,
      payload: {
        errors: error.errors,
      },
    });
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_REQUESTED: {
      const { id } = action.payload;
      return {
        ...state,
        isDeleting: true,
        idDeleting: id,
      };
    }
    case DELETED_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        idDeleting: null,
      };
    case DELETED_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        isDeleting: false,
        idDeleting: null,
        errors,
      };
    }
    default:
      return state;
  }
};
