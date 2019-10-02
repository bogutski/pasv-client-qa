import { expect } from 'chai';
import { url } from './../examples/constants';

const email = {
  inputField: '//input[@placeholder="Enter your email address"]',
  notFoundMessage: 'User not found',
};
const submitButtonDisabled = '//button[@class="btn btn-primary disabled"]';

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
    const input = $(email.inputField);
    input.setValue('qwqwqwqw@gde.com');
    browser.keys('Enter');
    browser.pause(1000);

    const actualErrText = $('//h4[@class="notification-title"]').getText();
    const expected = email.notFoundMessage;
    expect(actualErrText).to.eq(expected);
  });

  it('should verify that Send password reset email button is deactivated', () => {
    const input = $(email.inputField);
    input.setValue('');
    const submitButtonIsEnabled = $(submitButtonDisabled).isEnabled();
    expect(submitButtonIsEnabled).to.eq(false);
  });

  it('should verify entering valid credentials and clicking Send password reset email is successful', () => {
    const input = $(email.inputField);
    input.setValue(validEmailData.email);
    browser.keys('Enter');
    browser.pause(3000);
    const actualSucText = $('//h4[@class="notification-title"]').getText();
    expect(actualSucText).to.eq(validEmailData.message);
  });

  it('should verify invalid emails', () => {
    invalidEmailData.emails.forEach(invalidEmail => {
      browser.url(url.forgotPassUrl);
      const input = $(email.inputField);
      input.setValue(invalidEmail);
      const submitButtonIsEnabled = $(submitButtonDisabled).isEnabled();
      expect(submitButtonIsEnabled).to.eq(false);
      const actualInvalidMessage = $('//div[@class="invalid-feedback"]').getText();
      expect(actualInvalidMessage, '${invalidEmail} should be invalid').to.eq(
        invalidEmailData.message,
      );
    });
  });
});
