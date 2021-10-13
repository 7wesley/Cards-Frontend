import { playersError } from "../support/resources";
import { testEmail, testPassword, testUsername } from "../support/resources";
import { expect } from "chai";

describe("Games page as guest", () => {
  beforeEach(() => {
    cy.visit("/games");
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

  it("Empty fields are invalid", () => {
    cy.clickCY("hostButton");
    cy.clickCY("submitButton");
    cy.get("input:invalid").should("have.length", 4);
  });

  it("Modal still visible after invalid submit", () => {
    cy.clickCY("hostButton");
    cy.clickCY("submitButton");
    cy.isVisible("hostModal");
  });

  it("Invalid players displays error", () => {
    cy.clickCY("hostButton");
    cy.clickCY("submitButton");
    cy.inputCY("playersInput", 9);
    cy.getCY("playersInput")
      .invoke("prop", "validationMessage")
      .should("equal", playersError);
  });

  it("Redirected to room on valid form submit", () => {
    cy.createGame();
    cy.url().should("include", "/games/");
  });
});

describe("Games page as user", () => {
  before(() => {
    cy.createAccount(testUsername, testEmail, testPassword);
    cy.url().should("include", "/account");
  });

  beforeEach(() => {
    cy.visit("/games");
  });

  it("Welcome text contains username", () => {
    cy.isVisible("usernameText", testUsername);
  });

  after(() => {
    cy.deleteAccount();
  });
});
