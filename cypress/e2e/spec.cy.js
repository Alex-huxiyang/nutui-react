describe('template spec', () => {
  it('button successfully loads', () => {
    cy.visit('/#/base/pages/button/index')
    cy.get('.applets-demo-header').contains('Button')
    // Click Loading Test and loading icon shows
    cy.contains('button', 'Click me').scrollIntoView().click()
    cy.contains('button', 'Click me')
      .parent()
      .find('i.nut-icon-Loading')
      .should('exist')
  })
})
