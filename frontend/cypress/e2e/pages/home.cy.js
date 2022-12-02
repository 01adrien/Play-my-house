describe('home page', () => {
  describe('visiting home page', () => {
    it('should display the home page and the dropdow menu is visible', () => {
      cy.visit('/');
      cy.intercept('**/instrument/get_menu_items', {
        statusCode: 200,
        fixture: 'navItems.json',
      });
      cy.get('[id=dropdown]')
        .invoke('show')
        .should('be.visible')
        .trigger('mousedown');
      // cy.get('[data-cy="Cordes"]').should('be.visible');
    });
  });
});
