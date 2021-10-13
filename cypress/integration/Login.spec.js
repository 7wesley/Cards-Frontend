import {
  emailError,
  invalidUserError,
  testEmail,
  testPassword,
  testUsername,
} from "../support/resources";

describe("Login page as guest", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Empty fields are invalid", () => {
    cy.clickCY("submitButton");
    cy.get("input:invalid").should("have.length", 2);
  });

  it("Improperly formatted email gives error", () => {
    cy.inputCY("emailInput", "test");
    cy.getCY("emailInput")
      .invoke("prop", "validationMessage")
      .should("include", emailError);
  });

  it("No account detected gives error", () => {
    cy.inputCY("emailInput", testEmail);
    cy.inputCY("passwordInput", testPassword);
    cy.clickCY("submitButton");
    cy.isVisible("alert", invalidUserError);
  });

  it("Successful login redirects to account", () => {
    cy.createAccount(testUsername, testEmail, testPassword);
    cy.url().should("include", "/account");
    cy.getCY("navDropdown").trigger("mouseover");
    cy.clickCY("logLink");
    cy.wait(3000);
    cy.visit("/login");
    cy.inputCY("emailInput", testEmail);
    cy.inputCY("passwordInput", testPassword);
    cy.clickCY("submitButton");
    cy.url().should("include", "/account");
    cy.deleteAccount();
  });
});

describe("Login page as user", () => {
  before(() => {
    cy.createAccount(testUsername, testEmail, testPassword);
    cy.url().should("include", "/account");
  });

  beforeEach(() => {
    cy.visit("/login");
  });

  it("Redirected on visit", () => {
    cy.url().should("include", "/account");
  });

  after(() => {
    cy.deleteAccount();
  });
});
