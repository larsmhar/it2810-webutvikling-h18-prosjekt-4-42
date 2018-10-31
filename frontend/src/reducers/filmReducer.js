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
        return {
            ...state,
            'item':{'data':{'films':action.payload.data.updateLiked}},
            'loaded': true,
        };
    case UPDATE_WATCHED:
        return {
            ...state,
            'item':{'data':{'films':action.payload.data.updateWatched}},
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
