import { expect } from 'chai';
import { url } from '../../constants';
import { user } from '../_data/data';

const buttonReset = '//button[contains(text(),"Send password reset email")]';
const emailField = '//input[@name="email"]';
const incorrectEmailFormat = 'student_viktor@testcom';
const invalidMsg = '//input[@name="email"]/../div[contains(text(), "Invalid")]';
const textInvalidMsg = 'Invalid email address';
const failedMsg = '//div/h4[text() = "User not found"]';
const incorrectEmail = 'zasxcd@test.asd';
const textFailedMsg = 'User not found';
const successMsg = '//div/h4[contains(text(), "Check mail")]';
const textSuccessMsg = 'Check mail for reset password link';
const tryAgainLink = '//a[contains(text(),"try again")]';
const h1CheckMailPage = 'Check your email for a link to reset your password';
const h1ForgotPasswordPage = 'Reset your password';
const closeSign = '//span[@class="notification-dismiss"]';

describe('User - Forgot Password - `Send password reset email` button - Fucntional', () => {
  before(() => {
    browser.url(url.forgotPassword);
  });
  it('should check that the button is displayed', () => {
    expect($(buttonReset).isDisplayed()).to.be.true;
  });
  it('should check that the button is disabled if email field is empty', () => {
    expect($(buttonReset).isEnabled()).to.be.false;
  });

  it('should check that the button is disabled if incorrect format of email was entered', () => {
    $(emailField).setValue(incorrectEmailFormat);
    browser.keys('Enter');
    expect($(buttonReset).isEnabled()).to.be.false;
  });

  it('should check that the invalid message appears if incorrect format of email was entered', () => {
    expect($(invalidMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of invalid message is `Invalid email address`', () => {
    $(emailField).setValue(incorrectEmailFormat);
    browser.keys('Enter');
    expect($(invalidMsg).getText()).to.be.equal(textInvalidMsg);
  });

  it('should check that the button is enabled if email was entered', () => {
    $(emailField).setValue(incorrectEmail);
    expect($(buttonReset).isEnabled()).to.be.true;
  });

  it('should check that failed message appears if incorrect email was entered', () => {
    $(emailField).setValue(incorrectEmail);
    $(buttonReset).click();
    $(failedMsg).waitForDisplayed();
    expect($(failedMsg).isDisplayed()).to.be.true;
    $(closeSign).click();
  });

  it('should check that failed message text is `User not found', () => {
    $(emailField).setValue(incorrectEmail);
    $(buttonReset).click();
    $(failedMsg).waitForDisplayed();
    expect($(failedMsg).getText()).to.be.equal(textFailedMsg);
  });
});

describe('User - Check Mail - `try again` link - Fucntional', () => {
  before(() => {
    $(emailField).setValue(user.student.email);
    $(buttonReset).click();
    browser.waitUntil(() => {
      return $('//h1').getText() === h1CheckMailPage;
    }, 3000);
  });

  it('should check that user gets redirected to `CheckMail` page if correct email was entered', () => {
    expect(browser.getUrl()).to.be.equal(url.checkEmail);
  });

  it('should check that successful message appears after user gets redirected', () => {
    expect($(successMsg).isDisplayed()).to.be.true;
  });

  it('should verify the text of successful message', () => {
    expect($(successMsg).getText()).to.be.equal(textSuccessMsg);
  });

  it('should check that link `try again` is displayed', () => {
    expect($(tryAgainLink).isDisplayed()).to.be.true;
  });

  it('should check that link `try again` is enabled', () => {
    expect($(tryAgainLink).isEnabled()).to.be.true;
  });

  it('should check that user gets redirected to  `Forgot Password` page after `try again` link clicked', () => {
    $(tryAgainLink).click();
    browser.waitUntil(() => {
      return $('//h1').getText() === h1ForgotPasswordPage;
    }, 3000);
    expect(browser.getUrl()).to.be.equal(url.forgotPassword);
  });
});
