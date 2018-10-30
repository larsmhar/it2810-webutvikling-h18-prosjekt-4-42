const express = require( 'express' );
const graphqlHTTP = require( 'express-graphql' );
const { buildSchema } = require( 'graphql' );
const sqlite3 = require( 'sqlite3' ).verbose();
import {promisify} from 'bluebird';
import cors from 'cors';
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
    films(id:String, year:String): [Movie]
    user(username:String!): User
    userWatched(uid:Int!): [Movie]
    userLiked(uid:Int!): [Movie]
},
type Mutation {
    updateLiked(mid:String!, uid:Int!): [Movie]
    updateWatched(mid:String!, uid:Int!): [Movie]
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
` );

const updateLiked = function( args ) {
    console.log( args );
    return new Promise( ( resolve, reject ) => {
        db.get( 'SELECT * FROM movie INNER JOIN liked on movie.id = liked.mid WHERE liked.uid = $uid AND liked.mid = $mid', args.uid, args.mid )
            .then( function( result ) {
                if ( result ) {
                    db.run( 'UPDATE liked SET liked = (liked | 1) - (liked & 1) WHERE liked.uid = $uid AND liked.mid = $mid', args.uid, args.mid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN liked on movie.id = liked.mid WHERE liked.uid = $uid AND liked.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        resolve( [result] );
                                    } else {
                                        reject( new Error( 'Id not found' ) );
                                    }
                                } );
                        } );
                } else {
                    db.run( 'INSERT INTO liked (mid, uid, liked) VALUES ($mid, $uid, 1)', args.mid, args.uid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN liked on movie.id = liked.mid WHERE liked.uid = $uid AND liked.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        resolve( [result] );
                                    } else {
                                        reject( new Error( 'Id not found' ) );
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
        db.get( 'SELECT * FROM movie INNER JOIN watched on movie.id = watched.mid WHERE watched.uid = $uid AND watched.mid = $mid', args.uid, args.mid )
            .then( function( result ) {
                if ( result ) {
                    db.run( 'UPDATE watched SET watched = (watched| 1) - (watched & 1) WHERE watched.uid = $uid AND watched.mid = $mid', args.uid, args.mid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN watched on movie.id = watched.mid WHERE watched.uid = $uid AND watched.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        resolve( [result] );
                                    } else {
                                        reject( new Error( 'Id not found' ) );
                                    }
                                } );
                        } );
                } else {
                    db.run( 'INSERT INTO watched (mid, uid, watched) VALUES ($mid, $uid, 1)', args.mid, args.uid )
                        .then( function ( result ) {
                            db.get( 'SELECT * FROM movie INNER JOIN watched on movie.id = watched.mid WHERE watched.uid = $uid AND watched.mid = $mid', args.uid, args.mid )
                                .then( function( result ) {
                                    if ( result ) {
                                        resolve( [result] );
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
    console.log( args );
    if ( args.id ) {
        return new Promise( ( resolve, reject ) => {
            db.get( 'SELECT * FROM movie WHERE Id = $id', args.id ).then( function( result ) {
                if ( result ) {
                    resolve( [result] );
                } else {
                    reject( new Error( 'Id not found' ) );
                }

            } );
        } );
    } else if ( args.year ) {
        return new Promise( ( resolve, reject ) => {

            db.all( 'SELECT * FROM movie WHERE Year = $year', args.year ).then( function( result ) {
                if ( result ) {
                    resolve( result );
                } else {
                    reject( new Error( 'Id not found' ) );
                }
            } );

        } );
    }
    return new Promise( ( resolve, reject ) => {
        db.all( 'SELECT * FROM movie' ).then( function( result ) {
            if ( result ) {
                resolve( result );
            } else {
                reject( new Error( 'Id not found' ) );
            }
        } );
    } );
};

const getUser = function( args ) {
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
        db.all( 'SELECT * FROM movie INNER JOIN watched on movie.id = watched.mid WHERE watched.uid = $uid', args.uid ).then( function( result ) {
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
        db.all( 'SELECT * FROM movie INNER JOIN liked on movie.id = liked.mid WHERE liked.uid = $uid', args.uid ).then( function( result ) {
            if ( result ) {
                resolve( result );
            } else {
                reject( new Error( 'No liked movies!' ) );
            }
        } );
    } );
};

// The root provides a resolver function for each API endpoint
const root = {
    'films': getFilms,
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
