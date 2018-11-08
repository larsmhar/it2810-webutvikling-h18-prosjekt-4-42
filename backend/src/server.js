const express = require( 'express' );
const graphqlHTTP = require( 'express-graphql' );
const { buildSchema } = require( 'graphql' );
const sqlite3 = require( 'sqlite3' ).verbose();
import {promisify} from 'bluebird';
import cors from 'cors';
import { triggerAsyncId } from 'async_hooks';
//https://graphql.org/graphql-js/running-an-express-graphql-server/
//https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

const db = new sqlite3.Database( '../database.db', ( err ) => {
    if ( err ) {
        console.log( err.message );
    }
    console.log( 'Connected to database' );
} );

db.get = promisify( db.get );
db.all = promisify( db.all );
db.run = promisify( db.run );

// Construct a schema, using GraphQL schema language
const schema = buildSchema( `
  type Query {
    films(mid:String, uid:Int!, year:String, title:String, first:Int!, skip:Int!, filterWatched:Int): Movies
    searchFilms(title:String, year: String, first:Int!, skip:Int!): [Movie]
    user(username:String!): User
    userWatched(uid:Int!): [Movie]
    userLiked(uid:Int!): [Movie]
},
type Mutation {
    updateLiked(mid:String!, uid:Int!): Movies
    updateWatched(mid:String!, uid:Int!): Movies
},
type Movie {
    id: String
    title: String
    released: String
    genre: String
    director: String
    plot: String
    writer: String
    runtime: String
    year: String
    awards: String
    poster: String
    imdbRating: String
    production: String
    actors: String
    watched: Int
    liked: Int
}

type User {
    uid: Int
    username: String
}

type Movies {
    movies: [Movie]
    total:Int
    offset:Int
}
` );

const updateLiked = function( args ) {
    console.log( args );
    return new Promise( ( resolve, reject ) => {
        db.get( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
            .then( function( result ) {
                if ( result ) {
                    db.run( 'UPDATE userActions SET liked = (liked | 1) - (liked & 1) WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        const newResult = {
                                            'movies': [result],
                                            'total': 1,
                                            'offset': 0
                                        };
                                        resolve( newResult );
                                    } else {
                                        reject( new Error( 'Error on updating like' ) );
                                    }
                                } );
                        } );
                } else {
                    db.run( 'INSERT INTO userActions (mid, uid, liked, watched) VALUES ($mid, $uid, 1, 0)', args.mid, args.uid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        const newResult = {
                                            'movies': [result],
                                            'total': 1,
                                            'offset': 0
                                        };
                                        resolve( newResult );
                                    } else {
                                        reject( new Error( 'Movie has no activity / ID not found' ) );
                                    }
                                } );
                        } );
                }
            } );
    } );
};

const updateWatched = function( args ) {
    const that = this;
    console.log( args );
    return new Promise( ( resolve, reject ) => {
        db.get( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
            .then( function( result ) {
                if ( result ) {
                    db.run( 'UPDATE userActions SET watched = (watched| 1) - (watched & 1) WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        const newResult = {
                                            'movies': [result],
                                            'total': 1,
                                            'offset': 0
                                        };
                                        resolve( newResult );
                                    } else {
                                        reject( new Error( 'Id not found' ) );
                                    }
                                } );
                        } );
                } else {
                    db.run( 'INSERT INTO userActions (mid, uid, watched, liked) VALUES ($mid, $uid, 1, 0)', args.mid, args.uid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND userActions.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        const newResult = {
                                            'movies': [result],
                                            'total': 1,
                                            'offset': 0
                                        };
                                        resolve( newResult );
                                    } else {
                                        reject( new Error( 'Id not found' ) );
                                    }
                                } );
                        } );
                }
            } );
    } );
};
const getFilms = function( args ) {
    const searchString = args.filterWatched ? 'SELECT * FROM movie WHERE id NOT IN (SELECT mid FROM userActions WHERE uid = ' + args.uid + ' and watched = 1)' : 'SELECT * FROM movie';

    console.log( args );
    if ( args.mid && args.uid )
        return new Promise( ( resolve, reject ) => {
            // Sqlite doesn't support full outer join >:(
            // So we need hacky solution
            // http://www.sqlitetutorial.net/sqlite-full-outer-join/
            db.get( 'SELECT * FROM movie LEFT JOIN userActions ON (userActions.mid = movie.id) WHERE movie.id = $mid1 and userActions.uid = $uid UNION SELECT *, NULL, NULL, NULL, NULL FROM movie  where movie.id = $mid2 ORDER BY uid DESC', args.mid, args.uid, args.mid ).then( function( result ) {
                if ( result ) {
                    const newResult = {
                        'movies': [result],
                        'total': 1,
                        'offset': 0
                    };
                    resolve( newResult );
                } else {
                    reject( new Error( 'Id not found' ) );
                }

            } );
        } );
    return new Promise( ( resolve, reject ) => {
        db.all( searchString ).then( function( result ) {
            if ( result ) {
                result = args.title ? result.filter( movie => movie.title.toLowerCase().includes( args.title.toLowerCase() ) ) : result;
                result = args.year ? result.filter( movie => movie.year >= args.year ) : result;
                const length = result.length;
                const newResult = {
                    'movies': result.slice( args.skip, args.skip + args.first ),
                    'total': length,
                    'offset': args.skip
                };
                // resolve( result.slice( args.skip, args.skip + args.first ) );
                resolve( newResult );
            } else {
                reject( new Error( 'Id not found' ) );
            }
        } );
    } );
};

const getUser = function( args ) {
    console.log( 'Getting user', args );
    return new Promise( ( resolve, reject ) => {
        db.get( 'SELECT * FROM user WHERE username = $username', args.username ).then( function( result ) {
            if ( result ) {
                resolve( result );
            } else {
                reject( new Error( 'Username not found' ) );
            }
        } );
    } );
};

const getWatched = function( args ) {
    return new Promise( ( resolve, reject ) => {
        db.all( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND watched = 1', args.uid ).then( function( result ) {
            if ( result ) {
                resolve( result );
            } else {
                reject( new Error( 'No watched movies!' ) );
            }
        } );
    } );
};

const getLiked = function( args ) {
    console.log( args );
    return new Promise( ( resolve, reject ) => {
        db.all( 'SELECT * FROM movie INNER JOIN userActions on movie.id = userActions.mid WHERE userActions.uid = $uid AND liked = 1', args.uid ).then( function( result ) {
            if ( result ) {
                resolve( result );
            } else {
                reject( new Error( 'No liked movies!' ) );
            }
        } );
    } );
};

const searchFilms = function( args ) {
    if ( !args.year && !args.title ) {
        return new Error( 'Please specify either year or title' );
    } else if ( args.year && args.title ) {
        return new Error( 'Please specify only year or only title' );
    }
    return new Promise( ( resolve, reject ) => {
        db.all( 'SELECT * FROM movie' ).then( function( result ) {
            if ( result ) {
                if ( args.year ) {
                    resolve( result.filter( movie => movie.year >= args.year ).slice( args.skip, args.skip + args.first ) );
                } else {
                    resolve( result.filter( movie => movie.title.toLowerCase().includes( args.title.toLowerCase() ) ).slice( args.skip, args.skip + args.first ) );
                }
            } else {
                reject( new Error( 'No movies found' ) );
            }
        } );
    } );
};

// The root provides a resolver function for each API endpoint
const root = {
    'films': getFilms,
    'searchFilms': searchFilms,
    'user': getUser,
    'userWatched': getWatched,
    'userLiked': getLiked,
    'updateLiked': updateLiked,
    'updateWatched': updateWatched,
};


const app = express();
app.use( '/graphql', cors(),
    graphqlHTTP( {
        'schema': schema,
        'rootValue': root,
        'graphiql': true,
    } )
);
app.listen( 4000 );
console.log( 'Running a GraphQL API server at localhost:4000/graphql' );
