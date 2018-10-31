describe('My first cypress test', () => {
	it('Does true equal true', () => {
		expect(true).to.equal(true);
	})
	it('Does true equal false', () => {
		expect(true).to.equal(false);
	})
	it('Visits the kitchen sink', () => {
		cy.visit('https://example.cypress.io')
		cy.contains('type')
		cy.contains('Implicit Assertions').click()
		cy.contains('clear').click()
		cy.url().should('include', '/commands/actions')
	})
})
