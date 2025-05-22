describe('admin on Ships management page', () => {
  beforeEach(() => {
    cy.visit('/sign-in?callbackUrl=/admin/ships');
    cy.get('[data-testid="email-form-text-input"]').clear().type('yacht.admin@gmail.com').blur();
    cy.get('[data-testid="password-form-text-input"]').clear().type('Yacht123').blur();
    cy.get('[data-testid="login-form-button"]').should('be.enabled').click();
    cy.contains('Home Port', { timeout: 25000 });
  });

  // data ia PORTS from src/test-data/seedData.ts
  it('should see data grid', () => {
    // table header
    cy.get('thead').within(() => {
      cy.contains('Name');
      cy.contains('Type');
      cy.contains('Builder');
      cy.contains('Flag');
      cy.contains('Home Port');
      cy.contains('Class');
      cy.contains('IMO No');
      cy.contains('Call Sign');
    });

    // table body
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 2, { timeout: 10000 });
    });

    // first ship
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'INDUSTRIAL GUIDE');
        cy.get('[data-testid="ship-type"]').should('contain', 'Heavy Lift Vessel');
        cy.get('[data-testid="ship-builder"]').should('contain', 'Hudong');
        cy.get('[data-testid="ship-flag"]').should('contain', 'Liberia');
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Monrovia');
        cy.get('[data-testid="ship-class"]').should('contain', 'GL + 100 A 5 E 3');
        cy.get('[data-testid="ship-imo-no"]').should('contain', '9424572');
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'A8XD3');
      });

    // second ship
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'Tantra');
        cy.get('[data-testid="ship-type"]').should('contain', 'Intergalactic Ship');
        cy.get('[data-testid="ship-builder"]').should('contain', 'Nikolaev Ship Building');
        cy.get('[data-testid="ship-flag"]').should('contain', 'Ukraine');
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Odessa');
        cy.get('[data-testid="ship-class"]').should('contain', 'Intergalactic');
        cy.get('[data-testid="ship-imo-no"]').should('contain', '8424572');
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'Vega');
      });
  });

  it('should allow sorting', () => {
    // sort by Ship name
    cy.get('thead').within(() => {
      cy.get('th').contains('Name').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'Tantra', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'INDUSTRIAL GUIDE');
      });
    // second sort by Ship name
    cy.get('thead').within(() => {
      cy.get('th').contains('Name').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'INDUSTRIAL GUIDE', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'Tantra');
      });

    // sort  by Ship type
    cy.get('thead').within(() => {
      cy.get('th').contains('Type').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-type"]').should('contain', 'Heavy Lift Vessel', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-type"]').should('contain', 'Intergalactic Ship');
      });
    // second sort by Ship type
    cy.get('thead').within(() => {
      cy.get('th').contains('Type').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-type"]').should('contain', 'Intergalactic Ship', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-type"]').should('contain', 'Heavy Lift Vessel');
      });

    // sort by Ship builder
    cy.get('thead').within(() => {
      cy.get('th').contains('Builder').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-builder"]').should('contain', 'Hudong', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-builder"]').should('contain', 'Nikolaev Ship Building');
      });
    // second sort by Ship builder
    cy.get('thead').within(() => {
      cy.get('th').contains('Builder').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-builder"]').should('contain', 'Nikolaev Ship Building', {
          timeout: 10000
        });
      });

    // sort by Ship flag
    cy.get('thead').within(() => {
      cy.get('th').contains('Flag').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-flag"]').should('contain', 'Liberia', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-flag"]').should('contain', 'Ukraine');
      });
    // second sort by Ship flag
    cy.get('thead').within(() => {
      cy.get('th').contains('Flag').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-flag"]').should('contain', 'Ukraine', {
          timeout: 10000
        });
      });

    // sort by Ship home port
    cy.get('thead').within(() => {
      cy.get('th').contains('Home Port').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Monrovia', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Odessa');
      });
    // second sort by Ship home port
    cy.get('thead').within(() => {
      cy.get('th').contains('Home Port').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Odessa', {
          timeout: 10000
        });
      });

    // sort by Ship class
    cy.get('thead').within(() => {
      cy.get('th').contains('Class').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-class"]').should('contain', 'GL + 100 A 5 E 3', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-class"]').should('contain', 'Intergalactic');
      });
    // second sort by Ship class
    cy.get('thead').within(() => {
      cy.get('th').contains('Class').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-class"]').should('contain', 'Intergalactic', {
          timeout: 10000
        });
      });

    // sort by Ship IMO No
    cy.get('thead').within(() => {
      cy.get('th').contains('IMO No').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-imo-no"]').should('contain', '8424572', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-imo-no"]').should('contain', '9424572');
      });
    // second sort by Ship IMO No
    cy.get('thead').within(() => {
      cy.get('th').contains('IMO No').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-imo-no"]').should('contain', '9424572', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-imo-no"]').should('contain', '8424572');
      });

    // sort by Ship call sign
    cy.get('thead').within(() => {
      cy.get('th').contains('Call Sign').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'A8XD3', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'Vega');
      });
    // second sort by Ship call sign
    cy.get('thead').within(() => {
      cy.get('th').contains('Call Sign').click();
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'Vega', {
          timeout: 10000
        });
      });
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'A8XD3');
      });
  });

  it('should allow filtering', () => {
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10);
    });

    // filter by Ship Name
    cy.get('[aria-label="Filter by Name"]').type('Industrial');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'INDUSTRIAL GUIDE');
      });
    cy.get('[aria-label="Filter by Name"]').clear();

    // filter by Ship Type
    cy.get('[aria-label="Filter by Type"]').type('Intergalactic');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-type"]').should('contain', 'Intergalactic Ship');
      });
    cy.get('[aria-label="Filter by Type"]').clear();

    // filter by Ship Builder
    cy.get('[aria-label="Filter by Builder"]').type('Nikolaev');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-builder"]').should('contain', 'Nikolaev Ship Building');
      });
    cy.get('[aria-label="Filter by Builder"]').clear();

    // filter by Ship Flag
    cy.get('[aria-label="Filter by Flag"]').type('Liberia');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-flag"]').should('contain', 'Liberia');
      });
    cy.get('[aria-label="Filter by Flag"]').clear();

    // filter by Ship Home Port
    cy.get('[aria-label="Filter by Home Port"]').type('Monrovia');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Monrovia');
      });
    cy.get('[aria-label="Filter by Home Port"]').clear();

    // filter by Ship Class
    cy.get('[aria-label="Filter by Class"]').type('GL + 100 A 5 E 3');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-class"]').should('contain', 'GL + 100 A 5 E 3');
      });
    cy.get('[aria-label="Filter by Class"]').clear();

    // filter by Ship IMO No
    cy.get('[aria-label="Filter by IMO No"]').type('9424572');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-imo-no"]').should('contain', '9424572');
      });
    cy.get('[aria-label="Filter by IMO No"]').clear();

    // filter by Ship Call Sign
    cy.get('[aria-label="Filter by Call Sign"]').type('A8XD3');
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 1, {
        timeout: 10000
      });
    });
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'A8XD3');
      });
    cy.get('[aria-label="Filter by Call Sign"]').clear();
  });

  it('should allow add a new ship', () => {
    cy.get('[data-testid="add-ship-button"]').click();
    cy.contains('Add Ship', { timeout: 10000 });

    // check each filed validation
    cy.get('[data-testid="name-form-text-input"]').click().blur();
    cy.contains('Name is required');
    cy.get('[data-testid="name-form-text-input"]').click().type('Test Ship').blur();
    cy.contains('Name is required').should('not.exist');
    cy.get('[data-testid="type-form-text-input"]').click().blur();
    cy.contains('Type is required');
    cy.get('[data-testid="type-form-text-input"]').click().type('Test Ship Type').blur();
    cy.contains('Type is required').should('not.exist');
    cy.get('[data-testid="builder-form-text-input"]').click().blur();
    cy.contains('Builder is required');
    cy.get('[data-testid="builder-form-text-input"]').click().type('Test Ship Builder').blur();
    cy.contains('Builder is required').should('not.exist');
    cy.get('[data-testid="flag-form-text-input"]').click().blur();
    cy.contains('Flag is required');
    cy.get('[data-testid="flag-form-text-input"]').click().type('Test Ship Flag').blur();
    cy.contains('Flag is required').should('not.exist');
    cy.get('[data-testid="homePort-form-text-input"]').click().blur();
    cy.contains('Home Port is required');
    cy.get('[data-testid="homePort-form-text-input"]').click().type('Test Ship Home Port').blur();
    cy.contains('Home Port is required').should('not.exist');
    cy.get('[data-testid="class-form-text-input"]').click().blur();
    cy.contains('Class is required');
    cy.get('[data-testid="class-form-text-input"]').click().type('Test Ship Class').blur();
    cy.contains('Class is required').should('not.exist');
    cy.get('[data-testid="imoNo-form-text-input"]').click().blur();
    cy.contains('IMO No is required');
    cy.get('[data-testid="imoNo-form-text-input"]').click().type('1234567').blur();
    cy.contains('IMO No is required').should('not.exist');
    cy.get('[data-testid="callSign-form-text-input"]').click().blur();
    cy.contains('Call Sign is required');
    cy.get('[data-testid="callSign-form-text-input"]').click().type('Test Call Sign').blur();
    cy.contains('Call Sign is required').should('not.exist');

    // click cancel button and check we inn data grid
    cy.get('[data-testid="cancel-form-button"]').click();
    cy.get('tbody').within(() => {
      cy.get('tr').should('have.length', 10);
    });

    // click add ship button again
    cy.get('[data-testid="add-ship-button"]').click();
    // fill all fields correctly
    cy.get('[data-testid="name-form-text-input"]').click().type('Test Ship');
    cy.get('[data-testid="type-form-text-input"]').click().type('Test Ship Type');
    cy.get('[data-testid="builder-form-text-input"]').click().type('Test Ship Builder');
    cy.get('[data-testid="flag-form-text-input"]').click().type('Test Ship Flag');
    cy.get('[data-testid="homePort-form-text-input"]').click().type('Test Ship Home Port');
    cy.get('[data-testid="class-form-text-input"]').click().type('Test Ship Class');
    cy.get('[data-testid="imoNo-form-text-input"]').click().type('1234567');
    cy.get('[data-testid="callSign-form-text-input"]').click().type('Test Call Sign');
    cy.get('[data-testid="submit-form-button"]').click();

    // check new ship in data grid
    cy.contains('Home Port', { timeout: 10000 });
    cy.get('tbody tr')
      .last()
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'Test Ship');
        cy.get('[data-testid="ship-type"]').should('contain', 'Test Ship Type');
        cy.get('[data-testid="ship-builder"]').should('contain', 'Test Ship Builder');
        cy.get('[data-testid="ship-flag"]').should('contain', 'Test Ship Flag');
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Test Ship Home Port');
        cy.get('[data-testid="ship-class"]').should('contain', 'Test Ship Class');
        cy.get('[data-testid="ship-imo-no"]').should('contain', '1234567');
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'Test Call Sign');
      });
  });

  it('should allow edit a ship', () => {
    // click edit button in third row
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ship-edit-button"]').click();
      });
    cy.contains('Edit Ship', { timeout: 10000 });
    // fill each field with new data
    cy.get('[data-testid="name-form-text-input"]').click().clear().type('Test Ship Edited');
    cy.get('[data-testid="type-form-text-input"]').click().clear().type('Test Ship Type Edited');
    cy.get('[data-testid="builder-form-text-input"]')
      .click()
      .clear()
      .type('Test Ship Builder Edited');
    cy.get('[data-testid="flag-form-text-input"]').click().clear().type('Test Ship Flag Edited');
    cy.get('[data-testid="homePort-form-text-input"]')
      .click()
      .clear()
      .type('Test Ship Home Port Edited');
    cy.get('[data-testid="class-form-text-input"]').click().clear().type('Test Ship Class Edited');
    cy.get('[data-testid="imoNo-form-text-input"]').click().clear().type('1234568');
    cy.get('[data-testid="callSign-form-text-input"]')
      .click()
      .clear()
      .type('Test Call Sign Edited');
    cy.get('[data-testid="submit-form-button"]').click();

    // check edited ship in data grid
    cy.contains('Home Port', { timeout: 10000 });
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ship-name"]').should('contain', 'Test Ship Edited');
        cy.get('[data-testid="ship-type"]').should('contain', 'Test Ship Type Edited');
        cy.get('[data-testid="ship-builder"]').should('contain', 'Test Ship Builder Edited');
        cy.get('[data-testid="ship-flag"]').should('contain', 'Test Ship Flag Edited');
        cy.get('[data-testid="ship-home-port"]').should('contain', 'Test Ship Home Port Edited');
        cy.get('[data-testid="ship-class"]').should('contain', 'Test Ship Class Edited');
        cy.get('[data-testid="ship-imo-no"]').should('contain', '1234568');
        cy.get('[data-testid="ship-call-sign"]').should('contain', 'Test Call Sign Edited');
      });
  });

  it('should allow delete a ship', () => {
    cy.get('tbody tr').should('have.length', 3, {
      timeout: 10000
    });
    // click delete button in third row
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('[data-testid="ship-delete-button"]').click();
      });
    cy.get('[data-testid="confirmation-modal-confirm-button"]').click();
    cy.contains('Home Port', { timeout: 10000 });
    cy.get('tbody tr').should('have.length', 2);
    // check that ship is deleted
    cy.contains('Test Ship Edited').should('not.exist');
  });
});
