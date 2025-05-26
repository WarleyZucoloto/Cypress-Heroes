class LoginPage  {

    visitLoginPage () {
        cy.visit('http://localhost:3000/heroes')
    }

    get logoHeroes() {
        return cy.get ("[alt='Logotipo Cypress Heroes']")
    }

    get buttonLogin() {
        return cy.contains ('button', 'Login')
    }

    get email () {
        return cy.get ("[name='email']")
    }

    get passworld () {
        return cy.get ("[name='password']")
    }

    get alertGeneric () {
        return cy.get ('.text-red-500')
    }

    get buttonSignIn() {
        return cy.contains ('button', 'Sign in').should('be.visible')
    }

    login(email, password) {
        if (email) this.email.type(email)
        if (password) this.passworld.type(password)
    }

}

export default new LoginPage ()
