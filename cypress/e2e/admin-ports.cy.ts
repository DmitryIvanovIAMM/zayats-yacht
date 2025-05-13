describe('Admin on Ports page', () => {
  beforeEach(() => {
    cy.visit('/sign-in?callbackUrl=/admin/ports');
    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Ports', { timeout: 25000 });
  });

  it('should see data grid', () => {
    // table header
    cy.get('thead').within(() => {
      cy.contains('Port Name');
      cy.contains('Destination Name');
      cy.contains('Image');
    });

    // table body
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10);
      cy.get('td').should('have.length', 30);
    });

    // test data  are from seedData.ts PORTS sorted in alphabetical order
    // check if the first row has the correct data
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Colon, Panama');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Central America');
      });
    // check if the second row has the correct data
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Ensenada, Mexico');
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });
    // check if the third row has the correct data
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fethiye, Turkey');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    // check if the fourth row has the correct data
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fort Lauderdale, Florida');
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'East Coast North America'
        );
      });
    // check if the fifth row has the correct data
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Genoa, Italy');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    // check if the sixth row has the correct data
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Golfito, Costa Rica');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Central America');
      });
    // check if the seventh row has the correct data
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Hong Kong');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Asia');
      });
    // check if the eighth row has the correct data
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'La Paz, Mexico');
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });
    // check if the ninth row has the correct data
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Palm Beach, Florida');
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'East Coast North America'
        );
      });
    // check if the tenth row has the correct data
    cy.get('tbody tr')
      .eq(9)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Palma de Mallorca, Spain');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
  });

  it('should allow forward and backward page navigation', () => {
    cy.contains('1-10 of 12 rows');
    cy.get('[aria-label="Go to next page"]').should('be.enabled').click();

    cy.contains('11-12 of 12 rows');

    // check if the first row on second page has the correct data
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should(
          'contain',
          'Tortola, British Virgin Islands'
        );
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Caribbean');
      });
    // check if the second row on second page has the correct data
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Victoria, British Columbia');
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });

    // goto back on first page
    cy.get('[aria-label="Go to previous page"]').should('be.enabled').click();
    cy.contains('1-10 of 12 rows');
  });

  it('should allow sorting', () => {
    // sorting by port name
    // first click reverse order of ports
    cy.contains('Port Name').click();
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Victoria, British Columbia');
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should(
          'contain',
          'Tortola, British Virgin Islands'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Palma de Mallorca, Spain');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Palm Beach, Florida');
      });
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'La Paz, Mexico');
      });
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Hong Kong');
      });
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Golfito, Costa Rica');
      });
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Genoa, Italy');
      });
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fort Lauderdale, Florida');
      });
    cy.get('tbody tr')
      .eq(9)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fethiye, Turkey');
      });

    // second sort by port name restore initial order
    cy.contains('Port Name').click();
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Colon, Panama');
      });
    cy.get('tbody tr');
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Ensenada, Mexico');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fethiye, Turkey');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fort Lauderdale, Florida');
      });
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Genoa, Italy');
      });
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Golfito, Costa Rica');
      });
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Hong Kong');
      });
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'La Paz, Mexico');
      });
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Palm Beach, Florida');
      });
    cy.get('tbody tr')
      .eq(9)
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Palma de Mallorca, Spain');
      });

    // sorting by destination name
    // first click order in forward order
    cy.contains('Destination Name').click();
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Asia');
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Caribbean');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Central America');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Central America');
      });
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'East Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'East Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(9)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });

    // second click order in reverse order
    cy.contains('Destination Name').click();
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'West Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'East Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'East Coast North America'
        );
      });
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Central America');
      });
    cy.get('tbody tr')
      .eq(9)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Central America');
      });
  });
});
