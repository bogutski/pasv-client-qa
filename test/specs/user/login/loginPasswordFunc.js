import { expect } from 'chai';
import { url } from '../../constants';
import { user } from '../_data/data';

const loginButton = '//button[@type="submit"]';
const passwordField = '//input[@name="password"]';
const emailField = '//input[@name="email"]';
const incorrectPass = '11112';
const expectedMsg = 'Auth failed';
const expectedSuccessMsg = 'Auth success';
const failedMsg = '//div[@id="root"]//div/h4[(text()="Auth failed")]';
const successMsg = '//div[@id="root"]//div/h4[(text()="Auth success")]';

describe('User - LoginForm - Password - Func', () => {
  before(() => {
    browser.url(url.login);
    $(emailField).setValue(user.admin.email);
  });

  it('should check that validation failed if password field is empty', () => {
    browser.keys('Tab');
    browser.keys('Tab');
    const validation = $(passwordField)
      .getAttribute('class')
      .includes('is-invalid');
    expect(validation).to.be.true;
  });

  it('should validate that Login button is disabled if password field is empty', () => {
    expect($(loginButton).isEnabled()).to.be.false;
  });

  it('should check error message appears if user enters incorrect password', () => {
    $(passwordField).setValue(incorrectPass);
    $(loginButton).click();
    $(failedMsg).waitForDisplayed(3000);
    const actualFailedMsg = $(failedMsg).getText();
    expect(actualFailedMsg).to.be.equal(expectedMsg);
  });

  it('should validate that Login button is enabled if password is correct', () => {
    $(passwordField).setValue(user.admin.password);
    expect($(loginButton).isEnabled()).to.be.true;
  });

  it('should check that validation success with correct password', () => {
    const validation = $(passwordField)
      .getAttribute('class')
      .includes('is-valid');
    expect(validation).to.be.true;
  });

  it('should check success message appears with correct password', () => {
    $(passwordField).setValue(user.admin.password);
    $(loginButton).click();
    $(successMsg).waitForDisplayed(2000);
    const actualSuccessMsg = $(successMsg).getText();
    expect(actualSuccessMsg).to.be.equal(expectedSuccessMsg);
  });
});
