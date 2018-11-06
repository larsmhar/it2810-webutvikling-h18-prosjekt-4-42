import { FETCH_FILMS, SEARCH_FILM, FETCH_FILM, LOADING, LOADED, UPDATE_LIKED, UPDATE_WATCHED, FILTER_WATCHED, FILTER_YEAR } from '../actions/types';


const initialState = {
    'items': [],
    'searchString':'',
    'year':''
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
    case SEARCH_FILM:
        return {
            ...state,
            'searchString': action.payload,
            'loaded': true,
        };
    case FILTER_WATCHED:
        return {
            ...state,
            'filterWatched': action.payload ? 1 : 0,
            'loaded': true,
        };
    case FILTER_YEAR:
        return {
            ...state,
            'year': action.payload,
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
