describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Contains table columns", () => {
    cy.contains("Hash");
    cy.contains("Height");
    cy.contains("Time");
  });
});
