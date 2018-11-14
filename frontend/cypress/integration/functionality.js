describe('Test watched ', () => {
	beforeEach( function() {
		cy.visit('/prosjekt4/')
		cy.get('.userField')
			.type('sudo')
		cy.get('input.loginBtn')
		.click()
	})

	it('Should check watched status', () => {
		cy.visit('/prosjekt4/films')
		// Need to wait for a few milliseconds as the images wont load otherwise
		cy.wait(100)
		cy.get('.App-container')
			.get('img')
			.first()
			.click()
		cy.wait(100)
		// But I don't know how to get watched/liked style
	})

	it('Should search right', () => {
		cy.visit('/prosjekt4/films')
		cy.wait(100)
		cy.log('TESTING')
		cy.get('.App-container').get('img')
		cy.log(cy.get('.App-container').get('img').Elements)
		cy.contains('Shaw')
	})
})
