describe("Login", () => {
  afterEach(() => {
    cy.get("[data-cy=logout]").click();
  });
  describe("login as user", () => {
    it("Should display profile page with correct credentials", () => {
      cy.login("user");
      cy.contains("Reservation a venir").should("exist");
      cy.contains("Reservation passes").should("exist");
    });
  });

  describe("login as owner", () => {
    it("Should display profile page with correct credentials", () => {
      cy.login("owner");
      cy.contains("Reservation a venir").should("exist");
      cy.contains("Reservation passes").should("exist");
      cy.contains("Mes instruments").should("exist");
    });
  });
  describe("login as admin", () => {
    it("Should display profile page with correct credentials", () => {
      cy.login("admin");
      cy.contains("Utilisateurs").should("exist");
      cy.contains("Reservations").should("exist");
      cy.contains("Planning").should("exist");
    });
  });
});
