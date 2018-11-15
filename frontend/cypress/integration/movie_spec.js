describe( 'Test movie page', () => {
    it( 'Correct title should appear in page', () => {
        cy.visit( 'prosjekt4/' );
        cy.login();
        // cy.get('.userField')
        // .type('sudo')
        // .should('have.value', 'sudo')
        // cy.get('input.loginBtn')
        // .click()
        cy.visit( 'prosjekt4/films/tt0133093' );
        cy.get( '.title' )
		  .contains( 'The Matrix' );
    } );

    it( 'Correct poster should appear in page', () => {
        cy.login();
        cy.visit( 'prosjekt4/films/tt0133093' );
        cy.get( '.poster' )
		  .should( 'be.visible' );
    } );

    it( 'Correct like status should be shown and update', () => {
        cy.login();
        cy.visit( 'prosjekt4/films/tt0050986' );
        cy.get( '#liked' ).then( ( $liked ) => {
            const initialColor = $liked[0].style.color;

            cy.get( '#liked' )
                .should( 'have.css', 'color', initialColor )
                .click()
                .wait( 2000 )
                .should( 'not.have.css', 'color', initialColor )
                .click()
                .wait( 2000 )
                .should( 'have.css', 'color', initialColor );
        } );

    } );

    it( 'Correct watched status should be shown and update', () => {
        cy.login();
        cy.visit( 'prosjekt4/films/tt0050986' );
        let liked;
        cy.get( '#watched' ).then( ( $liked ) => {
            const initialColor = $liked[0].style.color;

            cy.get( '#watched' )
                .should( 'have.css', 'color', initialColor )
                .click()
                .wait( 2000 )
                .should( 'not.have.css', 'color', initialColor )
                .click()
                .wait( 2000 )
                .should( 'have.css', 'color', initialColor );
        } );
    } );
} );
