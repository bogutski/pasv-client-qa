import { expect } from 'chai';
import { url } from '../examples/constants';
import { user } from '../examples/user/constants';

const loginButton = '//button[@type="submit"]';
const passwordField = '//input[@name="password"]';
const emailField = '//input[@name="email"]';
const incorrectPass = '11112';
const expectedMsg = 'Auth failed';
const expectedSuccessMsg = 'Auth success';
const expectedLogoutButton = 'Logout';
const logoutButton = '//button[contains(text(),"Logout")]';
const UserNameLink = '//div[@id="user-section"]//a[text()="Ruslan Admin"]';
const failedMsg = '//div[@id="root"]//div/h4[(text()="Auth failed")]';
const successMsg = '//div[@id="root"]//div/h4[(text()="Auth success")]';

describe('User - LoginForm - Password - Func', () => {
  before(() => {
    browser.url(url.loginUrl);
    $(emailField).setValue(user.admin.email);
  });

  it('should check that validation failed if password field is empty', () => {
    browser.keys('Tab');
    browser.keys('Tab');
    const validation = $(passwordField)
      .getAttribute('class')
      .includes('is-invalid');
    console.log('!!!!!!!!!!!!!!!!', validation);
    expect(validation).to.be.true;
  });

  it('should validate that login button is disabled if password field is empty', () => {
    expect($(loginButton).isEnabled()).to.be.false;
  });

  it('should check error message appears if user enters incorrect password', () => {
    $(passwordField).setValue(incorrectPass);
    $(loginButton).click();
    browser.pause(1000);
    const actualFailedMsg = $(failedMsg).getText();
    console.log('!!!!!!!!!!!!!', actualFailedMsg);
    expect(actualFailedMsg).to.be.equal(expectedMsg);
  });

  it('should validate that Login button is enabled if password is correct', () => {
    $(passwordField).setValue(user.admin.password);
    expect($(loginButton).isEnabled()).to.be.true;
  });

  it('should check that validation success if user enters correct password', () => {
    const validation = $(passwordField)
      .getAttribute('class')
      .includes('is-valid');
    console.log('!!!!!!!!!!!!!!!!', validation);
    expect(validation).to.be.true;
  });

  it('should validate that symbols in password field replaced by bullets', () => {
    const bullets = $(passwordField).getCSSProperty('-webkit-text-security').value;
    console.log('!!!!!!!!!!!!!!!!!!', bullets);
    expect(bullets).to.be.equal('disc');
  });

  it('should check success message appears if user logged in with correct password', () => {
    $(passwordField).setValue(user.admin.password);
    $(loginButton).click();
    browser.pause(1000);
    const actualSuccessMsg = $(successMsg).getText();
    console.log('!!!!!!!!!!!!!!!!!!!', actualSuccessMsg);
    expect(actualSuccessMsg).to.be.equal(expectedSuccessMsg);
    browser.pause(1000);
  });

  it('should validate that user can successfully log in with correct password (Logout link appears)', () => {
    $(UserNameLink).click();
    const actualLogoutButton = $(logoutButton).getText();
    expect(actualLogoutButton).to.be.equal(expectedLogoutButton);
  });
});
