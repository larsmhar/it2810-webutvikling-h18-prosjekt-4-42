import { LOADING, GET_USER } from './types';

export const getUser = ( username ) => dispatch => {
    //console.log( JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster } }' } ) );
    //console.log("Typeof", typeof id)
    //console.log("fetching single film with id", id)
    console.log( 'Gotting users' );
    dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': '{ user (username: "' + username + '") { uid username } }' } ),
		  } )
        .then( res => res.json() )
        .then( user => dispatch( {
            'type': GET_USER,
            'payload': user
        } ) );
};
