import { testEmail, testPassword, testUsername } from "../support/resources";
import { expect } from "chai";

describe("Account page as guest", () => {
    beforeEach(() => {
        cy.visit("/account");
    });

    it("Can view create account text", () => {
        cy.isVisible("createAccountText");
    });

    it("Placeholder should be filled from sessionStorage", () => {
        cy.get("input")
            .invoke("attr", "placeholder")
            .should((text) => {
                expect(text).to.equal(
                    JSON.parse(sessionStorage.getItem("cards-username"))
                );
            });
    });

    it("Updating text should update sessionStorage", () => {
        cy.inputCY("usernameInput", "text");
        cy.clickCY("updateButton").then(() => {
            expect(sessionStorage.getItem("cards-username")).to.include("text");
        });
    });
});

describe("Account page as user", () => {
    before(() => {
        cy.createAccount(testUsername, testEmail, testPassword);
    });

    beforeEach(() => {
        cy.visit("/account");
    });

    it("Can view profile picture", () => {
        cy.isVisible("profilePicture");
    });

    it("Can view delete button", () => {
        cy.isVisible("deleteButton");
    });

    after(() => {
        cy.deleteAccount();
    });
});
