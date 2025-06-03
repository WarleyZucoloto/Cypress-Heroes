import LoginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import HeroesPage from "../pages/heroes-form"
import HeroData from "../fixtures/hero-data"
import DataUser from "../fixtures/manager.json"
import getRandomPowerItemHero from "../support/utils.js"


describe ('Hero manager modules - CRUD', () => { // Módulos de gerenciamento de heróis - CRUD

        const HeroCreate = (name,price, fans, saves, power) => {

                HeroesPage.HeroFiedForm(name,price, fans, saves)

                    if (power) {
                        HeroesPage.heroesPowers.select(power)
                    }

                HeroesPage.buttonSubmit.click()
            }

    beforeEach(() => {

        const API_URL = 'http://localhost:3001'
            cy.request({             method: 'POST',
                url: `${API_URL}/auth`, // URL da API de autenticação
                body: {
                    username: DataUser.userAdministrador.email,
                    password: DataUser.userAdministrador.password
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then((response) => {
                expect(response.status).to.eq(201) // Verifica se a requisição foi bem-sucedida (status 200)

                cy.window().then((win) => { // Armazena o objeto completo de autenticação no localStorage na maioria das vezes o nome é 'auth_result'
                    win.localStorage.setItem('auth_result', JSON.stringify(response.body));
                });
                    LoginPage.visitLoginPage()
                    HomePage.buttonCreateNewHero.should('be.visible') // se o login der certo ele verifica os elementos de acesso admin da página
                    HomePage.buttonLogout.should('be.visible')
                    HomePage.cardHoroes.first().within(() => {
                        HomePage.buttonEditHero.should('be.visible')
                        HomePage.buttonDeleteHeroCard.should('be.visible')
                    })
            })
    })
      
    describe ('Hero Management Module', () => { // Módulo de Gerenciamento de Heróis

        it ('Creating a new hero Successfull', () => { //Criando um novo herói com sucesso

            HomePage.buttonCreateNewHero.click()

            HeroesPage.getAllPowerText().then(allPower => {
                const randomPower = getRandomPowerItemHero(allPower)
                cy.log (`Poder escolhido foi: ${randomPower}`)

                    HeroCreate(
                        HeroData.validHero.name,
                        HeroData.validHero.price,
                        HeroData.validHero.fans,
                        HeroData.validHero.saves,
                        randomPower
                    )
                cy.contains(randomPower).should('be.visible')
            })
        })


        it ('Failed Test: All fields empty - Should display all required alerts', () => {
            HomePage.buttonCreateNewHero.click()
            HeroCreate('', '', '', '', '')

                cy.contains('Name is required').should('be.visible')
                cy.contains('Price is required').should('be.visible')
                cy.contains('Fans is required').should('be.visible')
                cy.contains('Saves is required').should('be.visible')
                cy.contains('Powers is required').should('be.visible')
        })

        const longName = "teste".repeat(62)
            const heroDataInvalid = [

                // Creating a nameless hero
                // Criando um heroi sem nome
                {
                    testName: 'Creating a nameless Hero',
                    name: '',
                    price: HeroData.validHero.price,
                    fans: HeroData.validHero.fans,
                    saves: HeroData.validHero.saves,
                    power: 'Super Speed',
                    alertExpectedText: 'Name is required'
                },

                // Creating a priceless hero
                // Criando um heroi sem preço
                {
                    testName: 'Creating a priceless hero',
                    name: HeroData.validHero.name,
                    price: '',
                    fans: HeroData.validHero.fans,
                    saves: HeroData.validHero.saves,
                    power: 'Super Speed',
                    alertExpectedText: 'Price is required'
                },

                // Creating a hero without fans
                // Criando um heroi sem fans
                {
                    testName: 'Creating a hero without fans',
                    name: HeroData.validHero.name,
                    price: HeroData.validHero.price,
                    fans: '',
                    saves: HeroData.validHero.saves,
                    power: 'Super Speed',
                    alertExpectedText: 'Fans is required'
                },

                // Creating a hero without saves
                // Criando um heroi sem salvamentos
                {
                    testName: 'Creating a hero without saves',
                    name: HeroData.validHero.name,
                    price: HeroData.validHero.price,
                    fans: HeroData.validHero.fans,
                    saves: '',
                    power: 'Super Speed',
                    alertExpectedText: 'Saves is required'
                },

                // Creating a hero without power
                // Criando um heroi sem
                {
                    testName: 'Creating a hero without power',
                    name: HeroData.validHero.name,
                    price: HeroData.validHero.price,
                    fans: HeroData.validHero.fans,
                    saves: HeroData.validHero.saves,
                    power: '',
                    alertExpectedText: 'Powers is required'
                },

                // Creating a hero with a very big name
                // Criando um heroi com nome muito grande
                {
                    testName:'Creating a hero with a very big name',
                    name: longName,
                    price: HeroData.validHero.price,
                    fans: HeroData.validHero.fans,
                    saves: HeroData.validHero.saves,
                    power: 'Super Speed',
                    alertExpectedText: 'Name is too long'
                },

                // Creating a hero by placing characters in the price field
                // Criando um heroi colocando caracteres no campo de preço
                {
                    testName: 'Creating a hero by placing characters in the price field',
                    name: HeroData.validHero.name,
                    price: 'test',
                    fans: HeroData.validHero.fans,
                    saves: HeroData.validHero.saves,
                    power: 'Super Speed',
                    alertExpectedText: 'Price must be a number'
                },

                // Creating a hero by placing characters in the fans field
                // Criando um heroi colocando caracteres no campo de fans
                {
                    testName: 'Creating a hero by placing characters in the fans field',
                    name: HeroData.validHero.name,
                    price: HeroData.validHero.price,
                    fans: 'teste',
                    saves: HeroData.validHero.saves,
                    power: 'Super Speed',
                    alertExpectedText: 'Fans must be a number'
                },

                // Creating a hero by placing characters in the saver field
                // Criando um heroi colocando caracteres no campo de saves
                {
                    testName: 'Creating a hero by placing characters in the saver field',
                    name: HeroData.validHero.name,
                    price: HeroData.validHero.price,
                    fans: HeroData.validHero.fans,
                    saves: '',
                    power: 'Super Speed',
                    alertExpectedText: 'Saves must be a number'
                },
            ]

            heroDataInvalid.forEach(({testName, name, price, fans, saves, power, alertExpectedText}) => {

                        const testTitle = `Failed Test : ${testName}`

                        it (testTitle, () => {
                            HomePage.buttonCreateNewHero.click()
                            HeroCreate (name, price, fans, saves, power)

                                if (alertExpectedText) {
                                    HeroesPage.alertGenericHeroes.contains(alertExpectedText).should('be.visible')
                                }
                        })
            })


    describe ('Validating hero editing scenarios', () => { // Validando cenários de ediçao de herois


            it('Should successfully edit hero information', () => { // Deve editar com sucesso as informações do herói
                HomePage.buttonEditHero.eq(0).click()
                HeroesPage.heroesName.clear().type('Captain Patria')
                HeroesPage.heroesFans.clear().type('100')
                HeroesPage.heroesPrice.clear().type('100')
                HeroesPage.heroesSaves.clear().type('100')
                HeroesPage.buttonSubmit.click()
                cy.wait(500)
                cy.contains('Captain Patria').should('be.visible').closest(HomePage.cardHoroes).within(() => {
                    HomePage.priceDisplay.should('be.visible').and('contain', '$100')
                    HomePage.fansDisplay.should('be.visible').and('have.text', '100')
                    HomePage.savesDisplay.should('be.visible').and('have.text', '100')
                    HomePage.buttonDeleteHeroCard.should('be.visible')
                })
            })

            it ('should include a hero with a negative number of fans', () => { // deve colocar um heroi com quantidade de fans negativa
                HomePage.buttonEditHero.eq(1).click()
                HeroesPage.heroesFans.clear().type('-56')
                HeroesPage.buttonSubmit.click()
                cy.contains('number of fans cannot be negative').should('be.visible')
            })

            it ('should put a hero with a negative price', () => { // deve colocar um heroi com preço negativo
                HomePage.buttonEditHero.eq(1).click()
                HeroesPage.heroesPrice.clear().type('-56')
                HeroesPage.buttonSubmit.click()
                cy.contains('Price cannot be negative').should('be.visible')
            })

            it ('You must place a hero with a negative amount of saves', () => { // deve colocar um heroi com quantidade de savalmentos negativo
                HomePage.buttonEditHero.eq(1).click()
                HeroesPage.heroesSaves.clear().type('-56')
                HeroesPage.heroesSaves.should('be.visible')
                HeroesPage.buttonSubmit.click()
                cy.contains('number of saves cannot be negative').should('be.visible')
            })

            it ('Leave the fan field empty', () => { // Deixar o campo de fãns vazio
                HomePage.buttonEditHero.eq(1).click()
                HeroesPage.heroesFans.clear()
                HeroesPage.buttonSubmit.click()
                cy.contains('Fans is required').should('be.visible')
            })

            it ('Leave the price field empty', () => { // Deixar o campo de preço vazio
                HomePage.buttonEditHero.eq(1).click()
                HeroesPage.heroesPrice.clear()
                HeroesPage.buttonSubmit.click()
                cy.contains('Price is required').should('be.visible')
            })

            it ('Leave the save field empty', () => { // Deixar o campo de salvamentos vazio
                HomePage.buttonEditHero.eq(1).click()
                HeroesPage.heroesSaves.clear()
                HeroesPage.buttonSubmit.click()
                cy.contains('Saves is required').should('be.visible')
            })

            it('should prevent creating a hero with a duplicate name', () => {
                HomePage.buttonCreateNewHero.click()
                cy.url().should('include', '/heroes/new')
                cy.get('[data-cy="nameInput"]').type(HeroData.heroDelete.name)
                cy.get('[data-cy="priceInput"]').type('100')
                cy.get('[data-cy="fansInput"]').type('10')
                cy.get('[data-cy="savesInput"]').type('1')
                cy.get('[data-cy="powersSelect"]').select('Super Strength')
                HeroesPage.buttonSubmit.click()
                cy.contains('Hero Already Exists').should('be.visible')
            })
        })
    })
    
    describe ('Aborting a hero edit operation', () => { //Validando cenários de abortar edição de heróis

        const heroCardIndex = 7

        it ('Canceling editing a hero before clicking the "submit" button', () => { //Cancelando a edição de um herói antes de clicar no botão "submit"

            let originalName
            let originalPrice
            let originalFans
            let originalSaves

            HomePage.cardHoroes.eq(heroCardIndex).as('targetHeroCard') // Obtemos aqui os detalhes originais do herói no card do herói na posição 7 (Captain Coverage) da página inicial
            cy.get('@targetHeroCard').within(() => {
                HomePage.nameDisplay.invoke('text').then((nameText) => {
                    originalName = nameText
                    return HomePage.priceDisplay.invoke('text')
                }).then((priceText) => {
                    originalPrice = priceText
                    return HomePage.fansDisplay.invoke('text')
                }).then((fansText) => {
                    originalFans = fansText
                    return HomePage.savesDisplay.invoke('text')
                }).then((savesText) => {
                    originalSaves = savesText
 
                    HomePage.buttonEditHero.first().click()
                });
            });


            cy.url().should('match', /\/heroes\/\d+\/edit$/)
            cy.wait(500)

            //Preenchemos os campos do formulário na página de edição com dados temporários
            HeroesPage.heroesName.clear().type('Nome Temporário Não Salvo')
            HeroesPage.heroesFans.clear().type('999')
            HeroesPage.heroesPrice.clear().type('999')
            HeroesPage.heroesSaves.clear().type('999')

            cy.go('back') // aqui clicamos no bortão de voltar no navegador que estaremos usando

            cy.url().should('match', /\/heroes$/)
            cy.wait(500)

            cy.then(() => {
                HomePage.cardHoroes.eq(heroCardIndex).within(() => {
                    HomePage.nameDisplay.should('have.text', originalName)
                    HomePage.fansDisplay.should('have.text', originalFans)

                    HomePage.priceDisplay.should('be.visible').and('contain', originalPrice)
                    HomePage.savesDisplay.should('have.text', originalSaves)
                })
            })
        })
    })

    describe('Hero Deletion Functionality', () => {

        beforeEach(() => {

            HomePage.buttonCreateNewHero.click()

                HeroCreate(
                    HeroData.heroDelete.name,
                    HeroData.heroDelete.price,
                    HeroData.heroDelete.fans,
                    HeroData.heroDelete.saves,
                    HeroData.heroDelete.power
                )

            cy.url().should('include', '/heroes')
            cy.contains('h5', HeroData.heroDelete.name).should('be.visible')
        })

        it('Successfully deletes a hero from the home page (from the card)', () => { // Exclui com sucesso um herói da página inicial - usando o botão da lixeiro no card do herói

            cy.contains('h5', HeroData.heroDelete.name).closest(HomePage.cardHoroesSelector).should('exist').should('be.visible').within(() => {
                HomePage.buttonDeleteHeroCard.click()
            })
            cy.contains('h3', 'Delete Hero').should('be.visible')
            HomePage.buttonYesDelete.click()

            cy.contains('h5', HeroData.heroDelete.name).should('not.exist')
        })

        it ('Successfully delete a hero by editing the initial hero (using card edit)', () => { // Excluir com sucesso um herói pela ediçao do herói inicial (usando o editar do cartão)

            cy.contains('h5', HeroData.heroDelete.name).closest(HomePage.cardHoroesSelector).should('exist').should('be.visible').within(() => {
                HomePage.buttonEditHero.click()
            })

            cy.url().should('match', /\/heroes\/\d+\/edit$/)
            HeroesPage.heroesName.should('have.value', HeroData.heroDelete.name)

            HomePage.buttonDeleteHero.click()
            cy.contains('h3', 'Delete Hero').should('be.visible')
            HomePage.buttonYesDelete.click()

            LoginPage.visitLoginPage()
            cy.contains('h5', HeroData.heroDelete.name).should('not.exist')

        })

        it ('Canceling a hero deletion before clicking the "Yes" button', () => { // Cancelar uma exclusão de um herói antes de clicar no botão "Sim"

            cy.contains('h5', HeroData.heroDelete.name).closest(HomePage.cardHoroesSelector).should('exist').should('be.visible').within(() => {
                HomePage.buttonEditHero.click()
            })

            cy.url().should('match', /\/heroes\/\d+\/edit$/)
            HeroesPage.heroesName.should('have.value', HeroData.heroDelete.name)

            HomePage.buttonDeleteHero.click()
            cy.contains('h3', 'Delete Hero').should('be.visible')
            HomePage.buttonNoDelete.click()

            HeroesPage.heroesName.should('have.value', HeroData.heroDelete.name)
        })
 
        afterEach(() => {

            cy.visit('/heroes')

            cy.contains('h5', HeroData.heroDelete.name).closest(HomePage.cardHoroesSelector).should('exist').should('be.visible').within(() => {
                HomePage.buttonEditHero.click()
            })

            HomePage.buttonDeleteHero.click()
            cy.contains('h3', 'Delete Hero').should('be.visible')
            HomePage.buttonYesDelete.click()

            LoginPage.visitLoginPage()
            cy.contains('h5', HeroData.heroDelete.name).should('not.exist')
        })
    })
})