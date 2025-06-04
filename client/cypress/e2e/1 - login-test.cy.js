import LoginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import DataUser from "../fixtures/manager.json"

describe('Login Page Test', () => { // Teste de página de login

    const loginVerify = (email, password) => {
        LoginPage.login(email, password)
        LoginPage.buttonSignIn.click()
    }

    beforeEach (() => {
        LoginPage.visitLoginPage()
        LoginPage.buttonLogin.click()
    })

    it ('Successful Login with admin user - the one who can can create and edit hero roster', () => { // Login Bem-Sucedido com usuário administrador - aquele que pode criar e editar lista de herois

        loginVerify(DataUser.userAdministrador.email, DataUser.userAdministrador.password)

        HomePage.buttonCreateNewHero.should('be.visible')
        HomePage.buttonLogout.should('be.visible')

        HomePage.cardHoroes.first().within(() => {
            HomePage.buttonEditHero.should('be.visible')
            HomePage.buttonDeleteHeroCard.should('be.visible')
        })
    })

    it ('Successful Login with user without administrator permission - one who CANNOT create and edit hero list', () => { // Login Bem-Sucedido com usuário sem permissão administrador - aquele que NÃO pode criar e editar lista de herois

        loginVerify(DataUser.userRelesMortal.email, DataUser.userRelesMortal.password)

        HomePage.buttonLogout.should('be.visible')

        HomePage.cardHoroes.first().within(() => {
            HomePage.buttonEditHero.should('not.exist')
            HomePage.buttonDeleteHeroCard.should('not.exist')
        })
    })
    
        // Cenários de login inválido
        // Invalid login scenarios

    const invalidLoginScenarios = [
        // 1. Cenário de formato de e-mail inválido
        // 1. Invalid email format scenario
        {
            testName: 'Invalid Email Format',
            email: 'invalid-email', // Exemplo: falta @ e domínio
            password: DataUser.userAdministrador.password,
            expectedAlerts: ['Email is not valid'] // Mensagem que o app exibe (ajuste se for diferente)
        },
        // 2. Cenário de e-mail válido com senha inválida (generalizado para credenciais inválidas)
        // 2. Valid email with invalid password scenario (generalized for invalid credentials)
        {
            testName: 'Invalid Password',
            email: DataUser.userAdministrador.email,
            password: DataUser.InvalidUser.password, // Usando uma senha que sabemos ser inválida
            expectedAlerts: ['Invalid email or password']
        },
        // 3. Cenário de e-mail inválido (não cadastrado) com senha válida
        // 3. Invalid email (not registered) with valid password scenario
        {
            testName: 'Invalid Email (Not Registered)',
            email: DataUser.InvalidUser.email,
            password: DataUser.userAdministrador.password, // Usando uma senha válida para um email não existente
            expectedAlerts: ['Invalid email or password']
        },
        // 4. Cenário de e-mail e senha inválidos (geral, para um usuário "desligado" ou não existente)
        // 4. Invalid email and password scenario (general, for a "disabled" or non-existent user)
        {
            testName: 'Invalid Email and Password (Generic Invalid User)',
            email: DataUser.InvalidUser.email,
            password: DataUser.InvalidUser.password,
            expectedAlerts: ['Invalid email or password']
        },
        // 5. Cenário de campo de e-mail em branco
        // 5. Empty email field scenario
        {
            testName: 'Empty Email Field',
            email: '',
            password: DataUser.userAdministrador.password,
            expectedAlerts: ['Email is required']
        },
        // 6. Cenário de campo de senha em branco
        // 6. Empty password field scenario
        {
            testName: 'Empty Password Field',
            email: DataUser.userAdministrador.email,
            password: '',
            expectedAlerts: ['Password is required']
        },
        // 7. Cenário de e-mail e senha em branco
        // 7. Empty email and password fields scenario
        {
            testName: 'Empty Email and Password Fields',
            email: '',
            password: '',
            expectedAlerts: ['Email is required', 'Password is required']
        },
        // 8. Cenário de Case Sensitive para E-mail (se sua aplicação distinguir maiúsculas/minúsculas no e-mail)
        // 8. Case Sensitive Email scenario (if your application distinguishes between upper/lower case in email)
        {
            testName: 'Case Sensitive Email',
            email: DataUser.userAdministrador.email.toUpperCase(),
            password: DataUser.userAdministrador.password,
            expectedAlerts: ['Invalid email or password'] // Ou uma mensagem mais específica para case sensitive, se houver
        },
        // 9. Cenário de Case Sensitive para Senha (se sua aplicação distinguir maiúsculas/minúsculas na senha)
        // 9. Case Sensitive Password scenario (if your application distinguishes between upper/lower case in password)
        {
            testName: 'Case Sensitive Password',
            email: DataUser.userAdministrador.email,
            password: DataUser.userAdministrador.password.toUpperCase(),
            expectedAlerts: ['Invalid email or password'] // Ou uma mensagem mais específica para case sensitive, se houver
        },

        // --- CENÁRIO DE VULNERABILIDADE (IGNORADO) ---
        // Este teste é ignorado porque todos os usuários de teste atualmente compartilham a mesma senha no ambiente de teste.
        // Não é possível validar cenários onde um usuário tenta logar com a senha de outro usuário.

        // --- VULNERABILITY SCENARIO (SKIPPED) ---
        // This test is skipped because all test users currently share the same password in the test environment.
        // It is not possible to validate scenarios where a user attempts to log in with a different user's password.
        {
            testName: 'Security Vulnerability - Cross-User Login (SKIPPED)', // Vulnerabilidade de segurança - Login entre usuários 
            email: DataUser.userAdministrador.email,
            password: DataUser.userRelesMortal.password,
            expectedAlerts: ['Invalid email or password'], // O que seria esperado se o teste rodasse
            skip: true,
            skipReason: 'This test is skipped because all test users currently share the same password in the test environment. It is not possible to validate scenarios where a user attempts to log in with a different user\'s password.'
         // skipReason: 'Este teste foi ignorado porque todos os usuários de teste atualmente compartilham a mesma senha no ambiente de teste. Não é possível validar cenários em que um usuário tenta fazer login com uma senha de usuário diferente.'   
        }
    ]

    invalidLoginScenarios.forEach(({ testName, email, password, expectedAlerts, skip, skipReason }) => { // Cenários de Login Invválidos
        const testFunction = skip ? it.skip : it;

        testFunction(`Failed - ${testName}`, () => {
            if (skip) {
                cy.log(`Test skipped: ${testName} - Reason: ${skipReason}`)
                return
            }
            loginVerify(email, password)

            if (expectedAlerts.length === 1) {
                LoginPage.alertGeneric.should('be.visible').and('contain', expectedAlerts[0])
            } 
            
            else if (expectedAlerts.length > 1) {
                expectedAlerts.forEach((alertText, index) => {
                    LoginPage.alertGeneric.eq(index).should('be.visible').and('contain', alertText)
                })
            }
        })
    })
})