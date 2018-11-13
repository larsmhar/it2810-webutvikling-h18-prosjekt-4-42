import { LOADING, LOADED, GET_USER, LOCAL_STORAGE_USER, LOG_OUT, ADD_USER } from '../actions/types';

const initialState = {
    'items': [],
};

export default function( state = initialState, action ) {
    switch ( action.type ) {
    case GET_USER:
        if ( !action.payload.errors ) {
            window.localStorage.setItem( 'user', JSON.stringify( action.payload ) );
        }
        return {
            ...state,
            'user': action.payload,
            'loaded': true,
        };
    case LOCAL_STORAGE_USER:
        return {
            ...state,
            'user': action.payload,
        };
    case ADD_USER:
        return {
            ...state,
            'addedUser': action.payload,
        };
    case LOG_OUT:
        window.localStorage.setItem( 'user', JSON.stringify( action.payload ) );
        return {
            ...state,
            'user': action.payload,
        };
    case LOADING:
        return {
            ...state,
            'loaded': false,
        };
    case LOADED:
        return {
            ...state,
            'loaded': true,
        };
    default:
        return state;
    }
}
