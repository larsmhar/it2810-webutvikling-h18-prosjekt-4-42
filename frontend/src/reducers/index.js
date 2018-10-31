import { combineReducers } from 'redux';
import filmReducer from './filmReducer';
import userReducer from './userReducer';

export default combineReducers( {
    'films': filmReducer,
    'user': userReducer,
} );
