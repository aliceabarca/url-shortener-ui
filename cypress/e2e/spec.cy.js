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
        id: 2,
        long_url: 'https://www.youtube.com/watch?v=wc7JPaRV5uU',
        short_url: 'http://localhost:3001/useshorturl/3',
        title: 'NEW SONG',
      }
    })
    .visit('http://localhost:3000/')
  })
  it('should see home page', () => {
    cy.get('h1').contains('URL Shortener')
      .get('[placeholder="Title..."]').should('have.attr', 'placeholder', 'Title...')
      .get('[placeholder="URL to Shorten..."]').should('have.attr', 'placeholder', 'URL to Shorten...')

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
      cy.get('[placeholder="Title..."]').type('NEW SONG')
        .should('have.value', 'NEW SONG')
      .get('[placeholder="URL to Shorten..."]').type('http://localhost:3001/useshorturl/2')
      // .get('[placeholder="Title..."]').should('have.value', 'http://localhost:3001/useshorturl/2')
      .get('button').click()
      .get('.url').should('have.length', 3)
      .get('.url').last().contains('NEW SONG')
      .get('.url').last().contains('http://localhost:3001/useshorturl/3')
      .get('.url').last().contains('https://www.youtube.com/watch?v=wc7JPaRV5uU')

  })
})