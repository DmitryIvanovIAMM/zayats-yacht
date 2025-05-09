describe('Landing Page', () => {
  it('should render correctly', () => {
    cy.visit('/');
    cy.get('[alt="Allied-Yacht logo"]').should('be.visible');
  });
});
