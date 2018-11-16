describe( 'Test search and filter functions', () => {
    it( 'Should only be 15 movies released after 2015', () => {
        cy.login()
        cy.visit('prosjekt4/films')
        cy.get('#year')
            .clear()
            .type('2015')
        cy.get('form > .loginBtn')
            .click()
        cy.get('.App-container')
            .find('.Item-container')
            .should('have.length', 15)
    } );

    it( 'Hide watched should work', () => {
        cy.login()
        cy.visit('prosjekt4/films')
        cy.get('.App-container')
            .find('.watched').then(($watched) => {
                expect($watched).to.have.length.above(0)
            })
        cy.get(':nth-child(5) > input')
            .click()
        cy.get('form > .loginBtn')
            .click()
        cy.get('.App-container')
            .find('.watched')
            .should('have.length', 0)
    } );

    it( 'Should find 3 movies with "ring" in title', () => {
        cy.login()
        cy.visit('prosjekt4/films')
        cy.get('.userField')
            .type('ring')
        cy.get('form > .loginBtn')
            .click()
        cy.get('.App-container')
            .find('.Item-container')
            .should('have.length', 3)
    } );

    it( 'Longest movie should be tt1954470', () => {
        cy.login()
        cy.visit('prosjekt4/films')
        cy.get('select').select('runtime')
        cy.get('form > .loginBtn')
            .click()
        cy.wait(500)
        cy.get('.App-container')
            .find('.Item-container').then(($films) => {
                expect($films[0].id).to.equal('tt1954470')
            })
    } );
} );
