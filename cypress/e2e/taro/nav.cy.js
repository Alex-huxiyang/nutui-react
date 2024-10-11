const getPath = (component) => `nav/pages/${component}/index`

describe('layout components test', () => {
  it('backtop successfully passes', () => {
    cy.visit(getPath('backtop'))
    cy.get('.applets-demo-header').contains('BackTop')
    cy.contains('顶部').should('not.be.visible')
    cy.contains('我是测试数据20').scrollIntoView()
    cy.contains('顶部').should('be.visible')
    cy.contains('顶部').click()
    cy.contains('我是测试数据20').should('not.be.visible')
    cy.contains('我是测试数据1').should('be.visible')
    cy.contains('顶部').should('not.be.visible')
  })
})
