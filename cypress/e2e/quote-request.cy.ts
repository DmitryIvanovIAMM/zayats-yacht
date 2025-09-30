/// <reference types="cypress" />

describe('Quote Request Page (auth required)', () => {
  beforeEach(() => {
    // @ts-ignore: custom command 'login' is defined in Cypress support
    cy.login('user', '/quote-request');
    cy.contains('Last Name', { timeout: 20000 });
  });

  it('should render quote request form', () => {
    cy.get('form').should('be.visible');
    cy.get('[data-testid="firstName-form-text-input"]').should('be.visible');
    cy.get('[data-testid="lastName-form-text-input"]').should('be.visible');
    cy.get('[data-testid="email-form-text-input"]').should('be.visible');
    cy.get('[data-testid="quote-request-submit-button"]').should('be.visible');
  });

  it('should validate required fields', () => {
    cy.get('[data-testid="quote-request-submit-button"]').click();
    cy.contains('First Name is required');
    cy.contains('Last Name is required');
    cy.contains('Email is required');
  });

  it('should submit form with valid data', () => {
    cy.get('[data-testid="firstName-form-text-input"]').type('Test');
    cy.get('[data-testid="lastName-form-text-input"]').type('Customer');
    cy.get('[data-testid="email-form-text-input"]').type('customer3@email.com');
    cy.get('[data-testid="phoneNumber-form-text-input"]').type('+1234567890');
    cy.get('[data-testid="quote-request-submit-button"]').click();
    cy.contains('Quote request sent successfully', { timeout: 15000 });
  });
});
