import { testEmail, testPassword, testUsername } from "../support/resources";

describe("Waiting page as guest", () => {
    beforeEach(() => {
        cy.visit("/games");
        cy.createGame();
    });

    it("Player count is '1 out of 2'", () => {
        cy.isVisible("playerCount", "1 out of 2");
    });

    it("Name displayed in playerlist from sessionStorage", () => {
        cy.getCY("playersList").should((players) => {
            const text = players.text();
            expect(text).to.include(
                JSON.parse(sessionStorage.getItem("cards-username"))
            );
        });
    });
});

describe("Waiting page as user", () => {
    before(() => {
        cy.createAccount(testUsername, testEmail, testPassword);
    });

    beforeEach(() => {
        cy.visit("/games");
        cy.createGame();
    });

    it("Name displayed in playerlist", () => {
        cy.isVisible("playersList", testUsername);
    });

    after(() => {
        cy.deleteAccount();
    });
});
