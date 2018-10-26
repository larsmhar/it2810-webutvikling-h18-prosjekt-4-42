import { FETCH_FILMS, FETCH_FILM } from '../actions/types';

const initialState = {
    'items': [],
};

export default function( state = initialState, action ) {
    console.log( action.type, action.payload );
    switch ( action.type ) {
    case FETCH_FILMS:
        console.log( 'reducing' );
        return {
            ...state,
            'items': action.payload
        };
    case FETCH_FILM:
        console.log( action.type, action.payload );
        return {
            ...state,
            'item': action.payload
        };
    default:
        return state;
    }
}
