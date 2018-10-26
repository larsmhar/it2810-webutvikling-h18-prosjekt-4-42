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

// Construct a schema, using GraphQL schema language
const schema = buildSchema( `
  type Query {
    films(id:String, year:String): [Movie]
    user(username:String!): User
    userWatched(uid:Int!): [Movie]
    userLiked(uid:Int!): [Movie]
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
}

type User {
    uid: Int
    username: String
}
` );

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
}

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
}

const getLiked = function( args ) {
    return new Promise( ( resolve, reject ) => {
        db.all( 'SELECT * FROM movie INNER JOIN liked on movie.id = liked.mid WHERE liked.uid = $uid', args.uid ).then( function( result ) {
            if ( result ) {
                resolve( result );
            } else {
                reject( new Error( 'No liked movies!' ) );
            }
        } );
    } );
}

// The root provides a resolver function for each API endpoint
const root = {
    'films': getFilms,
    'user':getUser,
    'userWatched':getWatched,
    'userLiked':getLiked
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
