import { PAGE_FORWARDS, PAGE_BACKWARDS, RESET_PAGINATION } from '../actions/types';

const initialState = {
    'pageination': 0,
};

export default function( state = initialState, action ) {
    switch ( action.type ) {
    case PAGE_FORWARDS:
        return {
            ...state,
            'pageination': state.pageination + 1
        };
    case PAGE_BACKWARDS:
        return {
            ...state,
            'pageination': state.pageination - 1
        };
    case RESET_PAGINATION:
        return {
            ...state,
            'pageination': state.pageination = 0,
        }
    default:
        return state;
    }
}
