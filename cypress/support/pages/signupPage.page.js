class SignupPage{
    getSignupPageElements(){
        return require('../locator/signup.locators');
    }

    clickOnCreateAnAccountButton(){
        cy.contains(this.getSignupPageElements().SIGNUP_BUTTON).click();
        cy.wait(1000);  // Wait for the page to load
        return this;
    }

    fillUserName(firstName) {
            cy.get(this.getSignupPageElements().FIRST_NAME)
                .click()
                .type(firstName);
        return this;
    }

    fillLastName(lastName) {
        cy.get(this.getSignupPageElements().LAST_NAME)
            .click()
            .type(lastName);
    return this;
}

    fillEmail(email) {
        cy.get(this.getSignupPageElements().EMAIL)
            .click()
            .type(email);
    return this;

}

    fillPassword(password) {
        cy.get(this.getSignupPageElements().PASSWORD)
            .click()
            .type(password);
    return this;
}

    fillConfrimPassword(password) {
        cy.get(this.getSignupPageElements().CONFIRM_PASSWORD)
            .click()
            .type(password);
    return this;
    }

    clickOnSubmitButton(){
        cy.get(this.getSignupPageElements().CREATE_ACCOUNT_BUTTON).click();
        cy.wait(2000);  // Wait for the page to load
        return this;
    }

    verifySuccessMessage(successMessage){
        cy.get(this.getSignupPageElements().MESSAGES).should('contain.text', successMessage);
        return this;
    }

    verifyErrorMessages(errorMessage){
        cy.get(this.getSignupPageElements().MESSAGES).should('contain.text', errorMessage);
        return this;
    }

}

module.exports = SignupPage;