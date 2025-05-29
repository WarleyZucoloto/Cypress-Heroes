class HeroesPage {

    get visitHeroesNew () {
        cy.visit ('http://localhost:3000/heroes/new')
    }

    get heroesName () {
        return cy.get ("[data-cy='nameInput']")
    }

    get heroesPrice () {
        return cy.get ("[data-cy='priceInput']")
    }

    get heroesFans (){
        return cy.get ("[data-cy='fansInput']")
    }

    get heroesSaves () {
        return cy.get ("[data-cy='savesInput']")
    }

    get heroesPowers () {
        return cy.get ("[data-cy='powersSelect']")
    }

    get heroesAvatar () {
        return cy.get ("[data-cy='avatarFile']")
    }
    get buttonSubmit () {
        return cy.contains ('button', 'Submit').should('be.visible')
    }

    get alertGenericHeroes () {
        return cy.get ('.text-red-500')
    }

    HeroFiedForm(name, price, fans, saves) {
        if (name) this.heroesName.type(name)
        if (price) this.heroesPrice.type(price)
        if (fans) this.heroesFans.type(fans)
        if (saves) this.heroesSaves.type(saves)
    }

    getAllPowerText() {
        return this.heroesPowers.find('option').then($option => {
            return Cypress.$.map($option, option => Cypress.$(option).text())
        })
    }
}

export default new HeroesPage ()