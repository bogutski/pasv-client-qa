import { expect } from 'chai';
import { url } from '../../constants';
import { user } from '../_data/data';

const sel = {
  loginButton: '//button[@type="submit"]',
  passwordField: '//input[@name="password"]',
  emailField: '//input[@name="email"]',
  failedMsg: '//div[@id="root"]//div/h4[(text()="Auth failed")]',
  successMsg: '//div[@id="root"]//div/h4[(text()="Auth success")]',
};

const data = {
  expectedMsg: 'Auth failed',
  expectedSuccessMsg: 'Auth success',
  textValid: 'is-valid',
  textIsInvalid: 'is-invalid',
  incorrectPass: '11112',
};

describe('User - LoginForm - Password - Func', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(user.admin.email);
  });

  it('should check that validation failed if password field is empty', () => {
    browser.keys('Tab');
    browser.keys('Tab');
    const validation = $(sel.passwordField)
      .getAttribute('class')
      .includes(data.textIsInvalid);
    expect(validation).to.be.true;
  });

  it('should validate that Login button is disabled if password field is empty', () => {
    expect($(sel.loginButton).isEnabled()).to.be.false;
  });

  it('should check error message appears if user enters incorrect password', () => {
    $(sel.passwordField).setValue(data.incorrectPass);
    $(sel.loginButton).click();
    $(sel.failedMsg).waitForDisplayed(3000);
    const actualFailedMsg = $(sel.failedMsg).getText();
    expect(actualFailedMsg).to.be.equal(data.expectedMsg);
  });

  it('should validate that Login button is enabled if password is correct', () => {
    $(sel.passwordField).setValue(user.admin.password);
    expect($(sel.loginButton).isEnabled()).to.be.true;
  });

  it('should check that validation success with correct password', () => {
    const validation = $(sel.passwordField)
      .getAttribute('class')
      .includes(data.textValid);
    expect(validation).to.be.true;
  });

  it('should check success message appears with correct password', () => {
    $(sel.passwordField).setValue(user.admin.password);
    $(sel.loginButton).click();
    $(sel.successMsg).waitForDisplayed(2000);
    const actualSuccessMsg = $(sel.successMsg).getText();
    expect(actualSuccessMsg).to.be.equal(data.expectedSuccessMsg);
  });
});
