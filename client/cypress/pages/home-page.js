class HomePage {

    get buttonCreateNewHero() {
        return cy.contains('button', 'Create New Hero')
    }

    get buttonLogout() {
        return cy.contains('button', 'Logout')
    }

    get buttonEditHero() {
        return cy.get("[data-cy='pencil']")
    }

    get buttonPriceHero() {
        return cy.get("[data-cy=money]")
    }

    get buttonLikeHero() {
        return cy.get("[data-cy='like']")
    }

    get buttonDeleteHeroCard() {
        return cy.get("[data-cy='trash']")
    }

    get buttonDeleteHero() {
        return cy.get('[type="button"]')
    }

    get buttonYesDelete() {
        return cy.contains('button', 'Yes')
    }

    get buttonNoDelete() {
        return cy.contains('button', 'No')
    }

    get cardHoroes() {
        return cy.get("[data-cy='hero-card']")
    }

    get cardHoroesSelector() {         // retorno apenas da string para uso do teste de deletar herói, pois quero pegar apenas a string desse atributo para eu trabalhar no meu It ...
        return '[data-cy="hero-card"]'
    }

    get nameDisplay() {
        return cy.get('[data-cy="name"]')
    }

    get priceDisplay() {
        return cy.get('[data-cy="price"]')
    }

    get fansDisplay() {
        return cy.get('[data-cy="fans"]')
    }

    get savesDisplay() {
        return cy.get('[data-cy="saves"]')
    }

    get likeDisplay() {
        return cy.get('[data-cy="like"]')
    }
}

export default new HomePage()