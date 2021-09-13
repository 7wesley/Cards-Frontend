describe("Navbar component", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Home links goes to home page", () => {
        cy.clickCY("homeLink");
        cy.url().should("include", "/");
    });

    it("Games link goes to game page", () => {
        cy.clickCY("gamesLink");
        cy.url().should("include", "games");
    });

    it("Contact link goes to conact page", () => {
        cy.clickCY("contactLink");
        cy.url().should("include", "contact");
    });

    it("About link goes to about page", () => {
        cy.clickCY("aboutLink");
        cy.url().should("include", "about");
    });

    it("Account link goes to account page", () => {
        cy.getCY("navDropdown").trigger("mouseover");
        cy.clickCY("accountLink");
        cy.url().should("include", "account");
    });

    it("Stats link goes to stats page", () => {
        cy.getCY("navDropdown").trigger("mouseover");
        cy.clickCY("statsLink");
        cy.url().should("include", "stats");
    });
});
