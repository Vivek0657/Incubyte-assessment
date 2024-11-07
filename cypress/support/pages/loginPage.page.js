class LoginPage{
    getSigninPageElements(){
        return require('../locator/login.locators');
    }
    
    clickOnSigninButton(){
        cy.contains(this.getSigninPageElements().LOGIN_BUTTON).click();
        cy.wait(1000);  // Wait for the page to load
        cy.url().should('include', 'customer/account/login');  // Verify we are on the login page
        return this;
    }

    clickSignInButtonToLogin(){
        cy.get(this.getSigninPageElements().SIGNIN_BUTTON).click();
        cy.wait(3000);  // Wait for the page to load
        return this;
    }

    fillEmail(email) {
        cy.get(this.getSigninPageElements().EMAIL)
            .click()
            .type(email);
    return this;

}

fillPassword(password) {
    cy.get(this.getSigninPageElements().PASSWORD)
        .click()
        .type(password);
return this;

}
}

module.exports = LoginPage;