// eslint-disable-next-line no-unused-vars
import registerAction from '../../../../../examples/user/actions/registerAction';
import { url } from '../../../../constants';
import { user } from '../../../../../examples/user/constants';
// eslint-disable-next-line no-unused-vars
const { expect } = require('chai');

describe('SUBMIT BUTTON IS ENABLED WHEN ALL FIELDS FILLED CORRECTLY', () => {
  // eslint-disable-next-line mocha/no-hooks-for-single-case
  before(() => {
    browser.url(url.register);

    const nameField = $('//input[@name="name"]');
    const phoneField = $('//input[@name="phone"]');
    const emailField = $('//input[@name="email"]');
    const passwordField = $('//input[@name="password"]');
    const aboutField = $('//textarea[@name="about"]');
    const goalsField = $('//textarea[@name="goals"]');
    const englishLevelField = $('//label[@for="englishLevel"]/../../select');

    nameField.setValue(user.student.name);
    phoneField.setValue(user.student.phone);
    emailField.setValue(user.student.email);
    passwordField.setValue(user.student.password);
    aboutField.setValue(user.student.about);
    goalsField.setValue(user.student.goals);
    englishLevelField.selectByVisibleText('Elementary');
  });

  it('Should check that submit button is enabled when all fields filled correct', () => {
    const submitButton = $('//button[@type="submit"]');
    const isEnabled = submitButton.isEnabled();

    expect(isEnabled).equal(true);
  });
});
