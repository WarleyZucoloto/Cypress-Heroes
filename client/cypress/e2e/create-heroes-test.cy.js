import LoginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import HeroesPage from "../pages/heroes-create-form"
import HeroData from "../fixtures/hero-data.json"
import DataUser from "../fixtures/manager.json"
import {getRandomPowerItemHero} from "../support/utils"


describe ('Hero Management Module', () => { // Módulo de Gerenciamento de Heróis

    const HeroCreate = (name,price, fans, saves, power) => {
            HeroesPage.HeroFiedForm(name,price, fans, saves)
            HeroesPage.heroesPowers.select(power)
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

                cy.window().then((win) => {  // Armazena o objeto completo de autenticação (com access_token, user, expiresAt) no localStorage geralmente o nome é 'auth_result'
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

    it ('Creating a new hero', () => { //Criando um novo herói

            HeroesPage.getAllPowerText().then(allPower => {
                const randomPower = getRandomPowerItemHero()
                cy.log (`Poder escolhido foi: ${randomPower}`)
            })

            HomePage.buttonCreateNewHero.click()
            HeroCreate(
                HeroData.validHero.name,
                HeroData.validHero.price,
                HeroData.validHero.fans,
                HeroData.validHero.saves,
                randomPower           
            )
     })
})