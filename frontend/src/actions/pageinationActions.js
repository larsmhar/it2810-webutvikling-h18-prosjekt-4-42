import { PAGE_FORWARDS, PAGE_BACKWARDS } from './types';

export const goForwards = ( ) => dispatch => {
    dispatch( { 'type': PAGE_FORWARDS} );
};

export const goBackwards = ( ) => dispatch => {
    dispatch( { 'type': PAGE_BACKWARDS } );
};
