describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            username: "Test",
            name: "test",
            password: "test"
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to the application')

        cy.contains('Username')
        cy.contains('Password')

        cy.get('input').then(inputFields => {
            cy.wrap(inputFields[0].name).should('contain', 'Username')
            cy.wrap(inputFields[1].name).should('contain', 'Password')
        })

        cy.get('#loginButton').should('contain', 'login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('Test')
            cy.get('#password').type('test')
            cy.get('#loginButton').click()

            cy.contains('test logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('Test')
            cy.get('#password').type('wrong')
            cy.get('#loginButton').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'background-color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'test logged in')
        })
    })
})