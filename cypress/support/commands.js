//Check if elements are visible
Cypress.Commands.add("isVisible", (selector, element) => {
  if (element) {
    cy.contains(`[data-cy=${selector}]`, element)
      .scrollIntoView()
      .should("be.visible");
  } else {
    cy.get(`[data-cy=${selector}]`).scrollIntoView().should("be.visible");
  }
});

//Check if elements are not visible
Cypress.Commands.add("isNotVisible", (selector, element) => {
  if (element) {
    cy.contains(`[data-cy=${selector}]`, element).should("not.exist");
  } else {
    cy.get(`[data-cy=${selector}]`).should("not.exist");
  }
});

//Click element by id
Cypress.Commands.add("clickCY", (cyAttribute) => {
  cy.get(`[data-cy=${cyAttribute}]`).click();
});

//Input by data-cy
Cypress.Commands.add("inputCY", (inputField, text) => {
  if (text) {
    cy.get(`[data-cy=${inputField}]`).type(text);
  } else {
    cy.get(`[data-cy=${inputField}]`).invoke("val", "");
  }
});

//Get element by data-cy
Cypress.Commands.add("getCY", (cyAttribute) => {
  cy.get(`[data-cy=${cyAttribute}]`);
});

//Contains element by data-cy
Cypress.Commands.add("containsCY", (cyAttribute, value) => {
  cy.contains(`[data-cy=${cyAttribute}]`, value);
});

//Find element by data-cy
Cypress.Commands.add(
  "findCY",
  { prevSubject: true },
  (subject, cyAttribute) => {
    return subject.find(`[data-cy="${cyAttribute}"]`);
  }
);

//Create game with valid input
Cypress.Commands.add("createGame", () => {
  cy.clickCY("hostButton");
  cy.clickCY("blackjackRadio");
  cy.inputCY("playersInput", 2);
  cy.clickCY("submitButton");
  cy.wait(1000);
});

//Sign up with valid input
Cypress.Commands.add(
  "createAccount",
  (username, email, password, confirmPassword) => {
    cy.visit("/signup");
    cy.inputCY("usernameInput", username);
    cy.inputCY("emailInput", email);
    cy.inputCY("passwordInput", password);
    if (confirmPassword) {
      cy.inputCY("confirmInput", confirmPassword);
    } else {
      cy.inputCY("confirmInput", password);
    }
    cy.clickCY("submitButton");
    cy.wait(1500);
  }
);

//Sign up with valid input
Cypress.Commands.add("deleteAccount", () => {
  cy.visit("/account");
  cy.clickCY("deleteButton");
  cy.clickCY("confirmButton");
  cy.wait(1000);
});
