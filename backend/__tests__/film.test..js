const tester = require( 'graphql-tester' ).tester;


describe( 'A user', function () {
    const self = this;
    beforeAll( () => {
        self.test = tester( {
            'url': 'http://127.0.0.1:4000/graphql',
            'contentType': 'application/json'
        } );
    } );

    // Get single film
    it( 'Can retrieve a single film with information from a single user', done => {
        self.test( JSON.stringify( {
            'query': '{ films(mid: "tt0111161" uid: 1 skip: 0 first: 1) { movies { title id watched liked } offset total } }'
        }, ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.films;
                expect( resJson.movies[0].title ).toBe( 'The Shawshank Redemption' );
                expect( resJson.total ).toBe( 1 );
                expect( resJson.offset ).toBe( 0 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );

    // Update liked
    it( 'Is able to update liked field on a film', done => {
        self.test( JSON.stringify( {
            'query': ' mutation { updateLiked(uid: 1 mid:"tt0111161") { movies { title id  } offset total } }'
        } ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.updateLiked;
                expect( resJson.movies[0].title ).toBe( 'The Shawshank Redemption' );
                expect( resJson.total ).toBe( 1 );
                expect( resJson.offset ).toBe( 0 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );
    //Update watched
    it( 'Is able to update watched field on a film', done => {
        self.test( JSON.stringify( {
            'query': ' mutation { updateWatched(uid: 1 mid:"tt0111161") { movies { title id  } offset total } }'
        } ) )
            .then( res => {
                expect( res.status ).toBe( 200 );
                expect( res.success ).toBe( true );
                const resJson = JSON.parse( res.raw ).data.updateWatched;
                expect( resJson.movies[0].title ).toBe( 'The Shawshank Redemption' );
                expect( resJson.total ).toBe( 1 );
                expect( resJson.offset ).toBe( 0 );
                done();
            } )
            .catch( err => {
                expect( err ).toBe( null );
                done();
            } );
    } );

} );