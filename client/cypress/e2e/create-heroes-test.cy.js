import LoginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import HeroesPage from "../pages/heroes-create-form"
import HeroData from "../fixtures/hero-data"
import DataUser from "../fixtures/manager.json"
import getRandomPowerItemHero from "../support/utils"


describe ('Hero Management Module', () => { // Módulo de Gerenciamento de Heróis

    const HeroCreate = (name,price, fans, saves, power) => {

            HeroesPage.HeroFiedForm(name,price, fans, saves)

                if (power) {
                    HeroesPage.heroesPowers.select(power)
                }

            HeroesPage.buttonSubmit.click()
        }

    beforeEach(() => {

        const API_URL = 'http://localhost:3001';
            cy.request({
                method: 'POST',
                url: `${API_URL}/auth`, // URL da API de autenticação
                body: {
                    username: DataUser.userAdministrador.email, 
                    password: DataUser.userAdministrador.password
                },
                headers: {
                    'Content-Type': 'application/json'
                }
                
            }).then((response) => {
                expect(response.status).to.eq(201); // Verifica se a requisição foi bem-sucedida (status 200)

                cy.window().then((win) => {  // Armazena o objeto completo de autenticação no localStorage na maioria das vezes o nome é 'auth_result'
                    win.localStorage.setItem('auth_result', JSON.stringify(response.body));
                });
                    LoginPage.visitLoginPage()
                    HomePage.buttonCreateNewHero.should('be.visible') // se o login der certo ele verifica os elementos de acesso admin da página
                    HomePage.buttonLogout.should('be.visible')
                    HomePage.cardHoroes.first().within(() => {
                        HomePage.buttonEditHero.should('be.visible')
                        HomePage.buttonDeleteHero.should('be.visible')
                })
            })
        })

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
        HomePage.buttonCreateNewHero.click();
        HeroCreate('', '', '', '', '');

            cy.contains('Name is required').should('be.visible');
            cy.contains('Price is required').should('be.visible');
            cy.contains('Fans is required').should('be.visible');
            cy.contains('Saves is required').should('be.visible');
            cy.contains('Powers is required').should('be.visible');
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

    heroDataInvalid.forEach(({testName, name, price, fans, saves, power, alertExpectedText, alertExpectedTexts}) => {

        const testTitle = `Failed Test : ${testName}`

        it (testTitle, () => {
            HomePage.buttonCreateNewHero.click()
            HeroCreate (name, price, fans, saves, power)

                if (alertExpectedText) {
                    cy.contains(alertExpectedText).should('be.visible')
                }

                if (alertExpectedTexts && alertExpectedTexts.length > 0) {
                    alertExpectedTexts.forEach(text => {
                        cy.contains(text).should('be.visible')
                })
            }        
        })
    })
})
