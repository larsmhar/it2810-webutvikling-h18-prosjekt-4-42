const tester = require( 'graphql-tester' ).tester;


describe( 'A user', function () {
    const self = this;
    beforeAll( () => {
        self.test = tester( {
            'url': 'http://127.0.0.1:4000/graphql',
            'contentType': 'application/json'
        } );
    } );

    // get all films
    it( 'Can retrieve multiple films', done => {
        self.test( JSON.stringify( {
            'query': '{ films(uid: 1 skip: 0 first: 250) { movies { title id watched liked } } }'
        }, ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.films;
                expect( resJson.movies.length ).toBe( 250 );
                expect( resJson.movies[0].title ).toBe( 'The Shawshank Redemption' );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );

    it( 'Filter by year', done => {
        self.test( JSON.stringify( {
            'query': '{films (uid: 1 skip: 0 first: 250 year:"2015") { movies { title id  } offset total } }'
        } ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.films;
                expect( resJson.movies[0].title ).toBe( 'Avengers: Infinity War' );
                expect( resJson.total ).toBe( 15 );
                expect( resJson.offset ).toBe( 0 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );

    // Update liked
    it( 'Search for war', done => {
        self.test( JSON.stringify( {
            'query': '{films (uid: 1 skip: 0 first: 250 title: "war") { movies { title id  } offset total } }'
        } ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.films;
                expect( resJson.movies[0].title ).toBe( 'Star Wars: Episode V - The Empire Strikes Back' );
                expect( resJson.total ).toBe( 5 );
                expect( resJson.offset ).toBe( 0 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );
    //Update watched
    it( 'Sort by year', done => {
        self.test( JSON.stringify( {
            'query': '{films (uid: 1 skip: 0 first: 1 sort: "year") { movies { title id year } offset total } }'
        } ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.films;
                expect( resJson.movies[0].title ).toBe( 'A Star Is Born' );
                expect( resJson.movies[0].year ).toBe( '2018' );
                expect( resJson.total ).toBe( 250 );
                expect( resJson.offset ).toBe( 0 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );

    it( 'Sort by year', done => {
        self.test( JSON.stringify( {
            'query': '{films (uid: 1 skip: 1 first: 1 sort: "runtime") { movies { title id year } offset total } }'
        } ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.films;
                console.log( resJson.movies[0].title );
                expect( resJson.movies[0].title ).toBe( 'Gone with the Wind' );
                expect( resJson.total ).toBe( 250 );
                expect( resJson.offset ).toBe( 1 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );
} );