// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('login', (role) => {
  cy.visit('/login');
  let fixtureFile;
  if (role === 'user') fixtureFile = 'user.json';
  if (role === 'owner') fixtureFile = 'owner.json';
  if (role === 'admin') fixtureFile = 'admin.json';
  cy.intercept('**/user/login', {
    statusCode: 200,
    body: { granted: true },
  });
  cy.intercept(`**/user/get_profil`, {
    statusCode: 200,
    fixture: fixtureFile,
  });
  cy.get('[id="email-login"]').type('john.doe@email.com');
  cy.get('[id="password-login"]').type('789456');
  cy.get('[data-cy=submit-login]').click();
  cy.contains('Email ou mot de passe non valide(s)').should('not.exist');
});

Cypress.Commands.add('hover', (selector, text) => {
  cy.get(selector).within(() => {
    cy.contains(text).invoke('show');
  });
});
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
