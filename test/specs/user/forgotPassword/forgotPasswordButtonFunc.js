import { expect } from 'chai';
import { url } from '../../constants';
import { user } from '../_data/data';

const sel = {
  buttonReset: '//button[contains(text(),"Send password reset email")]',
  emailField: '//input[@name="email"]',
  invalidMsg: '//input[@name="email"]/../div[contains(text(), "Invalid")]',
  failedMsg: '//div/h4[text() = "User not found"]',
  successMsg: '//div/h4[contains(text(), "Check mail")]',
  tryAgainLink: '//a[contains(text(),"try again")]',
  closeSign: '//span[@class="notification-dismiss"]',
  h1: '//h1',
};
const data = {
  incorrectEmailFormat: 'student_viktor@testcom',
  textInvalidMsg: 'Invalid email address',
  incorrectEmail: 'zasxcd@test.asd',
  textFailedMsg: 'User not found',
  textSuccessMsg: 'Check mail for reset password link',
  h1CheckMailPage: 'Check your email for a link to reset your password',
  h1ForgotPasswordPage: 'Reset your password',
};

describe('User - Forgot Password - `Send password reset email` button - Functional', () => {
  before(() => {
    browser.url(url.forgotPassword);
  });

  it('should check that the button is displayed', () => {
    expect($(sel.buttonReset).isDisplayed()).to.be.true;
  });

  it('should check that the button is disabled if email field is empty', () => {
    expect($(sel.buttonReset).isEnabled()).to.be.false;
  });

  it('should check that the button is disabled if incorrect format of email was entered', () => {
    $(sel.emailField).setValue(data.incorrectEmailFormat);
    browser.keys('Enter');
    expect($(sel.buttonReset).isEnabled()).to.be.false;
  });

  it('should check that the invalid message appears if incorrect format of email was entered', () => {
    expect($(sel.invalidMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of invalid message is `Invalid email address`', () => {
    $(sel.emailField).setValue(data.incorrectEmailFormat);
    browser.keys('Enter');
    expect($(sel.invalidMsg).getText()).to.be.equal(data.textInvalidMsg);
  });

  it('should check that the button is enabled if email was entered', () => {
    $(sel.emailField).setValue(data.incorrectEmail);
    expect($(sel.buttonReset).isEnabled()).to.be.true;
  });

  it('should check that failed message appears if incorrect email was entered', () => {
    $(sel.emailField).setValue(data.incorrectEmail);
    $(sel.buttonReset).click();
    $(sel.failedMsg).waitForDisplayed();
    expect($(sel.failedMsg).isDisplayed()).to.be.true;
    $(sel.closeSign).click();
  });

  it('should check that failed message text is `User not found', () => {
    $(sel.emailField).setValue(data.incorrectEmail);
    $(sel.buttonReset).click();
    $(sel.failedMsg).waitForDisplayed();
    expect($(sel.failedMsg).getText()).to.be.equal(data.textFailedMsg);
  });
});

describe('User - Check Mail - `try again` link - Fucntional', () => {
  before(() => {
    $(sel.emailField).setValue(user.student.email);
    $(sel.buttonReset).click();
    browser.waitUntil(() => {
      return $(sel.h1).getText() === data.h1CheckMailPage;
    }, 3000);
  });

  it('should check that user gets redirected to `CheckMail` page if correct email was entered', () => {
    expect(browser.getUrl()).to.be.equal(url.checkEmail);
  });

  it('should check that successful message appears after user gets redirected', () => {
    expect($(sel.successMsg).isDisplayed()).to.be.true;
  });

  it('should verify the text of successful message', () => {
    expect($(sel.successMsg).getText()).to.be.equal(data.textSuccessMsg);
  });

  it('should check that link `try again` is displayed', () => {
    expect($(sel.tryAgainLink).isDisplayed()).to.be.true;
  });

  it('should check that link `try again` is enabled', () => {
    expect($(sel.tryAgainLink).isEnabled()).to.be.true;
  });

  it('should check that user gets redirected to  `Forgot Password` page after `try again` link clicked', () => {
    $(sel.tryAgainLink).click();
    browser.waitUntil(() => {
      return $(sel.h1).getText() === data.h1ForgotPasswordPage;
    }, 3000);
    expect(browser.getUrl()).to.be.equal(url.forgotPassword);
  });
});
