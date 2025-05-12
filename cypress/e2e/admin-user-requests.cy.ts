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

    // table body
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 4);
      cy.get('td').should('have.length', 16);
    });

    // check the first row
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer2');
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer2@email.com');
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:15 PM'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('not.exist');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Yacht Name:'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Supper-Pupper_2'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should('contain', 'Name:');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Customer2'
        );
      });

    // check the second row
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer3');
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer3@email.com');
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:14 PM'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('not.exist');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Yacht Name:'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Supper-Pupper_3'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should('contain', 'Name:');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Customer3'
        );
      });

    // check the third row
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer4');
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer4@email.com');
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:13 PM'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('not.exist');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Yacht Name:'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Supper-Pupper_4'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should('contain', 'Name:');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Customer4'
        );
      });

    // check the fourth row;
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Yacht Admin');
        cy.get('[data-testid="quote-request-from-email"]').should(
          'contain',
          'yacht.admin@gmail.com'
        );
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:12 PM'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('not.exist');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Yacht Name:'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Supper-Pupper_5'
        );
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should('contain', 'Name:');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should(
          'contain',
          'Yacht Admin'
        );
      });
  });
});
