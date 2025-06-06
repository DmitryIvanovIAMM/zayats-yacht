describe('Admin on Schedules management page', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');

    cy.visit('/sign-in?callbackUrl=/admin/schedule-management');
    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Sailing Name', { timeout: 45000 });
  });

  // this is default ordering in descendant start date
  it('should see data grid', () => {
    // table header
    cy.get('thead').within(() => {
      cy.contains('Sailing Name');
      cy.contains('Starts On');
      cy.contains('Route');
    });

    // table body
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 9);
      cy.get('td').should('have.length', 36);
    });

    // check the first row
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Westbound North America and Asia Christmas Sailing'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Hong Kong');
      });

    // check the second row

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Christmas Sailing');
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Genoa, Italy');
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Tortola, British Virgin Islands'
        );
      });

    // check the third row
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Fort Lauderdale Boat Show Sailing'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Genoa, Italy');
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
      });

    // check the fourth row
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'North America Eastbound Summer Sailing'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Ensenada, Mexico'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Fort Lauderdale');
      });

    // check the fifth row
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Asia to North America Summer Sailing'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Victoria, British Columbia'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Victoria, British Columbia'
        );
      });

    // check the sixth row
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Europe to Asia Sailing');
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Hong Kong');
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Hong Kong');
      });

    // check the seventh row
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Summer Mediterranean Sailing'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Fethiye, Turkey');
      });

    // check the eighth row
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Grand Prix Sailing');
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Genoa, Italy');
      });

    // check the ninth row
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Alaska Yachting Adventure'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
      });
  });

  it('should allow to expand route data', () => {
    // expand data in the second row
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="collapse-button"]').click();
        cy.get('[data-testid="scheule-sailingt-data-expanded"]').should('be.visible');
        cy.get('[data-testid="scheule-sailingt-data-collapsed"]').should('not.exist');
        //cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Arrival');
        cy.contains('Arrival');
        cy.contains('Departure');
        cy.contains('Port');
        cy.contains('Genoa, Italy');
        cy.contains('Palma de Mallorca, Spain');
        cy.contains('Tortola, British Virgin Islands');
      });

    // second click hide additional route data
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="collapse-button"]').click();
        cy.get('[data-testid="scheule-sailingt-data-collapsed"]').should('be.visible');
        cy.get('[data-testid="scheule-sailingt-data-expanded"]').should('not.exist');
        cy.contains('Genoa, Italy');
        cy.contains('Tortola, British Virgin Islands');
      });
  });

  it('should allow sorting', () => {
    cy.contains('Sailing Name').click();

    // sort by sailing name
    // first click - in sailing name ascending order
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Alaska Yachting Adventure',
          { timeout: 10000 }
        ); // add timeouts after click to wait backend
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Asia to North America Summer Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Christmas Sailing');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Europe to Asia Sailing');
      });
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Fort Lauderdale Boat Show Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Grand Prix Sailing');
      });
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'North America Eastbound Summer Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Summer Mediterranean Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Westbound North America and Asia Christmas Sailing'
        );
      });

    // second click - in sailing name descending order
    cy.contains('Sailing Name').click();
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Westbound North America and Asia Christmas Sailing',
          { timeout: 10000 }
        );
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Summer Mediterranean Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'North America Eastbound Summer Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Grand Prix Sailing');
      });
    cy.get('tbody tr')
      .eq(4)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Fort Lauderdale Boat Show Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Europe to Asia Sailing');
      });
    cy.get('tbody tr')
      .eq(6)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Christmas Sailing');
      });
    cy.get('tbody tr')
      .eq(7)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Asia to North America Summer Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(8)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Alaska Yachting Adventure'
        );
      });
  });

  it('should allow filtering', () => {
    cy.get('thead tr th')
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Filter by Sailing Name"]').type('America');
      });

    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 3, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Westbound North America and Asia Christmas Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'North America Eastbound Summer Sailing'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Asia to North America Summer Sailing'
        );
      });
  });

  it('should allow change active status for sailing', () => {
    // select data-testid="schedule-sailing-active-checkbox" in second row in table
    // check is active and click
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-active-checkbox-input"]')
          .should('be.checked')
          .click();
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-active-checkbox-input"]', {
          timeout: 10000
        })
          .should('not.be.checked')
          .click();
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="schedule-sailing-active-checkbox-input"]', {
          timeout: 10000
        }).should('be.checked');
      });
  });

  it('should not allow add sailing without stops', () => {
    cy.get('[data-testid="add-sailing-button"]').click();
    cy.contains('Add Schedule', { timeout: 10000 });
    cy.url().should('include', 'admin/schedule-management/sailing');

    // delete first stop and try to submit
    cy.get('[data-testid="stop-delete-button"]').eq(0).click();
    cy.contains('No stops added yet.');
    cy.contains("Click the '+' icon to add a stop.");

    cy.get('[data-testid="submit-form-button"]').click();
    cy.url().should('include', 'admin/schedule-management/sailing');
  });

  // Next tests to add / edit / delete sailing are dependable each other
  it('should allow add sailing', () => {
    cy.get('[data-testid="add-sailing-button"]').click();
    cy.contains('Add Schedule', { timeout: 10000 });

    // try to submit form without data and check validation errors
    cy.get('[data-testid="submit-form-button"]').click();
    cy.contains('Sailing name is required');
    cy.contains('Select a ship');
    cy.contains('Select a port');
    cy.contains('Date is required');
    // cy.contains('Miles are required'); // it has default value = 0

    // click Cancel button and check we on data grid
    cy.get('[data-testid="cancel-form-button"]').click();
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 9);
    });

    // click add ship button again
    cy.get('[data-testid="add-sailing-button"]').click();
    // fill all fields correctly
    cy.get('[data-testid="name-form-text-input"]').type('Test sailing');
    //cy.get('[data-testid="shipId-form-selector-input"]').click({ force: true });
    //cy.contains('Ship *').click({ force: true });
    cy.get('[data-testid="shipId-form-select"]').click();
    cy.contains('INDUSTRIAL GUIDE').click();
    cy.get('[data-testid="shipStops.0.portId-form-select"]').click();
    cy.contains('Fort Lauderdale, Florida').click();
    cy.get('[data-testid="shipStops.0.miles-form-text-input"]').clear().type('111').blur();
    //cy.contains('label', 'Arrival Date *').click({ force: true });
    cy.get('[aria-label="Choose date"]').eq(0).click();
    cy.get('button:contains("1")').eq(0).click();
    cy.get('[aria-label="Choose date"]').eq(0).click();
    cy.get('button:contains("3")').eq(0).click();

    // add second stop
    cy.get('[data-testid="add-shipstop-button"]').click();
    cy.get('[data-testid="shipStops.1.portId-form-select"]').click();
    cy.contains('Palma de Mallorca, Spain').click();
    cy.get('[data-testid="shipStops.1.miles-form-text-input"]').clear().type('333').blur();
    //cy.contains('label', 'Arrival Date *').click({ force: true });
    cy.get('[aria-label="Choose date"]').eq(0).click();
    cy.get('button:contains("5")').eq(0).click();
    cy.get('[aria-label="Choose date"]').eq(0).click();
    cy.get('button:contains("7")').eq(0).click();

    cy.get('[data-testid="submit-form-button"]').click();

    // check we on date grid
    cy.contains('Sailing Name', { timeout: 10000 });

    //  filter by sailing name and check data
    cy.get('thead tr th')
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Filter by Sailing Name"]').type('Test sailing');
      });

    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Test sailing');
      });

    // expand row and check the ports list
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="collapse-button"]').click();
        cy.get('[data-testid="scheule-sailingt-data-expanded"]').should('be.visible');
        cy.get('[data-testid="scheule-sailingt-data-collapsed"]').should('not.exist');
        //cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Arrival');
        cy.contains('Arrival');
        cy.contains('Departure');
        cy.contains('Port');
        cy.contains('Fort Lauderdale, Florida');
        cy.contains('Palma de Mallorca, Spain');
        cy.contains('01');
        cy.contains('03');
        cy.contains('05');
        cy.contains('07');
      });
  });

  it('should allow edit sailing', () => {
    // filter by sailing name and check data
    cy.get('thead tr th')
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Filter by Sailing Name"]').type('Test sailing');
      });

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Test sailing');
        cy.get('[data-testid="schedule-sailing-edit-button"]').click();
      });

    // check we on the edit form
    cy.contains('Edit Schedule', { timeout: 10000 });

    // delete second stop
    cy.get('[data-testid="stop-delete-button"]').eq(1).click();

    // change sailing name
    cy.get('[data-testid="name-form-text-input"]').clear().type('Test sailing updated');
    // change ship
    cy.get('[data-testid="shipId-form-select"]').click();
    cy.contains('Tantra').click();
    // change first stop
    cy.get('[data-testid="shipStops.0.portId-form-select"]').click();
    cy.contains('Genoa, Italy').click();
    cy.get('[data-testid="shipStops.0.miles-form-text-input"]').clear().type('222').blur();
    // change first stop arrival date
    cy.get('[aria-label^="Choose date"]').eq(0).click();
    //cy.get('aria-label').should('include', 'Choose date,'); // when date already selected the text in aria-label include this date
    cy.get('button:contains("2")').eq(0).click();
    cy.get('[aria-label^="Choose date"]').eq(1).click();
    cy.get('button:contains("4")').eq(0).click();

    // submit form
    cy.get('[data-testid="submit-form-button"]').click();
    // check we on data grid
    cy.contains('Sailing Name', { timeout: 10000 });
    // filter by sailing name and check data
    cy.get('thead tr th')
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Filter by Sailing Name"]').clear().type('Test sailing updated');
      });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Test sailing updated');
      });

    // expand row and check the ports list
    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="collapse-button"]').click();
        cy.get('[data-testid="scheule-sailingt-data-expanded"]').should('be.visible');
        cy.get('[data-testid="scheule-sailingt-data-collapsed"]').should('not.exist');
        cy.contains('Arrival');
        cy.contains('Departure');
        cy.contains('Port');
        cy.contains('Genoa, Italy');
        cy.contains('02');
        cy.contains('04');
      });
  });

  it('should allow delete sailing', () => {
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should(
          'contain',
          'Westbound North America and Asia Christmas Sailing'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Fort Lauderdale, Florida'
        );
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Hong Kong');

        cy.get('[data-testid="schedule-sailing-delete-button"]').click();
      });

    cy.get('[data-testid="confirmation-modal"]').within(() => {
      cy.get('[data-testid="confirmation-modal-confirm-button"]').click();
    });

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="schedule-sailing-name"]').should('contain', 'Christmas Sailing');
        cy.get('[data-testid="schedules-sailing-route-data"]').should('contain', 'Genoa, Italy');
        cy.get('[data-testid="schedules-sailing-route-data"]').should(
          'contain',
          'Tortola, British Virgin Islands'
        );
      });
  });
});
