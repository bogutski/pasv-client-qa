import { expect } from 'chai';
import { url } from '../../../../constants';
import { user } from '../../../_data/data';

let firstNameField = '//input[@name="firstName"]';
let lastName = '//input[@name="lastName"]';
let cellPhoneNumberField = '//input[@name="phone"]';
let emailField = '//input[@name="email"]';
let passwordField = "//input[@name='password']";
let aboutField = '//textarea[@name="about"]';
let goalsField = '//textarea[@name="goals"]';
let englishLevelField = '//select[@name="englishLevel"]';
let submitButton = '//button[@type="submit"]';

const negativeNames = [
  'J Jhonson',
  'jo smith',
  '1 Smith',
  'Тестовое Имя',
  '12566',
  ' ',
  'Ruslan ',
  '&&*^^$@',
];

describe('User - Register - Submit button - Disabled - First name empty', () => {
  before(() => {
    browser.url(url.register);
    $(cellPhoneNumberField).setValue(user.student.phone);
    $(lastName).setValue(user.student.lastName);
    $(emailField).setValue(user.student.email);
    $(passwordField).setValue(user.student.password);
    $(aboutField).setValue(user.student.about);
    $(goalsField).setValue(user.student.goals);
    $(englishLevelField).selectByVisibleText('Native');
  });

  it('should check that First name field is empty', () => {
    $(firstNameField).click();
    browser.keys('Tab');
    browser.pause(1000);
    const actualBorderColor = $(firstNameField).getCSSProperty('border-color').parsed.hex;
    const expectedBorderColor = '#ff4465';

    expect(actualBorderColor).equal(expectedBorderColor);
  });
  it('should check that submit button is disabled when first name field is empty', () => {
    const actualResult = $(submitButton).isEnabled();

    expect(actualResult).false;
  });
});

describe('User - Register - Submit button - Disabled - First name incorrect', () => {
  before(() => {
    browser.url(url.register);
    $(cellPhoneNumberField).setValue(user.student.phone);
    $(lastName).setValue(user.student.lastName);
    $(emailField).setValue(user.student.email);
    $(passwordField).setValue(user.student.password);
    $(aboutField).setValue(user.student.about);
    $(goalsField).setValue(user.student.goals);
    $(englishLevelField).selectByVisibleText('Native');
  });

  it('should check that first name filled incorrect', () => {
    for (let i = 0; i < negativeNames.length; i++) {
      $(firstNameField).setValue(negativeNames[i]);
      browser.keys('Tab');
      browser.pause(1000);
      const actualBorderColor = $(firstNameField).getCSSProperty('border-color').parsed.hex;
      const expectedBorderColor = '#ff4465';

      expect(actualBorderColor).equal(expectedBorderColor);
    }
  });

  it('should check that submit button disabled when first Name filled incorrect', () => {
    const actualResult = $(submitButton).isEnabled();

    expect(actualResult).false;
  });
});
