import { FETCH_FILMS, FETCH_FILM, LOADING, LOADED, UPDATE_LIKED, UPDATE_WATCHED } from '../actions/types';

const initialState = {
    'items': [],
};

export default function( state = initialState, action ) {
    switch ( action.type ) {
    case FETCH_FILMS:
        return {
            ...state,
            'items': action.payload,
        };
    case FETCH_FILM:
        return {
            ...state,
            'item': action.payload,
            'loaded': true,
        };
    case UPDATE_LIKED:
        console.log("watchd")
        return {
            ...state,
            'stuff1': action.payload,
            'loaded': true,
        };
    case UPDATE_WATCHED:
        console.log("watchd")
        return {
            ...state,
            'stuff2': action.payload,
            'loaded': true,
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
