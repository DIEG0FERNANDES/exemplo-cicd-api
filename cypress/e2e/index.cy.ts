describe('Tests over API index', () => {
  it('should return welcome message', () => {
    cy.request({ method: 'GET', url: '/' }).then((response) => {
      const { body } = response
      expect(body).to.equal('Contact Book API')
    })
  })
})
