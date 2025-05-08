describe('Landing Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('/sign-in');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
    //cy.get('button:contains("Get Quote")').should('be.visible');
    cy.get('button:contains("Login")').should('be.visible');
    cy.get('button:contains("LogIn")').should('be.visible');
    cy.contains('Login Form');

    cy.get('[data-testid="user-name"]').should('be.visible');
    cy.get('[data-testid="email"]').should('be.visible');
    cy.get('[data-testid="password"]').should('be.visible');
    cy.get('[data-testid="password-eye"]').should('be.visible');

    // check the incorrect email and password
    cy.get('[data-testid="email-form-text-input"]').type('customer2email').blur();
    cy.contains('Must be valid email');
    cy.get('[data-testid="password-form-text-input"]').type('customer').blur();
    cy.contains('Please create a stronger password');

    // check the correct email and password
    cy.get('[data-testid="email-form-text-input"]').clear().type('customer2@email.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
  });
});
