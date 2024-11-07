Feature: User Signup on Magento Website

  Background:
    Given I am on the Magento home page

  Scenario: Successful signup with valid details
    Given I navigate to the "Create New Account" page
    When I fill in the "First Name" with "validSignup"
    And I fill in the "Last Name" with "validSignup"
    And I fill in the "Email Address" with "validSignup"
    And I fill in the "Password" with "validSignup"
    And I fill in the "Confirm Password" with "validSignup"
    And I click on the "Create an Account" button
    Then I should see a success message "validSignup"

  Scenario: Successful login with created email
    Given I navigate to the "Login" page
    When I fill in the "Email Address" with the random email
    And I fill in the "Password" with the valid password
    And I click on the "Login" button
    Then I should see the user dashboard

  Scenario: Signup with mismatched passwords
    Given I navigate to the "Create New Account" page
    When I fill in the "First Name" with "mismatchedPassword"
    And I fill in the "Last Name" with "mismatchedPassword"
    And I fill in the "Email Address" with "mismatchedPassword"
    And I fill in the "Password" with "mismatchedPassword"
    And I fill in the "Confirm Password" with "mismatchedPassword"
    And I click on the "Create an Account" button
    Then I should see an error message "mismatchedPassword"

  Scenario: Signup with an already registered email
    Given I navigate to the "Create New Account" page
    When I fill in the "First Name" with "duplicateEmail"
    And I fill in the "Last Name" with "duplicateEmail"
    And I fill in the "Email Address" with "duplicateEmail"
    And I fill in the "Password" with "duplicateEmail"
    And I fill in the "Confirm Password" with "duplicateEmail"
    And I click on the "Create an Account" button
    Then I should see an error message "duplicateEmail"

  Scenario: Signup with invalid email format
    Given I navigate to the "Create New Account" page
    When I fill in the "First Name" with "invalidEmail"
    And I fill in the "Last Name" with "invalidEmail"
    And I fill in the "Email Address" with "invalidEmail"
    And I fill in the "Password" with "invalidEmail"
    And I fill in the "Confirm Password" with "invalidEmail"
    And I click on the "Create an Account" button
    Then I should see an error message "invalidEmail"

  Scenario: Signup with missing required fields
    Given I navigate to the "Create New Account" page
    When I click on the "Create an Account" button without entering any details
    Then I should see error messages for all required fields, including "missingRequiredFields"