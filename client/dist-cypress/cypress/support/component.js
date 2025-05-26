import { jsx as _jsx } from "react/jsx-runtime";
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
import './commands';
import '../../src/styles.scss';
// Alternatively you can use CommonJS syntax:
// require('./commands')
import { mount } from 'cypress/react18';
import CyHerosProvider from '../../src/components/CyHeroesProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryRouter } from 'react-router';
Cypress.Commands.add('mount', mount);
Cypress.Commands.add('mountWithProviders', mountWithProviders);
function mountWithProviders(jsx, routePath, initialPath) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { refetchOnWindowFocus: false },
        },
    });
    let routes = [
        {
            path: routePath,
            element: jsx,
        },
    ];
    const router = createMemoryRouter(routes, {
        initialEntries: [initialPath],
    });
    cy.stub(router, 'navigate').as('navigateSpy');
    const wrapped = (_jsx(CyHerosProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(RouterProvider, { router: router }) }) }));
    cy.mount(wrapped);
}
