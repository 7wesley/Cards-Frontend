import { playersError } from "../support/resources";
import { testEmail, testPassword, testUsername } from "../support/resources";

describe("Stats page as guest", () => {
    beforeEach(() => {
        cy.visit("/stats");
    });

    it("Guest text viewable", () => {
        cy.isVisible("createAccountText");
    });
});

describe("Stats page as user", () => {
    before(() => {
        cy.createAccount(testUsername, testEmail, testPassword);
    });

    after(() => {
        cy.deleteAccount();
    });
});
