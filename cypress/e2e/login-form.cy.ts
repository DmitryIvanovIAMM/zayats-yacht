describe('Landing Page', () => {
  it('c', () => {
    cy.visit('/sign-in');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
    //cy.get('button:contains("Get Quote")').should('be.visible');
    cy.get('button:contains("Login")').should('be.visible');
    //cy.get('button:contains("LogIn")').should('be.disabled');
    cy.get('[data-testid="login-form-button"]').should('be.disabled');
    cy.contains('Login Form');

    cy.get('[data-testid="name-form-text-input"]').should('be.visible');
    cy.get('[data-testid="email-form-text-input"]').should('be.visible');
    cy.get('[data-testid="password-form-text-input"]').should('be.visible');
    cy.get('[data-testid="password-eye"]').should('be.visible');
  });

  it('should show/hide password by triggering input attribute', () => {
    cy.visit('/sign-in');

    cy.get('[data-testid="password-form-text-input"]').type('customer');
    cy.get('[data-testid="password-form-text-input"]').and('have.attr', 'type', 'password');
    cy.get('[data-testid="password-eye"]').click();
    cy.get('[data-testid="password-form-text-input"]').and('have.attr', 'type', 'text');
    cy.get('[data-testid="password-eye"]').click();
    cy.get('[data-testid="password-form-text-input"]').and('have.attr', 'type', 'password');
  });

  it('should validate email and passport fields', () => {
    cy.visit('/sign-in');
    cy.contains('Must be valid email').should('not.exist');
    cy.contains('Please create a stronger password').should('not.exist');
    cy.get('[data-testid="login-form-button"]').should('be.disabled');

    // check the incorrect email and password
    cy.get('[data-testid="email-form-text-input"]').type('customer2email').blur();
    cy.contains('Must be valid email');
    cy.get('[data-testid="password-form-text-input"]').type('customer').blur();
    cy.contains('Please create a stronger password');
    cy.get('[data-testid="login-form-button"]').should('be.disabled');
  });

  it('should show "Invalid credentials" for wrong credentials', () => {
    cy.visit('/sign-in');
    cy.contains('Must be valid email').should('not.exist');
    cy.contains('Please create a stronger password').should('not.exist');

    // check the correct email and password but with wrong credentials
    cy.get('[data-testid="email-form-text-input"]').clear().type('customer2@email.com').blur();
    cy.contains('Must be valid email').should('not.exist');
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht1234').blur();
    cy.contains('Please create a stronger password').should('not.exist');

    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Invalid credentials', { timeout: 15000 });
  });

  it('should allow login with correct credentials', () => {
    cy.visit('/sign-in');
    cy.contains('Must be valid email').should('not.exist');
    cy.contains('Please create a stronger password').should('not.exist');

    // check the correct email and password
    cy.get('[data-testid="email-form-text-input"]').clear().type('customer2@email.com').blur();
    cy.contains('Must be valid email').should('not.exist');
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.contains('Please create a stronger password').should('not.exist');

    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
  });

  it('should redirect to page if callbackUrl is present', () => {
    // cy.visit('/sign-in');
    // cy.get('[data-testid="navbar-login-button').should('be.enabled').click({ timeout: 15000 });

    cy.visit('/sign-in?callbackUrl=/quote-request');
    cy.contains('Must be valid email').should('not.exist');
    cy.contains('Please create a stronger password').should('not.exist');

    // check the correct email and password
    cy.get('[data-testid="email-form-text-input"]').clear().type('customer2@email.com').blur();
    cy.contains('Must be valid email').should('not.exist');
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.contains('Please create a stronger password').should('not.exist');

    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Get Quote', { timeout: 15000 });
  });
});
