describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Paavo Pohjolainen',
      username: 'pohjolpa',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('pohjolpa')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Paavo Pohjolainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jyy')
      cy.get('#password').type('juu')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('pohjolpa')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Paavo Pohjolainen logged in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('a Blog created by cypress')
      cy.get('#authorInput').type('Testeri')
      cy.get('#urlInput').type('testeri.fi')
      cy.get('#createButton').click()
      cy.contains('a Blog created by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('a Blog created by cypress')
      cy.get('#authorInput').type('Testeri')
      cy.get('#urlInput').type('testeri.fi')
      cy.get('#createButton').click()
      cy.contains('a Blog created by cypress')
      cy.get('#toggleButton').click()
      cy.contains('a Blog created by cypress').contains('like').click()
      cy.contains('a Blog created by cypress').contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('an another Blog created by cypress')
      cy.get('#authorInput').type('Testeri')
      cy.get('#urlInput').type('testeri.fi')
      cy.get('#createButton').click()
      cy.contains('an another Blog created by cypress')
      cy.reload()
      cy.contains('an another Blog created by cypress').contains('remove').click()
      cy.wait(100)
      cy.contains('an another Blog created by cypress').should('not.exist')
    })

    it('A blog can be sorted by likes', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('a Blog created by cypress')
      cy.get('#authorInput').type('Testeri')
      cy.get('#urlInput').type('testeri.fi')
      cy.get('#createButton').click()
      cy.wait(100)
      cy.contains('a Blog created by cypress')

      cy.get('#titleInput').type('an another Blog created by cypress')
      cy.get('#authorInput').type('Testeri')
      cy.get('#urlInput').type('testeri.fi')
      cy.get('#createButton').click()
      cy.wait(100)
      cy.contains('an another Blog created by cypress')

      cy.get('#titleInput').type('a third Blog created by cypress')
      cy.get('#authorInput').type('Testeri')
      cy.get('#urlInput').type('testeri.fi')
      cy.get('#createButton').click()
      cy.wait(100)
      cy.contains('a third Blog created by cypress')

      cy.get(':nth-child(6) > #toggleButton').click()
      cy.wait(100)
      cy.contains('an another Blog created by cypress').contains('like').click()

      cy.get(':nth-child(7) > #toggleButton').click()
      cy.wait(100)
      cy.contains('a third Blog created by cypress').contains('like').click()
      cy.wait(100)
      cy.contains('a third Blog created by cypress').contains('like').click()

      cy.reload()

      cy.get('#root > :nth-child(1) > :nth-child(5)').contains('a third Blog created by cypress')
      cy.get('#root > :nth-child(1) > :nth-child(6)').contains('an another Blog created by cypress')
      cy.get('#root > :nth-child(1) > :nth-child(7)').contains('a Blog created by cypress')


    })
  })

})