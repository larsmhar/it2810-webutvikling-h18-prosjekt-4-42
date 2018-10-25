const express = require( 'express' );
const graphqlHTTP = require( 'express-graphql' );
const { buildSchema } = require( 'graphql' );
const sqlite3 = require( 'sqlite3' ).verbose();
import {promisify} from 'bluebird';
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
},
type Movie {
    Id: String
    Title: String
    Released: String
    Genre: String
    Director: String
    Plot: String
    Writer: String
    Runtime: String
    Year: String
    Awards: String
    Poster: String
    imdbRating: String
    Production: String
}
` );

const getFilms = function( args ) {
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

// The root provides a resolver function for each API endpoint
const root = {
    'films': getFilms
};


const app = express();
app.use( '/graphql', graphqlHTTP( {
    'schema': schema,
    'rootValue': root,
    'graphiql': true,
} ) );
app.listen( 4000 );
console.log( 'Running a GraphQL API server at localhost:4000/graphql' );
