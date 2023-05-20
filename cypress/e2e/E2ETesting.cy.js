describe("E2E testing", () => {
  it("should test entire behaviour of the application ", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/").wait(500);

    //should navigate to auth page because not logged in
    cy.url().should("include", "auth");

    //check if page has this text
    cy.contains("Welcome back!");

    cy.get('[data-cy="login-email-input"]').click().type("onurhnf@mail.com");

    cy.get('[data-cy="login-password-input"]').click().type("test123");

    cy.get('[data-cy="login-button"]').click().wait(500);

    //should be navigated to home
    cy.url().should("eq", "http://localhost:3000/");

    cy.contains("Discover amazing books and more!");

    cy.get('[data-cy="Category-name"]').should("contain", "Best Seller");

    cy.get('[data-cy="category-card"]').first().click().wait(500);

    cy.contains("Summary");

    cy.get('[data-cy="book-detail-back-button"]').click().wait(500);

    cy.get('[data-cy="View-all-button"]').first().click().wait(500);

    cy.get('[data-cy="category-back-button"]')
      .should("contain", "Best Seller")
      .click()
      .wait(500);

    cy.get('[data-cy="view-all-category-card"]').first().click(500);

    cy.contains("Summary");

    cy.get('[data-cy="logout-button"]').click().wait(500);

    cy.url().should("eq", "http://localhost:3000/auth");

    cy.contains("Welcome back!");
  });
});
