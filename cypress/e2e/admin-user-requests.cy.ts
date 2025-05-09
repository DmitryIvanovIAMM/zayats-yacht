describe('Admin on User Requests Page', () => {
  it('should see data grid', () => {
    cy.visit('/sign-in?callbackUrl=/admin/users-requests');

    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('User Requests', { timeout: 25000 });

    // table header
    cy.get('thead').within(() => {
      cy.contains('From Name');
      cy.contains('From Email');
      cy.contains('Received At');
      cy.contains('Request');
    });
  });
});
