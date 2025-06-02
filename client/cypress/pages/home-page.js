class HomePage {

    get buttonCreateNewHero() {
        return cy.contains('button', 'Create New Hero');
    }

    get buttonLogout() {
        return cy.contains('button', 'Logout');
    }

    get buttonDeleteHeroCard() {
        return cy.get("[data-cy='trash']");
    }

    get buttonEditHero() {
        return cy.get("[data-cy='pencil']");
    }

    get buttonPriceHero() {
        return cy.get("[data-cy=money]");
    }

    get buttonLikeHero() {
        return cy.get("[data-cy='like']");
    }

    get buttonDeleteHero() {
        return cy.get("[data-cy='Delete Hero']");
    }

    get cardHoroes() {
        return cy.get("[data-cy='hero-card']");
    }

    get nameDisplay() {
        return cy.get('[data-cy="name"]');
    }

    get priceDisplay() {
        return cy.get('[data-cy="price"]');
    }

    get fansDisplay() {
        return cy.get('[data-cy="fans"]');
    }

    get savesDisplay() {
        return cy.get('[data-cy="saves"]');
    }

    get likeDisplay() {
        return cy.get('[data-cy="like"]');
    }
}

export default new HomePage();