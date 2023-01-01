/**
 * Created by Henry Huang.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import adminReducers from './admin/reducers';
import defaultReducers from './default/reducers';

const reducers = Object.assign({ routing: routerReducer }, defaultReducers, adminReducers);

export default combineReducers(reducers);
