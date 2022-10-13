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

export const deleteEvents = ids => (dispatch, getState) => {
  const authorization = `Bearer ${getState().auth.token}`;
  dispatch({
    type: DELETE_REQUESTED,
    payload: ids,
  });
  return post('/api/admin/events/delete', ids, {
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

export const showEvents = ids => (dispatch, getState) => {
  const authorization = `Bearer ${getState().auth.token}`;
  return post('/api/admin/events/visible', {
    ids,
    visible: true,
  }, {
    headers: {
      Authorization: authorization,
    },
  });
};

export const hideEvents = ids => (dispatch, getState) => {
  const authorization = `Bearer ${getState().auth.token}`;
  return post('/api/admin/events/visible', {
    ids,
    visible: false,
  }, {
    headers: {
      Authorization: authorization,
    },
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_REQUESTED: {
      const { ids } = action.payload;
      return {
        ...state,
        isDeleting: true,
        idsDeleting: ids,
      };
    }
    case DELETED_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        idsDeleting: null,
      };
    case DELETED_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        isDeleting: false,
        idsDeleting: null,
        errors,
      };
    }
    default:
      return state;
  }
};
