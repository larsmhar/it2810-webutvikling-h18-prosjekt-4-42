import { FETCH_FILMS, FETCH_FILM, LOADING, LOADED} from './types';

export const fetchFilms = () => dispatch => {
    //console.log( 'fetching all films' );
    dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': '{ films { id title  poster } userWatched(uid:1) {id}userLiked(uid:1) {id bool} }' } ),
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

export const fetchFilm = ( id ) => dispatch => {
    //console.log( JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster } }' } ) );
    //console.log("Typeof", typeof id)
    //console.log("fetching single film with id", id)
    dispatch( { 'type': LOADING} );
    fetch( 'http://localhost:4000/graphql', {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster year director plot actors } }' } ),
		  } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': FETCH_FILM,
            'payload': film
        } ) );
};

function makeQuery() {
    return undefined;
}
