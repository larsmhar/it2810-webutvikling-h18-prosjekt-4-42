import { FETCH_FILMS, FETCH_FILM, LOADING, LOADED, UPDATE_LIKED, UPDATE_WATCHED } from './types';

export const fetchFilms = (uid) => dispatch => {
    console.log( 'fetching all films' );
    console.log("uid", uid)
    dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': '{ films { id title  poster } userWatched(uid: ' + uid + ') {id watched} userLiked(uid: ' + uid + ') {id liked} }' } ),
		  } )
        .then( res => {
            return res.json();
        } )
        .then( films => dispatch( {
            'type': FETCH_FILMS,
            'payload': films
        } )
        );
};

export const fetchFilm = ( mid, uid ) => dispatch => {
    //console.log( JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster } }' } ) );
    //console.log("Typeof", typeof id)
    //console.log("fetching single film with id", id)
    dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': '{ films (uid: ' + uid + ' mid: "' + mid + '") { id title poster year director plot actors liked watched } }' } ),
		  } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': FETCH_FILM,
            'payload': film
        } ) );
};

export const updateLiked = ( mid, uid ) => dispatch => {
    //console.log( JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster } }' } ) );
    //console.log("Typeof", typeof id)
    //console.log("fetching single film with id", id)
    // dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': ' mutation {updateLiked (mid: "' + mid + '" uid:' + uid + ') { id title poster year director plot actors liked watched} }' } ),
		  } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': UPDATE_LIKED,
            'payload': film
        } ) );
};

export const updateWatched = ( mid, uid ) => dispatch => {
    //console.log( JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster } }' } ) );
    //console.log("Typeof", typeof id)
    //console.log("fetching single film with id", id)
    // dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': ' mutation {updateWatched (mid: "' + mid + '" uid:' + uid + ') { id title poster year director plot actors liked watched} }' } ),
    } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': UPDATE_WATCHED,
            'payload': film
        } ) );
};

function makeQuery() {
    return undefined;
}
