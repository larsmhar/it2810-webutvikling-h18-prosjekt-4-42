describe('Test login', () => {
	it('Should get errors after wrong username is submitted', () => {
		cy.visit('/')
		cy.get('.userField')
		  .type('wrongusername')
		  .should('have.value', 'wrongusername')
		cy.get('.loginBtn')
		  .click()
		cy.contains('Username not found')
	})
	it('Should be able to login after writing username and submitting, view all of the films and visit the first one', () => {
		cy.visit('/')
		cy.get('.userField')
		  .type('sudo')
		  .should('have.value', 'sudo')
		cy.get('.loginBtn')
		  .click()
		cy.url().should('include', '/films')
		cy.get('.App-container')
		  .find('img')
		  .should('have.length', 250)
		cy.get('.App-container')
		  .find('img')
		  .first()
		  .click()
		cy.url().should('include', '/films/tt0111161')
	})


	it('Test logging in via request', () => {
		cy.request('localhost:4000/graphql', { 'query': '{ user(username: "sudo") { username uid } }' }
		)
		cy.visit('/films')
		cy.wait(1000)
	})

	it('Test getting films via request', () => {
		cy.request('localhost:4000/graphql', { 'query': '{ films { id title  poster } userWatched(uid: ' + 1 + ') {id watched} userLiked(uid: ' + 1 + ') {id liked} }' })
	})
})
