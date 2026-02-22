describe('Landing Page', () => {
  it('should render correctly', () => {
    cy.visit('/');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
  });

  it('should display main headline and CTA button', () => {
    cy.visit('/');
    cy.contains('Zayats Yacht').should('be.visible');
    cy.contains(/(Get Quote|Request|Связаться|Contact)/i).should('be.visible');
    cy.get('a, button')
      .filter(':visible')
      .contains(/(Get Quote|Request|Связаться|Contact)/i)
      .should('exist');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
  });

  it('should navigate to login page when CTA clicked', () => {
    cy.visit('/');
    cy.contains('Get Quote').click();
    cy.url().should('include', '/sign-in');
  });

  it('should display all key sections', () => {
    cy.visit('/');
    cy.contains(/About Us|О компании/i).should('be.visible');
    cy.contains(/Gallery|Галерея/i).should('be.visible');
    cy.contains(/Services|Услуги/i).should('be.visible');
    cy.contains(/Testimonials|Отзывы/i).should('be.visible');
  });

  it('should display images in gallery section', () => {
    cy.visit('/');
    cy.get('#photo-gallery-section').scrollIntoView();
    cy.get('img.image-gallery-image').should('have.length.greaterThan', 0);
  });

  it('should have SEO meta tags', () => {
    cy.visit('/');
    cy.get('head meta[name="description"]').should('exist');
    cy.get('head title').should('exist');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
  });
});
