import { testEmail, testPassword, testUsername } from "../support/resources";
import { expect } from "chai";

describe("Stats page as guest", () => {
    beforeEach(() => {
        cy.visit("/stats");
    });

    it("Guest text viewable", () => {
        cy.isVisible("createAccountText");
    });

    it("Username text contains sessionStorage username", () => {
        cy.getCY("usernameText").should(($usernameText) => {
            const text = $usernameText.text();
            expect(text).to.include(
                JSON.parse(sessionStorage.getItem("cards-username"))
            );
        });
    });
});

describe("Stats page as user", () => {
    before(() => {
        cy.createAccount(testUsername, testEmail, testPassword);
    });

    beforeEach(() => {
        cy.visit("/stats");
    });

    it("Welcome text contains username", () => {
        cy.isVisible("usernameText", testUsername);
    });

    after(() => {
        cy.deleteAccount();
    });
});
