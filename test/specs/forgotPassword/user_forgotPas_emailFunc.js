const { expect } = require('chai');
const { url } = require('./../examples/constants');

const email = {
  selector: '//input[@placeholder="Enter your email address"]',
  textErr: 'User not found',
};
const submitButton = '//button[@class="btn btn-primary disabled"]';

const validEmailData = {
  email: 'testtest@gmail.com',
  message: 'Check mail for reset password link',
};

const invalidEmailData = {
  emails: ['qwqwqwqwgde.com', 'qwqwqwqw@gdecom', 'qwqwqw qw@gde.com'],
  message: 'Invalid email address',
};

describe('User - ForgotPassword - Email - Func', () => {
  before(() => {
    browser.url(url.forgotPassUrl);
  });

  it('should verify receiving error text if email is not registered', () => {
    const input = $(email.selector);
    input.setValue('qwqwqwqw@gde.com');
    browser.keys('Enter');
    browser.pause(1000);

    const actualErrText = $('//h4[@class="notification-title"]').getText();
    const expected = email.textErr;
    expect(actualErrText).to.eq(expected);
  });

  it('should verify that Send password reset email button is deactivated', () => {
    const input = $(email.selector);
    input.setValue('');
    const submitButtonIsEnabled = $(submitButton).isEnabled();
    expect(submitButtonIsEnabled).to.eq(false);
  });

  it('should verify entering valid credentials and clicking Send password reset email is successful', () => {
    const input = $(email.selector);
    input.setValue(validEmailData.email);
    browser.keys('Enter');
    browser.pause(3000);
    const actualSucText = $('//h4[@class="notification-title"]').getText();
    expect(actualSucText).to.eq(validEmailData.message);
  });

  it('Verify invalid emails', () => {
    invalidEmailData.emails.forEach(invalidEmail => {
      browser.url(url.forgotPassUrl);
      const input = $(email.selector);
      input.setValue(invalidEmail);
      const submitButtonIsEnabled = $(submitButton).isEnabled();
      expect(submitButtonIsEnabled).to.eq(false);
      const actualInvalidMessage = $('//div[@class="invalid-feedback"]').getText();
      expect(actualInvalidMessage, '${invalidEmail} should be invalid').to.eq(
        invalidEmailData.message,
      );
    });
  });
});
