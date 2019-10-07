import { expect } from 'chai';
import { url } from '../../../specs/constants';

const registrationFields = {
  firstName: '//input[@name="firstName"]',
  lastName: '//input[@name="lastName"]',
  phone: '//input[@name="phone"]',
  email: '//input[@name="email"]',
  password: '//input[@name="password"]',
  about: '//textarea[@name="about"]',
  goals: '//textarea[@name="goals"]',
  english: '//select[@name="englishLevel"]',
  button: '//button[@type="submit"]',
  shortPassErr: '//div[text()="Must be 5 characters or more"]',
  longPassErr: '//div[text()="Must be 30 characters or less"]',
};

const data = {
  firstName: 'Sergei',
  lastName: 'Latyshev',
  phone: '15557779999',
  email: 'latyshev@test.com',
  about: 'about test test test',
  goals: 'goals test test test',
  english: 'Elementary',
  correctPass: '1234567890abcde',
  shortPass: '123a',
  longPass: '1234567890abcde1234567890abcde1',
  symbolPass: '1Aa@#$%^&*()_+\\|/<>=',
  valid: 'is-valid',
  invalid: 'is-invalid',
};

describe('Password functionality', () => {
  before(() => {
    browser.url(url.register);
    browser.maximizeWindow();
  });

  it('should enter first Name', () => {
    const field = $(registrationFields.firstName);
    field.setValue(data.firstName);
  });

  it('should enter last Name', () => {
    const field = $(registrationFields.lastName);
    field.setValue(data.lastName);
  });

  it('should enter Cellphone', () => {
    const field = $(registrationFields.phone);
    field.setValue(data.phone);
  });

  it('should enter Email', () => {
    const field = $(registrationFields.email);
    field.setValue(data.email);
  });

  it('should enter About', () => {
    const field = $(registrationFields.about);
    field.setValue(data.about);
  });

  it('should enter My Goals', () => {
    const field = $(registrationFields.goals);
    field.setValue(data.goals);
  });

  it('should choose English Level', () => {
    const field = $(registrationFields.english);
    field.selectByVisibleText(data.english);
  });

  it('should verify that "Password field" is required', () => {
    const button = $(registrationFields.button);
    const actual = button.isEnabled();
    expect(actual).to.be.false;
  });

  it('should check "Password field" with correct password', () => {
    const field = $(registrationFields.password);
    field.setValue(data.correctPass);
    browser.keys('Tab');
  });

  it('should check that all symbols in the "Password field" are covered with bullets ', () => {
    const field = $(registrationFields.password);
    const bullets = field.getCSSProperty('-webkit-text-security').value;
    expect(bullets).to.be.equal('disc');
  });

  it('should allow to submit with correct password', () => {
    const button = $(registrationFields.button);
    const actual = button.isEnabled();
    expect(actual).to.be.true;
  });

  it('should mark field as valid with correct password', () => {
    const actual = $(registrationFields.password).getAttribute('class');
    expect(actual).to.contains(data.valid);
  });

  it('should check "Password field" with short password', () => {
    const field = $(registrationFields.password);
    field.setValue(data.shortPass);
    browser.keys('Tab');
  });

  it('should not allow to submit with short password', () => {
    const button = $(registrationFields.button);
    const actual = button.isEnabled();
    expect(actual).to.be.false;
  });

  it('should display error message for short password', () => {
    const message = $(registrationFields.shortPassErr);
    const actual = message.isDisplayed();
    expect(actual).to.be.true;
  });

  it('should mark field as invalid with short password', () => {
    const actual = $(registrationFields.password).getAttribute('class');
    expect(actual).to.contains(data.invalid);
  });

  it('should check "Password field" with long password', () => {
    const field = $(registrationFields.password);
    field.setValue(data.longPass);
    browser.keys('Tab');
  });

  it('should not allow to submit with long password', () => {
    const button = $(registrationFields.button);
    const actual = button.isEnabled();
    expect(actual).to.be.false;
  });

  it('should displayed error message for long password', () => {
    const message = $(registrationFields.longPassErr);
    const actual = message.isDisplayed();
    expect(actual).to.be.true;
  });

  it('should mark field as invalid with long password', () => {
    const actual = $(registrationFields.password).getAttribute('class');
    const expected = 'is-invalid';
    expect(actual).to.contains(expected);
  });

  it('should should check "Password field" take any symbols in password', () => {
    const field = $(registrationFields.password);
    field.setValue(data.symbolPass);
  });

  it('should allow to submit with any symbols in password', () => {
    const button = $(registrationFields.button);
    const actual = button.isEnabled();
    expect(actual).to.be.true;
  });

  it('should mark field as valid with any symbols in password', () => {
    const actual = $(registrationFields.password).getAttribute('class');
    expect(actual).to.contains(data.valid);
  });

  it('should should check "Password field" is required if it was cleared', () => {
    const field = $(registrationFields.password);
    field.clearValue();
    const button = $(registrationFields.button);
    const actual = button.isEnabled();
    expect(actual).to.be.false;
  });

  it('should mark field as invalid with if it was cleared', () => {
    const actual = $(registrationFields.password).getAttribute('class');
    expect(actual).to.contains(data.invalid);
  });
});
