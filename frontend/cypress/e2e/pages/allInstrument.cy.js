describe('all instruments page', () => {
  beforeEach(() => {
    cy.visit('/instrument-all');
  });
  describe('visiting all instruments page', () => {
    it('should display the page whith instruments & filter checkbox', () => {
      cy.intercept('**/instrument/get_all', {
        statusCode: 200,
        fixture: './instruments/tenInstruments.json',
      });
      cy.intercept('**/instrument/get_all_brand', {
        statusCode: 200,
        fixture: './instruments/brands.json',
      });
      cy.intercept('**/instrument/get_all_type', {
        statusCode: 200,
        fixture: './instruments/types.json',
      });

      cy.contains('FROM CYPRESS with ❤️').should('exist');
      cy.contains('Guitares acoustiques').should('exist');
      cy.contains('Saxophones').should('exist');
      cy.contains('Fender Rhodes CYPRESS').should('exist');
      cy.contains('Yamaha CYPRESS').should('exist');
    });
  });
  describe('testing pagination', () => {
    it('should display the next when click on button next', () => {
      cy.get("[data-cy='next-page']").click();
    });
  });
});
