import { PAGE_FORWARDS, PAGE_BACKWARDS, RESET_PAGINATION } from './types';

export const goForwards = ( ) => dispatch => {
    dispatch( { 'type': PAGE_FORWARDS} );
};

export const goBackwards = ( ) => dispatch => {
    dispatch( { 'type': PAGE_BACKWARDS } );
};

export const resetPagination = () => dispatch => {
    dispatch( { 'type': RESET_PAGINATION } );
}
