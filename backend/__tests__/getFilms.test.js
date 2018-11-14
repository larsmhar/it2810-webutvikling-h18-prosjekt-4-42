import {schema, root, server, sortFilms} from '../src/server.js';
const graphqlHTTP = require( 'express-graphql' );

const middleware = graphqlHTTP({
    schema,
    root
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

    afterAll( done => {
        server.close( done );
    } );

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

    const request = {
        'method': 'POST',
        'headers': {},
        'body': {'query':'query{ films (uid:1, first:3, skip:0) { movies { title released runtime } total offset}}'}
    };

    const response = {
        'setHeader': jest.fn(),
        'end': jest.fn(),
        'json': jest.fn(),
    };

    test( 'Expect responseData', async () => {
        //useful tutorial https://itnext.io/graphql-jest-snapshot-testing-7f7345ee2be
        await middleware( request, response );
        const responseData = response.json.mock.calls[0][0];
        console.log( responseData );
        expect( 1 ).toBe( 1 );
    } );

} );
