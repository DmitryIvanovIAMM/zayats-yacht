describe('Admin on Ports management page', () => {
  beforeEach(() => {
    cy.visit('/sign-in?callbackUrl=/admin/ports');
    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Ports', { timeout: 40000 });
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

    cy.contains('11-12 of 12 rows', {
      timeout: 10000
    });

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
    cy.contains('1-10 of 12 rows', {
      timeout: 10000
    });
  });

  it('should allow sorting', () => {
    // sorting by port name
    // first click reverse order of ports
    cy.contains('Port Name').click();
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Victoria, British Columbia', {
          timeout: 10000
        });
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
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Colon, Panama', {
          timeout: 10000
        });
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
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Asia', {
          timeout: 10000
        });
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
          'West Coast North America',
          {
            timeout: 10000
          }
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

  it('should allow filtering', () => {
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10);
    });
    // check filtering by port name
    cy.get('[aria-label="Filter by Port Name"]').type('Fort Lauderdale');

    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'Fort Lauderdale, Florida');
      });

    cy.get('[aria-label="Filter by Port Name"]').clear();
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10, {
        timeout: 10000
      });
    });

    // check filtering by destination name
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10);
    });
    cy.get('[aria-label="Filter by Destination Name"]').type('Mediterranean');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 3, {
        timeout: 10000
      });
    });

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'Mediterranean');
      });

    // clear filter
    cy.get('[aria-label="Filter by Destination Name"]').clear();
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10, {
        timeout: 10000
      });
    });
  });

  it('should show only "Port Name" and "Image" columns on small screens', () => {
    cy.viewport('iphone-x');

    cy.get('thead').within(() => {
      cy.contains('Port Name').should('exist').should('be.visible');
      cy.contains('Destination Name').should('exist').should('not.be.visible');
      cy.contains('Image').should('exist').should('be.visible');
    });
  });

  it('should allow add a new port', () => {
    cy.get('[data-testid="add-port-button"]').should('be.visible').click();
    cy.contains('Add Port', { timeout: 10000 });

    // check each filed validation
    cy.get('[data-testid="portName-form-text-input"]').click().blur();
    cy.contains('Name is required');
    cy.get('[data-testid="destinationName-form-text-input"]').click().blur();
    cy.contains('Destination is required');

    // click cancel button and check we on data grid
    cy.get('[data-testid="cancel-form-button"]').click();
    cy.contains('Ports', { timeout: 10000 });

    // click add port button again
    cy.get('[data-testid="add-port-button"]').should('be.visible').click();

    // fill in the form with names to be firts in table
    cy.get('[data-testid="portName-form-text-input"]').type('A Test Port');
    cy.get('[data-testid="destinationName-form-text-input"]').type('A Test Destination');
    cy.get('[data-testid="image-selector"]').selectFile('cypress/fixtures/minimal_1.svg', {
      force: true
    });
    cy.get('[data-testid="submit-form-button"]').click();

    // check if the new port is added to the table
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'A Test Port');
        cy.get('[data-testid="ports-destination-name"]').should('contain', 'A Test Destination');
        // check thhat image src contains both auto.testing.efacity.com and minimal_1.svg signatures
        // /_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fauto.testing.efacity.com%2Fuploads%2Fc_RbUZu8t6.jpg.jpg&w=256&q=75
        cy.get('[data-testid="ports-image-file-name"] img')
          .should('have.attr', 'src')
          .and('include', 'auto.testing.efacity.com')
          .and('include', 'minimal_1');
      });
  });

  it('should allow edit a port', () => {
    cy.get('[data-testid="port-edit-button"]').first().click();
    cy.contains('Edit Port', { timeout: 10000 });

    // click cancel button and check we onn data grid
    cy.get('[data-testid="cancel-form-button"]').click();
    cy.contains('Ports', { timeout: 10000 });

    // click edit port button again
    cy.get('[data-testid="port-edit-button"]').first().click();

    // fill in the form with names to be firts in table
    cy.get('[data-testid="portName-form-text-input"]').clear().type('A Test Port Edited');
    cy.get('[data-testid="destinationName-form-text-input"]')
      .clear()
      .type('A Test Destination Edited');
    cy.get('[data-testid="image-selector"]').selectFile('cypress/fixtures/minimal_2.svg', {
      force: true
    });
    cy.get('[data-testid="submit-form-button"]').click();

    // check if the new port is added to the table
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('contain', 'A Test Port Edited');
        cy.get('[data-testid="ports-destination-name"]').should(
          'contain',
          'A Test Destination Edited'
        );
        // check thhat image src contains both auto.testing.efacity.com and fethiyeMap_sm signatures
        cy.get('[data-testid="ports-image-file-name"] img')
          .should('have.attr', 'src')
          .and('include', 'auto.testing.efacity.com')
          .and('include', 'minimal_2');
      });
  });

  it('should allow delete a port', () => {
    cy.get('[data-testid="port-delete-button"]').first().click();
    cy.contains('Are you sure you want to delete "A Test Port Edited" port?');
    cy.get('[data-testid="confirmation-modal-confirm-button"]').click();

    // check if the port is deleted
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-port-name"]').should('not.contain', 'A Test Port Edited');
      });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ports-destination-name"]').should(
          'not.contain',
          'A Test Destination Edited'
        );
      });
  });
});
