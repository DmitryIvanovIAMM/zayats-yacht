describe('Admin on User Requests Page', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');

    cy.visit('/sign-in?callbackUrl=/admin/users-requests');
    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('User Requests', { timeout: 25000 });
  });

  it('should see data grid', () => {
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
          '5/7/2025, 12:01:15 PM'
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
          '5/6/2025, 12:01:14 PM'
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
          '5/5/2025, 12:01:13 PM'
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

  it('should allow expand quote request cell', () => {
    // expand data in the second row
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="collapse-button"]').click();
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('be.visible');
        cy.get('[data-testid="quote-request-request-data-collapsed"]').should('not.exist');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Yacht Name:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Supper-Pupper_3'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Name:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Customer3'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Phone:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          '6106600011'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Email:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'customer3@email.com'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Best Time to Contact:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Yacht Make and Model:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Insured Value in USD:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Length:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Beam:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Weight:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Purpose of Transport:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'Form Where:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should(
          'contain',
          'To Where:'
        );
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'When:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', 'Notes:');
        cy.get('[data-testid="quote-request-request-data-expanded"]').should('contain', '-');
      });
  });

  // allow sorting
  it('should allow sorting', () => {
    // sort by From Name column
    cy.contains('From Name').click();

    // check only the first column with names
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer2');
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer3');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer4');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Yacht Admin');
      });

    // and reverse sort by Form Name column
    cy.contains('From Name').click().click();
    // check only the first column with names
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Yacht Admin');
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer4');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer3');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer2');
      });

    // sort by From Email column
    cy.contains('From Email').click().click();
    // check only the second column with emails
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should(
          'contain',
          'yacht.admin@gmail.com'
        );
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer4@email.com');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer3@email.com');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer2@email.com');
      });

    // and reverse sort by Form Email column
    cy.contains('From Email').click();
    // check only the second column with emails
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer2@email.com');
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer3@email.com');
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer4@email.com');
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should(
          'contain',
          'yacht.admin@gmail.com'
        );
      });

    // sort by Received At column
    cy.contains('Received At').click();
    // check only the third column with dates
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:12 PM'
        );
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/5/2025, 12:01:13 PM'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/6/2025, 12:01:14 PM'
        );
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/7/2025, 12:01:15 PM'
        );
      });

    // and reverse sort by Received At column
    cy.contains('Received At').click();
    // check only the third column with dates
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/7/2025, 12:01:15 PM'
        );
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/6/2025, 12:01:14 PM'
        );
      });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/5/2025, 12:01:13 PM'
        );
      });
    cy.get('tbody tr')
      .eq(3)
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:12 PM'
        );
      });
  });

  it('should allow filtering', () => {
    // check the filter for From Name column
    cy.get('thead tr th')
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Filter by From Name"]').type('Customer2');
      });
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1);
    });

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-name"]').should('contain', 'Customer2');
      });

    cy.get('thead tr th')
      .eq(0)
      .within(() => {
        cy.get('[aria-label="Filter by From Name"]').clear();
      });

    // check the filter for From Email column
    cy.get('thead tr th')
      .eq(1)
      .within(() => {
        cy.get('[aria-label="Filter by From Email"]').type('customer3@email.com');
      });
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1);
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-from-email"]').should('contain', 'customer3@email.com');
      });
    cy.get('thead tr th')
      .eq(1)
      .within(() => {
        cy.get('[aria-label="Filter by From Email"]').clear();
      });

    // check the filter for Received At column
    cy.get('thead tr th')
      .eq(2)
      .within(() => {
        cy.get('[aria-label="Filter by Received At"]').type('5/4/2025');
      });
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1);
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="quote-request-received-at"]').should(
          'contain',
          '5/4/2025, 12:01:12 PM'
        );
      });
    cy.get('thead tr th')
      .eq(2)
      .within(() => {
        cy.get('[aria-label="Filter by Received At"]').clear();
      });
  });

  it('should show only "From Name" and "Request" columns on small screens', () => {
    cy.viewport('iphone-x');

    cy.get('thead').within(() => {
      cy.contains('From Name').should('exist').should('not.be.visible');
      cy.contains('From Email').should('exist').should('be.visible');
      cy.contains('Received At').should('exist').should('not.be.visible');
      cy.contains('Request').should('exist').should('be.visible');
    });
  });
});
