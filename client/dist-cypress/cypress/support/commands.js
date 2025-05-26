/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('login', (username, password) => {
    cy.session(`login-${username}`, () => {
        cy.visit('/');
        cy.get('button').contains('Login').click();
        cy.get('input[type="email"]').type(username);
        cy.get('input[type="password"]').type(password);
        cy.get('button').contains('Sign in').click();
        cy.contains('button', 'Logout', { log: false }).should('be.visible');
    });
});
Cypress.Commands.add('getByCy', (cyId) => {
    return cy.get(`[data-cy='${cyId}'`);
});
Cypress.Commands.add('resetDb', () => {
    cy.exec('npx prisma migrate reset --skip-seed -f && npx prisma db push && npx prisma db seed');
});
Cypress.Commands.add('createHero', () => {
    return cy.task('createHero').then((newHero) => {
        delete newHero.createdAt;
        delete newHero.updatedAt;
        delete newHero.avatar;
        return cy.wrap(newHero).as('newHero');
    });
});
Cypress.Commands.add('deleteHero', (id) => {
    cy.task('deleteHero', id);
});
export {};
