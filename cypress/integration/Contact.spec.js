import { contactSuccess, emailError, testEmail } from "../support/resources";

describe("Contact page", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("Submit button is initially disabled", () => {
    cy.getCY("submitButton").should("be.disabled");
  });

  it("Empty fields are invalid", () => {
    cy.getCY("submitButton").invoke("prop", "disabled", false);
    cy.clickCY("submitButton");
    cy.get("input:invalid").should("have.length", 2);
  });

  it("Improperly formatted email gives error", () => {
    cy.inputCY("emailInput", "test");
    cy.getCY("submitButton").invoke("prop", "disabled", false);
    cy.clickCY("submitButton");
    cy.getCY("emailInput")
      .invoke("prop", "validationMessage")
      .should("include", emailError);
  });

  it("Valid form submit gives success", () => {
    cy.inputCY("emailInput", testEmail);
    cy.inputCY("messageInput", "Cypress testing");
    cy.getCY("submitButton").invoke("prop", "disabled", false);
    cy.clickCY("submitButton");
    cy.isVisible("success", contactSuccess);
  });
});
