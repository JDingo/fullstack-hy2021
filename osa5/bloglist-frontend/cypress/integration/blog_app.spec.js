describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            username: 'Test',
            name: 'test',
            password: 'test'
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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'Test', password: 'test'
            }).then(response => {
                localStorage.setItem('loggedUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function () {
            cy.contains('Create new blog').click()
            cy.get('#title').type('Cypress Testing Blog')
            cy.get('#author').type('Cypress Tester')
            cy.get('#url').type('press.cy')
            cy.contains('Submit blog').click()

            cy.contains('Cypress Testing Blog By Cypress Tester')

            cy.contains('Show').click()

            cy.contains('Cypress Testing Blog')
            cy.contains('Cypress Tester')
            cy.contains('0')
            cy.contains('Like')
            cy.contains('press.cy')
        })

        describe('When a blog has been created', function () {
            beforeEach(function () {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3003/api/blogs',
                    body: {
                        title: 'Cypress Testing Blog',
                        author: 'Cypress Tester',
                        url: 'press.cy',
                    },
                    headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` }
                })

                cy.visit('http://localhost:3000')
                cy.contains('Show').click()
            })

            it('can be liked', function () {
                cy.contains('Like').click()
                cy.contains(1)

                cy.contains('Like').click()
                cy.contains(2)
            })

            it('can be deleted by the uploader', function () {
                cy.contains('Remove').click()

                cy.get('.success')
                    .should('contain', 'Blog ')
                    .and('have.css', 'background-color', 'rgb(0, 255, 0)')
                    .and('have.css', 'border-style', 'solid')

                cy.get('html').should('not.contain', 'Cypress Testing Blog')
                cy.get('html').should('not.contain', 'Cypress Tester')
                cy.get('html').should('not.contain', 'Show')
                cy.get('html').should('not.contain', 'Hide')
                cy.get('html').should('not.contain', 'Remove')
            })

            it('cannot be deleted by another user', function () {
                const user = {
                    username: 'Another',
                    name: 'Another',
                    password: 'another'
                }
                cy.request('POST', 'http://localhost:3003/api/users', user)

                cy.contains('Log out').click()

                cy.request('POST', 'http://localhost:3003/api/login', {
                    username: 'Another', password: 'another'
                }).then(response => {
                    localStorage.setItem('loggedUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })

                cy.contains('Another logged in')

                cy.contains('Show').click()
                cy.get('html').should('not.contain', 'Remove')
            })
        })

        describe('When multiple blog has been created', function () {
            beforeEach(function () {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3003/api/blogs',
                    body: {
                        title: 'Last',
                        author: 'Last',
                        url: 'Last',
                    },
                    headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` }
                })

                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3003/api/blogs',
                    body: {
                        title: 'Second',
                        author: 'Second',
                        url: 'Second',
                    },
                    headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` }
                })

                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3003/api/blogs',
                    body: {
                        title: 'First',
                        author: 'First',
                        url: 'First',
                    },
                    headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` }
                })
            })

            it('blogs are sorted by likes', function () {
                cy
                    .get('.showButton')
                    .each(button => button.click())

                cy.get('.likeButton').then(buttons => {
                    cy.wrap(buttons[0]).click()
                    cy.wait(500)

                    cy.wrap(buttons[1]).click()
                    cy.wait(500)
                    cy.wrap(buttons[1]).click()
                    cy.wait(500)

                    cy.wrap(buttons[2]).click()
                    cy.wait(500)
                    cy.wrap(buttons[2]).click()
                    cy.wait(500)
                    cy.wrap(buttons[2]).click()
                    cy.wait(500)
                })

                cy.get('.blog').eq(0).should('contain', 'First').and('contain', '3')
                cy.get('.blog').eq(1).should('contain','Second').and('contain','2')
                cy.get('.blog').eq(2).should('contain','Last').and('contain','1')
            })
        })
    })
})