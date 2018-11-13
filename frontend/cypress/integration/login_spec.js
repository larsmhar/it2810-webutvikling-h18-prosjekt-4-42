describe('Test login', () => {
	it('Should get errors after wrong username is submitted', () => {
		cy.visit('/prosjekt4/')
		cy.get('.userField')
		  .type('wrongusername')
		  .should('have.value', 'wrongusername')
		cy.get('input.loginBtn')
		  .click()
		cy.contains('Username not found')
	})
	it('Should be able to login after writing username and submitting, view all of the films and visit the first one', () => {
		cy.visit('/prosjekt4/')
		cy.get('.userField')
		  .type('sudo')
		  .should('have.value', 'sudo')
		cy.get('input.loginBtn')
		  .click()
		cy.url().should('include', '/films')
		cy.get('.App-container')
		  .find('img')
		  .should('have.length', 18)
		cy.get('.App-container')
		  .find('img')
		  .first()
		  .click()
		cy.url().should('include', '/films/tt0111161')
	})


	it('Test logging in via request', () => {
		cy.request('localhost:4000/graphql', { 'query': '{ user(username: "sudo") { username uid } }' }
		)
		cy.visit('/prosjekt4/films')
		cy.wait(1000)
	})

	it('Test getting films via request', () => {
		cy.request('localhost:4000/graphql', { 'query': '{ films (uid: 1 first: 18 skip: 0  ) { movies { id title  poster } } }' })
	})
})
