class HomePage {

    get buttonCreateNewHero() {
        return cy.contains ('button', 'Create New Hero')
    }

    get buttonLogout() {
        return cy.contains ('button', 'Logout')
    }

    get buttonDeleteHero() {
        return cy.get ("[data-cy='trash']")
    }

    get buttonEditHero() {
        return cy.get ("[data-cy='pencil']")
    }

    get cardHoroes() {
        return cy.get ("[data-cy='hero-card']")
    }
    
}

export default new HomePage ()