const { expect } = require('chai');
import { url } from '../../../examples/constants';
import { user } from '../../../examples/user/constants';

describe('REGISTRATION FORM SUBMIT BUTTON SHOULD DISABLED WHEN REAL NAME IS EMPTY', () => {
  before(() => {
    browser.url(url.registerUrl);
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

  it('should check that Real Name field is empty', () => {
    const realNameField = $('//input[@name="name"]');
    realNameField.click();
    browser.keys('Tab');
    browser.pause(1000);
    const actualBorderColor = realNameField.getCSSProperty('border-color').parsed.hex;
    const expectedBorderColor = '#ff4465';

    expect(actualBorderColor).equal(expectedBorderColor);
  });
  it('should check that submit button is disabled when Real Name is empty', () => {
    const submitButton = $('//button[contains(@class,"btn btn-primary disabled")]');
    const actualResult = submitButton.isEnabled();

    expect(actualResult).false;
  });
});

describe('REGISTRATION FORM SUBMIT BUTTON SHOULD DISABLED WHEN REAL NAME FILLED INCORRECT', () => {
  before(() => {
    browser.url(url.registerUrl);

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

  it('should check that real name filled incorrect', () => {
    const realNameField = $('//input[@name="name"]');
    const arrNames = [
      'J Jhonson',
      'jo smith',
      '1 Smith',
      'Тестовое Имя',
      '12566',
      ' ',
      'Ruslan ',
      'Jhon',
      '&&*^^$@',
    ];
    for (let i = 0; i < arrNames.length; i++) {
      realNameField.setValue(arrNames[i]);
      browser.keys('Tab');
      browser.pause(1000);
      const actualBorderColor = realNameField.getCSSProperty('border-color').parsed.hex;
      const expectedBorderColor = '#ff4465';
      expect(actualBorderColor).equal(expectedBorderColor);
    }
  });

  it('should check that submit button disabled when Real Name filled incorrect', () => {
    const submitButton = $('//button[contains(@class,"btn btn-primary disabled")]');
    const actualResult = submitButton.isEnabled();

    expect(actualResult).false;
  });
});
