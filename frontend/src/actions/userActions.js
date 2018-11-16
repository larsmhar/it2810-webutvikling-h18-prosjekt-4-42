import { LOADING, GET_USER, LOCAL_STORAGE_USER, LOG_OUT, ADD_USER } from './types';
import { IP } from './constants.js';

// Gets a user and "logs in"
export const getUser = ( username ) => dispatch => {
    dispatch( { 'type': LOADING} );
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query': '{ user (username: "' + username + '")' +
            '{ uid username } }'
        } ),
		  } )
        .then( res => res.json() )
        .then( user => dispatch( {
            'type': GET_USER,
            'payload': user
        } ) );
};

// Creates a new user
export const addUser = ( username ) => dispatch => {
    dispatch( { 'type': LOADING} );
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query': 'mutation { addUser (username: "' + username + '")' +
            '{ uid username } }' } ),
		    } )
        .then( res => res.json() )
        .then( user => dispatch( {
            'type': ADD_USER,
            'payload': user
        } ) );
};

// Checks if you're already logged in
export const getLocalStorageUser = ( userData ) => dispatch => {
    dispatch( {
        'type': LOCAL_STORAGE_USER,
        'payload': userData,
    } );
};

export const logOut = () => dispatch => {
    dispatch( {
        'type': LOG_OUT,
        'payload': {'data':
            {
                'user': null
            }
        }
    } );
};
