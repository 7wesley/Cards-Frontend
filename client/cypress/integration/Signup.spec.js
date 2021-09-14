import * as res from "../support/resources";
describe("Signup page as guest", () => {
    beforeEach(() => {
        cy.visit("/signup");
    });

    it("Empty fields are invalid", () => {
        cy.clickCY("submitButton");
        cy.get("input:invalid").should("have.length", 4);
    });

    it("Improperly formatted email gives error", () => {
        cy.createAccount(res.testUsername, "test", res.testPassword);
        cy.getCY("emailInput")
            .invoke("prop", "validationMessage")
            .should("include", res.emailError);
    });

    it("Improperly formatted username gives error", () => {
        cy.createAccount("$", res.testEmail, res.testPassword);
        cy.isVisible("error", res.usernameError);
    });

    it("Username less than 3 letters gives error", () => {
        cy.createAccount("a", res.testEmail, res.testPassword);
        cy.isVisible("error", res.usernameLengthError);
    });

    it("Password less than 6 characters gives error", () => {
        cy.createAccount(res.testUsername, res.testEmail, "a");
        cy.isVisible("error", res.passwordLengthError);
    });

    it("Mismatched confirm password gives error", () => {
        cy.createAccount(
            res.testUsername,
            res.testEmail,
            res.testPassword,
            "testing1"
        );
        cy.isVisible("error", res.mismatchPasswordError);
    });

    it("Valid sign up redirects user", () => {
        cy.createAccount(res.testUsername, res.testEmail, res.testPassword);
        cy.url().should("include", "account");
    });

    after(() => {
        cy.deleteAccount();
    });
});

describe("Signup page as user", () => {
    before(() => {
        cy.createAccount(res.testUsername, res.testEmail, res.testPassword);
    });

    after(() => {
        cy.deleteAccount();
    });
});
