import { testEmail, testPassword, testUsername } from "../support/resources";

describe("Navbar component as guest", () => {
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

    it("Dropdown contains 'Sign in'", () => {
        cy.getCY("navDropdown").trigger("mouseover");
        cy.isVisible("logLink", "Sign in");
    });
});

describe("Navbar component as user", () => {
    before(() => {
        cy.createAccount(testUsername, testEmail, testPassword);
    });

    it("Dropdown contains 'Log out'", () => {
        cy.getCY("navDropdown").trigger("mouseover");
        cy.isVisible("logLink", "Log out");
    });

    after(() => {
        cy.deleteAccount();
    });
});
