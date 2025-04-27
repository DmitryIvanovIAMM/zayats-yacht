describe('Landing Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('/');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
  });
});
