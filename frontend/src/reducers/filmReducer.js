import { FETCH_FILMS, FETCH_FILM, LOADING, LOADED } from '../actions/types';

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
