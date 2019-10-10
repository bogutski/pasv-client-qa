import { expect } from 'chai';
import { url } from '../../constants';
import { user } from './../_data/data';

const sel = {
  loginButton: '//button[@type="submit"]',
  passwordField: '//input[@name="password"]',
  emailField: '//input[@name="email"]',
  failedMsg: '//div[@id="root"]//div/h4[contains(text(),"failed")]',
  successMsg: '//div[@id="root"]//div/h4[contains(text(), "success")]',
  invalidMsg: '//input[@name="email"]/../div[@class="invalid-feedback"]',
  header: '//h1',
};

const data = {
  expectedFailedMsg: 'Auth failed.',
  expectedSuccessMsg: 'Auth success',
  incorrectPass: '11112',
  incorrectEmail: 'qwert@tyty',
  notExistEmail: 'yututututuytutyutuyty@ru.ru',
  expectedInvalidMsg: 'Invalid email address',
};

describe('User - Login - `Login Button` is disabled - Empty Field/Fields - Functional', () => {
  before(() => {
    browser.url(url.login);
  });

  it('should check the button if password and email are empty', () => {
    $(sel.emailField).click();
    browser.keys('Tab');
    browser.keys('Tab');
    expect($(sel.loginButton).isEnabled()).to.be.false;
  });

  it('should check the button if email is empty', () => {
    $(sel.emailField).click();
    browser.keys('Tab');
    $(sel.passwordField).setValue(user.admin.password);
    expect($(sel.loginButton).isEnabled()).to.be.false;
    $(sel.passwordField).clearValue();
  });

  it('should check the button if password is empty', () => {
    $(sel.emailField).setValue(user.admin.email);
    browser.keys('Tab');
    browser.keys('Tab');
    expect($(sel.loginButton).isEnabled()).to.be.false;
  });
});

describe('User - Login - `Login Button` is disabled - Incorrect email - Functional', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(data.incorrectEmail);
    browser.keys('Tab');
  });

  it('should check that the button is disabled', () => {
    $(sel.passwordField).setValue(user.admin.password);
    expect($(sel.loginButton).isEnabled()).false;
  });

  it('should check that the error message appears ', () => {
    expect($(sel.invalidMsg).isDisplayed()).to.be.true;
  });

  it('should check the text of the message ', () => {
    expect($(sel.invalidMsg).getText()).to.be.equal(data.expectedInvalidMsg);
  });
});

describe('User - Login - `Login Button` - Email is not registered - Functional', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(data.notExistEmail);
    $(sel.passwordField).setValue(user.admin.password);
    $(sel.loginButton).click();
    browser.waitUntil(
      () => {
        return $(sel.failedMsg).isDisplayed() === true;
      },
      5000,
      'expected text to be different after 5s',
    );
  });

  it('should check that the error message appears', () => {
    expect($(sel.failedMsg).isDisplayed()).to.be.true;
  });

  it('should check the text of error message ', () => {
    expect($(sel.failedMsg).getText()).to.be.equal(data.expectedFailedMsg);
  });
});

describe('User - Login - `Login Button` - Password is incorrect - Functional', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(user.admin.email);
    $(sel.passwordField).setValue(data.incorrectPass);
    $(sel.loginButton).click();
    browser.waitUntil(
      () => {
        return $(sel.failedMsg).isDisplayed() === true;
      },
      2000,
      'expected text to be different after 2s',
    );
  });

  it('should check that the error message appears', () => {
    expect($(sel.failedMsg).isDisplayed()).to.be.true;
  });

  it('should check the text of error message ', () => {
    expect($(sel.failedMsg).getText()).to.be.equal(data.expectedFailedMsg.slice(0, -1));
  });
});

describe('User - Login - `Login Button` is Enable - Functional', () => {
  it('should check the button if email and password are filled', () => {
    browser.url(url.login);
    $(sel.emailField).setValue(user.admin.email);
    $(sel.passwordField).setValue(user.admin.password);
    expect($(sel.loginButton).isEnabled()).to.be.true;
  });
});

describe('User - Login - `Login Button` - Correct credentials - Functional', () => {
  before(() => {
    browser.url(url.login);
    $(sel.emailField).setValue(user.admin.email);
    $(sel.passwordField).setValue(user.admin.password);
    $(sel.loginButton).click();
    browser.waitUntil(
      () => {
        return $(sel.successMsg).isDisplayed() === true;
      },
      2000,
      'expected text to be different after 2s',
    );
  });

  it('should check that the user sees the success message', () => {
    expect($(sel.successMsg).isDisplayed()).to.be.true;
  });

  it('should check the text of success message ', () => {
    expect($(sel.successMsg).getText()).to.be.equal(data.expectedSuccessMsg);
  });

  it('should check that the user successfully logged in', () => {
    expect($(sel.header).getText()).to.be.equal(`${user.admin.firstName} ${user.admin.lastName}`);
  });
});
