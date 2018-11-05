import { combineReducers } from 'redux';
import filmReducer from './filmReducer';
import userReducer from './userReducer';
import pageinationReducer from './pageinationReducer';

export default combineReducers( {
    'films': filmReducer,
    'user': userReducer,
    'pageination':pageinationReducer
} );
