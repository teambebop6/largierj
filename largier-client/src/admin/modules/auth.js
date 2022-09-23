/**
 * Created by Henry Huang.
 */
import { post } from '../../common/helpers/api';

export const AUTH_REQUESTED = 'auth/AUTH_REQUESTED';
export const AUTH_ALLOWED = 'auth/AUTH_ALLOWED';
export const AUTH_DECLINED = 'auth/AUTH_DECLINED';

const loadAuthenticationFromCache = (state) => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const expiredDate = localStorage.getItem('expiredDate');
  if (username && token && role === 'admin' && new Date().getTime() < expiredDate) {
    Object.assign(state, {
      authenticated: true,
      username,
      token,
      role,
      expiredDate,
    });
  }
};

const initialState = {
  isAuthenticating: false,
  authenticated: false,
};
loadAuthenticationFromCache(initialState);

export const authenticate = (username, password) => (dispatch) => {
  dispatch({
    type: AUTH_REQUESTED,
  });
  return post('/api/auth/login', {
    username,
    password,
  }).then((json) => {
    if (json.data.token) {
      const {
        token, username: un, role, expiredDate,
      } = json.data;
      localStorage.setItem('username', un);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('expiredDate', expiredDate);
      dispatch({
        type: AUTH_ALLOWED,
        payload: {
          token,
          un,
          role,
          expiredDate,
        },
      });
    }
  }).catch(() => {
    dispatch({
      type: AUTH_DECLINED,
    });
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUESTED:
      return {
        ...state,
        isChecking: true,
        username: null,
        token: null,
        expiredDate: null,
      };
    case AUTH_ALLOWED:
      return {
        ...state,
        isChecking: false,
        authenticated: true,
        username: action.payload.username,
        token: action.payload.token,
        role: action.payload.role,
        expiredDate: action.payload.expiredDate,
      };
    case AUTH_DECLINED:
      return {
        ...state,
        isChecking: false,
        authenticated: false,
      };
    default:
      return state;
  }
};
