import { url } from '../../constants.js';
import { expect } from 'chai';
const forgotPasswordLinkSelector = '//a[@qa="forgot-password-link"]';
const expectedh1ForgotPasswordPage = 'Reset your password';
const enterYourEmailFieldSelector = '//input[@name="email"]';
const validEmail = 'admin@test.com';
const invalidEmail = 'goa@gmail.com';
const buttonSelector = '//button[@type="submit"]';
const expectedh1SuccessMessage = 'Check your email for a link to reset your password';
const failMessageSelector = '//h4[contains(text(),"User not found")]';
const expectedfailMessage = 'User not found';

describe('User - Login - Forgot Password Link - Func', () => {
  before(() => {
    browser.url(url.login);
  });

  it('Should verify that  Forgot password link is active', () => {
    $(forgotPasswordLinkSelector).click();
    const h1ForgotPasswordPage = $('//h1').getText();
    expect(h1ForgotPasswordPage).eq(expectedh1ForgotPasswordPage);
  });

  it('Should verify that Password reset email button is inactive', () => {
    const buttonIsEnabled = $(buttonSelector).isEnabled();
    expect(buttonIsEnabled).to.be.false;
  });

  it('Should verify that Enter your email address field can be filled', () => {
    $(enterYourEmailFieldSelector).click();
    $(enterYourEmailFieldSelector).setValue(validEmail);
    const expectedText = $(enterYourEmailFieldSelector).getValue();
    expect(validEmail).to.eq(expectedText);
  });

  it('Should verify that Password reset email button is active', () => {
    const buttonIsEnabled = $(buttonSelector).isEnabled();
    expect(buttonIsEnabled).to.be.true;
  });

  it('Should verify the Auth failed. User not found message', () => {
    $(enterYourEmailFieldSelector).click();
    $(enterYourEmailFieldSelector).setValue(invalidEmail);
    $(buttonSelector).click();
    browser.pause(1500);
    const failMessage = $(failMessageSelector).getText();
    expect(failMessage).eq(expectedfailMessage);
  });

  it('Should verify the Auth success message', () => {
    $(enterYourEmailFieldSelector).click();
    $(enterYourEmailFieldSelector).setValue(validEmail);
    $(buttonSelector).click();
    browser.pause(2000);
    const h1SuccessMessage = $('//h1').getText();
    expect(h1SuccessMessage).eq(expectedh1SuccessMessage);
  });
});
