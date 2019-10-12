import { url } from '../../constants.js';
import { expect } from 'chai';

const selectors = {
  forgotPasswordLink: '//a[@qa="forgot-password-link"]',
  enterYourEmailField: '//input[@name="email"]',
  button: '//button[@type="submit"]',
  failMessage: '//h4[contains(text(),"User not found")]',
  h1: '//h1',
};

const validEmail = 'admin@test.com';
const invalidEmail = 'goa@gmail.com';
const expectedh1ForgotPasswordPage = 'Reset your password';
const expectedh1SuccessMessage = 'Check your email for a link to reset your password';
const expectedfailMessage = 'User not found';

describe('User - Login - Forgot Password Link - Func', () => {
  before(() => {
    browser.url(url.login);
  });

  it('Should verify that Forgot password link is displayed', () => {
    expect($(selectors.forgotPasswordLink).isDisplayed()).to.be.true;
  });

  it('Should verify that Forgot password link is active', () => {
    $(selectors.forgotPasswordLink).click();
    const h1ForgotPasswordPage = $(selectors.h1).getText();
    expect(h1ForgotPasswordPage).eq(expectedh1ForgotPasswordPage);
  });

  it('Should verify that Password reset email button is inactive', () => {
    const buttonIsEnabled = $(selectors.button).isEnabled();
    expect(buttonIsEnabled).to.be.false;
  });

  it('Should verify that "Enter your email address" text field can be filled', () => {
    $(selectors.enterYourEmailField).click();
    $(selectors.enterYourEmailField).setValue(validEmail);
    const expectedText = $(selectors.enterYourEmailField).getValue();
    expect(validEmail).to.eq(expectedText);
  });

  it('Should verify that Password reset email button is active, when valid email is entered', () => {
    const buttonIsEnabled = $(selectors.button).isEnabled();
    expect(buttonIsEnabled).to.be.true;
  });

  it('Should verify the Auth failed. "User not found" message is displayed', () => {
    $(selectors.enterYourEmailField).click();
    $(selectors.enterYourEmailField).setValue(invalidEmail);
    $(selectors.button).click();
    browser.pause(1500);
    const failMessage = $(selectors.failMessage).getText();
    expect(failMessage).eq(expectedfailMessage);
  });

  it('Should verify the Auth success message', () => {
    $(selectors.enterYourEmailField).click();
    $(selectors.enterYourEmailField).setValue(validEmail);
    $(selectors.button).click();
    browser.pause(2000);
    const h1SuccessMessage = $(selectors.h1).getText();
    expect(h1SuccessMessage).eq(expectedh1SuccessMessage);
  });
});
