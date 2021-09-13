import { playersError } from "../support/resources";
import { expect } from "chai";

describe("Account page as guest", () => {
    beforeEach(() => {
        cy.visit("/account");
    });

    it("Can view create account tet", () => {
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
    beforeEach(() => {
        cy.visit("/account");
    });
});
