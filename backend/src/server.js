var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const sqlite3 = require('sqlite3').verbose();
import {promisify} from 'bluebird';
//https://graphql.org/graphql-js/running-an-express-graphql-server/
//https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

const db = new sqlite3.Database('../database.db', (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to database')
})

db.get = promisify(db.get);
db.all = promisify(db.all);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
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
`);

var movies = [
    {
        id: "t1",
        title: "Star Wars",
        year: 1976
    },
    {
        id:"t2",
        title:"Batman",
        year:1980
    },
    {
        id:"t3",
        title:"A movie",
        year:1976
    }
]

var getFilms = function(args) {
    if ( !!args.id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM movie WHERE Id = $id' ,args.id).then(function(result) {
                console.log(result)
                resolve([result]);
            })
        });
    }else if ( !!args.year ){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM movie WHERE Year = $year' ,args.year).then(function(result) {
                console.log(result)
                resolve(result);
            })
        });
    }
    return movies;
}

// The root provides a resolver function for each API endpoint
var root = {
  films: getFilms
};



var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
