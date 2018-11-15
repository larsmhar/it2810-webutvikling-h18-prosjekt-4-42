import { FETCH_FILMS, FETCH_FILM, SEARCH_FILM, LOADING, UPDATE_LIKED, UPDATE_WATCHED, FILTER_WATCHED, FILTER_YEAR, SORT_CHANGED } from './types';
import { IP } from './constants.js';

// Fetches the films for Filmspage
export const fetchFilms = ( uid, skip, first, title = '', year = '', sortMethod = 'rank', filterWatched = 0 ) => dispatch => {
    dispatch( { 'type': LOADING} );
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query':
            '{ films( title:"' + title + '" year:"' + year + '" first: ' + first +
            ' skip: ' + skip + 'uid:' + uid + ' ' + 'sort: "' + sortMethod + '" ' + ' filterWatched: ' + filterWatched + ' )' +
            '{ movies { id title  poster watched liked } total } }' } ),
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

// Updates all of the filter/sort/search fields in the store
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

// Updates searchTitle in the store
export const searchTitle = ( searchString ) => dispatch => {
    dispatch( {
        'type': SEARCH_FILM,
        'payload': searchString
    } );
};

// Updates filterWatched in the store
export const filterWatched = ( filterWatched ) => dispatch => {
    dispatch( {
        'type': FILTER_WATCHED,
        'payload': filterWatched
    } );
};

// Updates filterYear in the store
export const filterYear = ( year ) => dispatch => {
    dispatch( {
        'type': FILTER_YEAR,
        'payload': year
    } );
};

// Updates sortChanged in the store
export const sortChanged = ( sortMethod ) => dispatch => {
    dispatch( {
        'type': SORT_CHANGED,
        'payload': sortMethod
    } );
};

// Fetches a specific film for the Film page
export const fetchFilm = ( mid, uid, first, skip ) => dispatch => {
    dispatch( { 'type': LOADING} );
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query': '{ films (uid: ' + uid + ' mid: "' + mid + '" first: ' + first + ' skip: ' + skip + ')' +
            '{ movies { id title poster year director plot actors liked watched } } }' } ),
		  } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': FETCH_FILM,
            'payload': film
        } ) );
};

// Updates a movies liked status
export const updateLiked = ( mid, uid ) => dispatch => {
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query': ' mutation {updateLiked (mid: "' + mid + '" uid:' + uid + ')' +
            '{movies{ id title poster year director plot actors liked watched}} }' } ),
		  } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': UPDATE_LIKED,
            'payload': film
        } ) );
};

// Updates a movies watched status
export const updateWatched = ( mid, uid ) => dispatch => {
    fetch( IP, {
	  'method': 'POST',
	    'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify( { 'query': ' mutation {updateWatched (mid: "' + mid + '" uid:' + uid + ')' +
            '{movies{ id title poster year director plot actors liked watched}} }' } ),
    } )
        .then( res => res.json() )
        .then( film => dispatch( {
            'type': UPDATE_WATCHED,
            'payload': film
        } ) );
};
