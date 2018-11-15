import {schema, root, server, sortFilms} from '../src/server.js';
const sqlite3 = require( 'sqlite3' ).verbose();

const graphqlHTTP = require( 'express-graphql' );

afterAll( done => {
    server.close( done );
} );

describe( 'test sorting', ()=> {
    const movieA = {
        'released': '14 May 1980',
        'runtime': '140 min',
        'rank':'1'
    };
    const movieB = {
        'released': '31 Oct 1999',
        'runtime': '90 min',
        'rank':'5'
    };


    test( 'Expect year to sort correctly', ()=> {
        expect( sortFilms( movieA, movieB, 'year' ) ).toBe( 1 );
        expect( sortFilms( movieA, movieB, 'year', false ) ).toBe( -1 );
        expect( sortFilms( movieA, movieA, 'year' ) ).toBe( 0 );
        expect( sortFilms( movieA, movieA, 'year', false ) ).toBe( 0 );
    } );
    test( 'Expect runtime to sort correctly', ()=> {
        expect( sortFilms( movieA, movieB, 'runtime' ) ).toBe( -1 );
        expect( sortFilms( movieA, movieB, 'runtime', false ) ).toBe( 1 );
        expect( sortFilms( movieA, movieA, 'runtime' ) ).toBe( 0 );
        expect( sortFilms( movieA, movieA, 'runtime', false ) ).toBe( 0 );
    } );
    test( 'Expect rank to sort correctly', ()=> {
        expect( sortFilms( movieA, movieB, 'rank' ) ).toBe( -1 );
        expect( sortFilms( movieA, movieB, 'rank', false ) ).toBe( 1 );
        expect( sortFilms( movieA, movieA, 'rank' ) ).toBe( 0 );
        expect( sortFilms( movieA, movieA, 'rank', false ) ).toBe( 0 );
    } );
} );

describe( 'Test schema and queries', ()=> {
    //useful tutorial https://itnext.io/graphql-jest-snapshot-testing-7f7345ee2be

    //Have to mock the return value for now, have to find a way to start the database before running the tests
    const mockFilm = {
        'movies': [
            {'title': 'To Kill a Mockingbird',
                'released':'16 Mar 1943',
                'runtime': '129 min',
                'director': 'Robert Mulligan',
                'imdbRating': '8.3'}
        ],
        'total': 1,
        'offset': 0
    };

    const middleware = graphqlHTTP( {
        schema,
        'rootValue': {
            'films': () => mockFilm,
        }
    } );

    test( 'Expect list of movies as array', async () => {
        const response = {
            'setHeader': jest.fn(),
            'end': jest.fn(),
            'json': jest.fn(),
        };

        const request = {
            'method': 'POST',
            'headers': {},
            'body': {'query':'query{ films (uid:1, first:3, skip:0) { movies { title released runtime } total offset}}'}
        };

        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        // console.log( responseData.data.films.movies );
        expect( Array.isArray( responseData.data.films.movies ) ).toBe( true );
    } );

    test( 'Expect movie object to only contain fields in query', async () => {
        const response = {
            'setHeader': jest.fn(),
            'end': jest.fn(),
            'json': jest.fn(),
        };

        const request = {
            'method': 'POST',
            'headers': {},
            'body': {'query':'query{ films (uid:1, first:3, skip:0) { movies { title released runtime } total offset}}'}
        };

        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        expect( Object.keys( responseData.data.films.movies[0] ) ).toEqual( ['title', 'released', 'runtime'] );
    } );

    test( 'Expect error on unvalid field', async () => {
        const response = {
            'setHeader': jest.fn(),
            'end': jest.fn(),
            'json': jest.fn(),
        };

        const request = {
            'method': 'POST',
            'headers': {},
            'body': {'query':'query{ films (uid:1, first:3, skip:0) { movies { turtle released runtime } total offset}}'}
        };
        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        // console.log( responseData );
        expect( Object.keys( responseData ) ).toEqual( ['errors'] );
        expect( responseData.errors[0].message ).toMatch( 'Cannot query field' );
    } );

    test( 'Expect error if query does not contain uid', async () => {
        const response = {
            'setHeader': jest.fn(),
            'end': jest.fn(),
            'json': jest.fn(),
        };

        const request = {
            'method': 'POST',
            'headers': {},
            'body': {'query':'query{ films (first:3, skip:0) { movies { title released runtime } total offset}}'}
        };
        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        // console.log( responseData );
        expect( Object.keys( responseData ) ).toEqual( ['errors'] );
        expect( responseData.errors[0].message ).toMatch( 'argument "uid" of type "Int!" is required' );
    } );

    test( 'Expect error if query does not contain pagination argument', async () => {
        const response = {
            'setHeader': jest.fn(),
            'end': jest.fn(),
            'json': jest.fn(),
        };

        const request = {
            'method': 'POST',
            'headers': {},
            'body': {'query':'query{ films (uid:1, skip:0) { movies { title released runtime } total offset}}'}
        };
        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        // console.log( responseData );
        expect( Object.keys( responseData ) ).toEqual( ['errors'] );
        expect( responseData.errors[0].message ).toMatch( 'argument "first" of type "Int!" is required' );
    } );

    test( 'Expect error if title argument is not string', async () => {
        const response = {
            'setHeader': jest.fn(),
            'end': jest.fn(),
            'json': jest.fn(),
        };

        const request = {
            'method': 'POST',
            'headers': {},
            'body': {'query':'query{films (uid:1, first:3, skip:0, title:mockingbird) { movies { title released runtime } total offset}}'}
        };
        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        // console.log( responseData );
        expect( Object.keys( responseData ) ).toEqual( ['errors'] );
        expect( responseData.errors[0].message ).toMatch( 'Expected type String' );
    } );
} );
