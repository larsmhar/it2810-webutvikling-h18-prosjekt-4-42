import { FETCH_FILMS, FETCH_FILM, SEARCH_FILM, LOADING, LOADED, UPDATE_LIKED, UPDATE_WATCHED, FILTER_WATCHED, FILTER_YEAR, SORT_CHANGED } from './types';
import { IP } from './constants.js';

export const fetchFilms = ( uid, skip, first, title = '', year = '', sortMethod = 'rank', filterWatched = 0 ) => dispatch => {
    console.log( filterWatched );
    console.log( 'Sortmethod in getchfilms:', sortMethod );
    dispatch( { 'type': LOADING} );
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query':
            '{ films( title:"' + title + '" year:"' + year + '" first: ' + first + ' skip: ' + skip + 'uid:' + uid + ' ' + 'sort: "' + sortMethod + '" ' + ' filterWatched: ' + filterWatched + ' )'
            + '{ movies { id title  poster watched liked } total } }' } ),
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

export const searchFilterChanged = ( sortMethod, searchString, filterWatched, year ) => dispatch => {
    dispatch( {
        'type': SEARCH_FILM,
        'payload': {
            'searchString': searchString,
            'filterWatched': filterWatched,
            'year': year,
            'sortMethod': sortMethod
        }

    } );
};

export const searchTitle = ( searchString ) => dispatch => {
    dispatch( {
        'type': SEARCH_FILM,
        'payload': searchString
    } );
};

export const filterWatched = ( filterWatched ) => dispatch => {
    dispatch( {
        'type': FILTER_WATCHED,
        'payload': filterWatched
    } );
};

export const filterYear = ( year ) => dispatch => {
    dispatch( {
        'type': FILTER_YEAR,
        'payload': year
    } );
};

export const sortChanged = ( sortMethod ) => dispatch => {
    dispatch( {
        'type': SORT_CHANGED,
        'payload': sortMethod
    } );
};

export const fetchFilm = ( mid, uid, first, skip ) => dispatch => {
    //console.log( JSON.stringify( { 'query': '{ films (id: ' + '"' + id + '"' + ') { id title poster } }' } ) );
    //console.log("Typeof", typeof id)
    //console.log("fetching single film with id", id)
    dispatch( { 'type': LOADING} );
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': '{ films (uid: ' + uid + ' mid: "' + mid + '" first: ' + first + ' skip: ' + skip + ') { movies { id title poster year director plot actors liked watched } } }' } ),
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
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': ' mutation {updateLiked (mid: "' + mid + '" uid:' + uid + ') {movies{ id title poster year director plot actors liked watched}} }' } ),
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
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
		  'body': JSON.stringify( { 'query': ' mutation {updateWatched (mid: "' + mid + '" uid:' + uid + ') {movies{ id title poster year director plot actors liked watched}} }' } ),
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
