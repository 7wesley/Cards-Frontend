import {
    emailError,
    mismatchPasswordError,
    passwordLengthError,
    usernameError,
    usernameLengthError,
} from "../support/resources";

describe("Signup page as guest", () => {
    beforeEach(() => {
        cy.visit("/signup");
    });

    it("Empty fields are invalid", () => {
        cy.clickCY("submitButton");
        cy.get("input:invalid").should("have.length", 4);
    });

    it("Improperly formatted email gives error", () => {
        const user = {
            username: "test",
            email: "test",
            password: "testing",
            confirmPassword: "testing",
        };
        cy.createAccount(user);
        cy.getCY("emailInput")
            .invoke("prop", "validationMessage")
            .should("include", emailError);
    });

    it("Improperly formatted username gives error", () => {
        const user = {
            username: "$",
            email: "test@test.com",
            password: "testing",
            confirmPassword: "testing",
        };
        cy.createAccount(user);
        cy.isVisible("error", usernameError);
    });

    it("Username less than 3 letters gives error", () => {
        const user = {
            username: "a",
            email: "test@test.com",
            password: "testing",
            confirmPassword: "testing",
        };
        cy.createAccount(user);
        cy.isVisible("error", usernameLengthError);
    });

    it("Password less than 6 characters gives error", () => {
        const user = {
            username: "test",
            email: "test@test.com",
            password: "a",
            confirmPassword: "a",
        };
        cy.createAccount(user);
        cy.isVisible("error", passwordLengthError);
    });

    it("Mismatched confirm password gives error", () => {
        const user = {
            username: "test",
            email: "test@test.com",
            password: "testing",
            confirmPassword: "testing1",
        };
        cy.createAccount(user);
        cy.isVisible("error", mismatchPasswordError);
    });

    it("Valid sign up gives success message", () => {
        const user = {
            username: "test",
            email: "test@test.com",
            password: "testing",
            confirmPassword: "testing",
        };
        cy.createAccount(user);
        cy.isVisible("success", "Success!");
    });

    after(() => {
        //delete created user
    });
});

describe("Signup page as user", () => {
    beforeEach(() => {
        cy.visit("/signup");
    });
});
