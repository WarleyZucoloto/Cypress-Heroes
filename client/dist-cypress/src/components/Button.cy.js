import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from './Button';
describe('Button', () => {
    it('should mount with text', () => {
        cy.mount(_jsx(Button, { children: "Click me" }));
        cy.get('button').should('have.text', 'Click me');
    });
    it('should not be focused when focus is falsey', () => {
        cy.mount(_jsx(Button, { children: "Click me" }));
        cy.focused().should('not.exist');
    });
    it('should be focused when focus is true', () => {
        cy.mount(_jsx(Button, { focus: true, children: "Click me" }));
        cy.focused().should('have.text', 'Click me');
    });
    it('should respond to click event', () => {
        cy.mount(_jsx(Button, { onClick: cy.spy().as('onClickSpy'), children: "Click me" }));
        cy.get('button').click();
        cy.get('@onClickSpy').should('have.been.called');
    });
});
