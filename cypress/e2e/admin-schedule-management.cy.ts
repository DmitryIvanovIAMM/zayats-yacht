describe('Admin on Schedule Page', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');

    cy.visit('/sign-in?callbackUrl=/admin/schedule-management');
    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Sailing Name', { timeout: 25000 });
  });

  // this is efault ordering in descendant start date
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
      cy.get('td').should('have.length', 27);
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
          'Fort Lauderdale, Florid'
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
});
