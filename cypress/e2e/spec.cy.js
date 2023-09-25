describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'example.json'
    })
    .visit('http://localhost:3000/')
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        title: 'NEW',
        urlToShorten: 'https://unsplash.com/photos/3DPaL6XDcZE',
      }
    })
    .visit('http://localhost:3000/')
  })
  it('should see home page', () => {
    cy.get('h1').contains('URL Shortener')
      .get('.url').should('have.length', 2)
      .get('.url').first().contains('Awesome photo')
      .get('.url').first().contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .get('.url').first().contains('http://localhost:3001/useshorturl/1')
      .get(':nth-child(1) > a').should('be.visible')
       // .get(':nth-child(1) > a').click()

      .get('.url').last().contains('Awesome')
      .get('.url').last().contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .get('.url').last().contains('http://localhost:3001/useshorturl/2')
      .get(':nth-child(2) > a').should('be.visible')
      // .get('a').click()
    })

    it('should add new url', () => {
      cy.get('[placeholder="Title..."]').type('NEW')
      .get('[placeholder="URL to Shorten..."]').type('https://unsplash.com/photos/3DPaL6XDcZE')
      .get('button').click()
      .get('.url').should('have.length', 3)
      .get('.url').last().contains('NEW')
      .get('.url').last().contains('https://unsplash.com/photos/3DPaL6XDcZE')
  })
})