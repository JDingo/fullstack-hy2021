describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to the application')

        cy.contains('Username')
        cy.contains('Password')

        cy.get('input').then( inputFields => {
            cy.wrap(inputFields[0].name).should('contain', 'Username')
            cy.wrap(inputFields[1].name).should('contain', 'Password')
        })

        cy.get('#loginButton').should('contain', 'login')
    })
})