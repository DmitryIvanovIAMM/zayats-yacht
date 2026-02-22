// @ts-ignore: Cypress.Commands.add custom command type
Cypress.Commands.add('login', (role = 'user', callbackUrl = '') => {
  // UI-based login for NextAuth.js
  let email = '';
  let password = '';
  if (role === 'admin') {
    email = 'yacht.admin@gmail.com';
    password = 'Yacht123';
  } else {
    email = 'customer3@email.com';
    password = 'Yacht123';
  }
  const url = callbackUrl ? `/sign-in?callbackUrl=${callbackUrl}` : '/sign-in';
  cy.visit(url);
  cy.get('[data-testid="email-form-text-input"]').clear().type(email).blur();
  cy.get('[data-testid="password-form-text-input"]').clear().type(password).blur();
  cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
});
