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

  it('Should verify that "Enter your email address" text field is valid', () => {
    $(selectors.enterYourEmailField).setValue(validEmail);
    browser.keys('Tab');
    expect(
      $(selectors.enterYourEmailField)
        .getAttribute('class')
        .includes('is-valid'),
    ).to.be.true;
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
    browser.waitUntil(
      () => {
        return $(selectors.failMessage).isDisplayed();
      },
      1500,
      'fail message is not displayed',
    );
  });

  it('Should verify the Auth success message', () => {
    $(selectors.enterYourEmailField).click();
    $(selectors.enterYourEmailField).setValue(validEmail);
    $(selectors.button).click();
    browser.waitUntil(
      () => {
        return $(selectors.h1).getText() === expectedh1SuccessMessage;
      },
      2000,
      'success message is not displayed',
    );
  });
});
