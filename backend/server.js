var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

//https://graphql.org/graphql-js/running-an-express-graphql-server/
//https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    films(id:String, year:Int): [Movie]
},
type Movie {
    id: String
    title: String
    year: Int
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
        return movies.filter(movie => movie.id == args.id);
    }else if ( !!args.year ){
        return movies.filter(movie => movie.year == args.year)
    }
    return movies ;
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
