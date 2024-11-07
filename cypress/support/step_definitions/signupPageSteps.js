import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import SignupPage from '../pages/signupPage.page';
import LoginPage from '../pages/loginPage.page';

const signupPage = new SignupPage();
const loginPage = new LoginPage();


function generateRandomEmail() {
  const randomString = Cypress._.random(1000, 9999);  // Generate a random number between 1000 and 9999
  return `user${randomString}@example.com`;  // Combine with domain to form a valid email
}

before(() => {
  // Generate random email
  const randomEmail = generateRandomEmail();

  // Modify the fixture data and inject the random email
  cy.fixture('signupData').then((data) => {
    // Replace the placeholder with the generated random email
    data.validSignup.email = randomEmail;

    // Store the modified data using cy.wrap() to share it with tests
    cy.wrap(data).as('signupData');
  });

});

Given('I am on the Magento home page', () => {
  cy.visit('https://magento.softwaretestingboard.com/');
  cy.wait(1000); 
});

Given('I navigate to the "Create New Account" page', () => {
  signupPage.clickOnCreateAnAccountButton();
});

When('I fill in the "First Name" with {string}', function (firstNameKey) {
  const firstName = this.signupData[firstNameKey].firstName;
  signupPage.fillUserName(firstName);
});

When('I fill in the "Last Name" with {string}', function (lastNameKey) {
  const lastName = this.signupData[lastNameKey].lastName;
  signupPage.fillLastName(lastName)
});

When('I fill in the "Email Address" with {string}', function (emailKey) {
  const email = this.signupData[emailKey].email;
  signupPage.fillEmail(email)
});

When('I fill in the "Password" with {string}', function (passwordKey) {
  const password = this.signupData[passwordKey].password;
  signupPage.fillPassword(password)
});

When('I fill in the "Confirm Password" with {string}', function (confirmPasswordKey) {
  const confirmPassword = this.signupData[confirmPasswordKey].confirmPassword;
  signupPage.fillConfrimPassword(confirmPassword)
});

When('I click on the "Create an Account" button', () => {
 signupPage.clickOnSubmitButton()
});

Then('I should see a success message {string}', function (successMessageKey) {
  const successMessage = this.signupData[successMessageKey].successMessage;
  signupPage.verifySuccessMessage(successMessage)
});

Given('I navigate to the "Login" page', () => {
  loginPage.clickOnSigninButton()
});

When('I fill in the "Email Address" with the random email', function () {
  const email = this.signupData.validSignup.email;
  loginPage.fillEmail(email)
});

When('I fill in the "Password" with the valid password', function () {
  const password = this.signupData.validSignup.password;
  loginPage.fillPassword(password)
});

When('I click on the "Login" button', () => {
  loginPage.clickSignInButtonToLogin();
});

Then('I should see the user dashboard', () => {
  cy.get('[class="greet welcome"] span').should('contain.text', 'John Doe');
});

Then('I should see an error message {string}', function (errorMessageKey) {
  const errorMessage = this.signupData[errorMessageKey].errorMessage;
  signupPage.verifyErrorMessages(errorMessage)
});

When('I click on the "Create an Account" button without entering any details', () => {
  signupPage.clickOnSubmitButton()
  
  // Check if error messages are displayed for all required fields
  cy.contains('This is a required field.').each(($error) => {
    cy.wrap($error).should('contain.text', 'This is a required field');
  });
});

Then('I should see error messages for all required fields, including {string}', function (errorMessageKey) {
  const requiredFieldError = this.signupData[errorMessageKey].requiredFieldError;
  cy.contains('This is a required field.').each(($error) => {
    cy.wrap($error).should('contain.text', requiredFieldError);  // Verify the error message for required fields
  });



});