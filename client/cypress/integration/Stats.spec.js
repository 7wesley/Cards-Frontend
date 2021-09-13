import { playersError } from "../support/resources";

describe("Stats page as guest", () => {
    beforeEach(() => {
        cy.visit("/stats");
    });

    it("Guest text viewable", () => {
        cy.isVisible("createAccountText");
    });
});

describe("Stats page as user", () => {
    beforeEach(() => {
        cy.visit("/stats");
    });
});
