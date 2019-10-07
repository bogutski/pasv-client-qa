const { expect } = require('chai');
import { url } from '../../../../constants';
import { user } from '../../../../../examples/user/constants';

describe('User - Register - Submit button - Disabled - First name empty', () => {
  before(() => {
    browser.url(url.register);
    const cellPhoneNumberField = $('//input[@name="phone"]');
    const emailField = $('//input[@name="email"]');
    const passwordField = $("//input[@name='password']");
    const aboutField = $('//textarea[@name="about"]');
    const goalsField = $('//textarea[@name="goals"]');
    const englishLevelField = $('//select[contains(@class,"form-control")]');

    cellPhoneNumberField.setValue(user.student.phone);
    emailField.setValue(user.student.email);
    passwordField.setValue(user.student.password);
    aboutField.setValue(user.student.about);
    goalsField.setValue(user.student.goals);
    englishLevelField.selectByVisibleText('Native');
  });

  it('should check that First name field is empty', () => {
    const firstNameField = $('//input[@name="firstName"]');
    firstNameField.click();
    browser.keys('Tab');
    browser.pause(1000);
    const actualBorderColor = firstNameField.getCSSProperty('border-color').parsed.hex;
    const expectedBorderColor = '#ff4465';

    expect(actualBorderColor).equal(expectedBorderColor);
  });
  it('should check that submit button is disabled when first name field is empty', () => {
    const submitButton = $('//button[contains(@class,"btn btn-primary disabled")]');
    const actualResult = submitButton.isEnabled();

    expect(actualResult).false;
  });
});

describe('User - Register - Submit button - Disabled - First name incorrect', () => {
  before(() => {
    browser.url(url.register);
    const lastName = $('//input[@name="lastName"]');
    const cellPhoneNumberField = $('//input[@name="phone"]');
    const emailField = $('//input[@name="email"]');
    const passwordField = $("//input[@name='password']");
    const aboutField = $('//textarea[@name="about"]');
    const goalsField = $('//textarea[@name="goals"]');
    const englishLevelField = $('//select[contains(@class,"form-control")]');

    lastName.setValue(user.student.lastName);
    cellPhoneNumberField.setValue(user.student.phone);
    emailField.setValue(user.student.email);
    passwordField.setValue(user.student.password);
    aboutField.setValue(user.student.about);
    goalsField.setValue(user.student.goals);
    englishLevelField.selectByVisibleText('Native');
  });

  it('should check that first name filled incorrect', () => {
    const firstNameField = $('//input[@name="firstName"]');
    const arrNames = [
      'J Jhonson',
      'jo smith',
      '1 Smith',
      'Тестовое Имя',
      '12566',
      ' ',
      'Ruslan ',
      '&&*^^$@',
    ];
    for (let i = 0; i < arrNames.length; i++) {
      firstNameField.setValue(arrNames[i]);
      browser.keys('Tab');
      browser.pause(1000);
      const actualBorderColor = firstNameField.getCSSProperty('border-color').parsed.hex;
      const expectedBorderColor = '#ff4465';

      expect(actualBorderColor).equal(expectedBorderColor);
    }
  });

  it('should check that submit button disabled when first Name filled incorrect', () => {
    const submitButton = $('//button[contains(@class,"btn btn-primary disabled")]');
    const actualResult = submitButton.isEnabled();

    expect(actualResult).false;
  });
});
