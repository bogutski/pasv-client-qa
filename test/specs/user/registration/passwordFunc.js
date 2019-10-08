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
  passErr: '//input[@name="password"]/../div[@class="invalid-feedback"]',
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
  longPassErr: 'Must be 30 characters or less',
  shortPassErr: 'Must be 5 characters or more',
};

describe('User - Registration - Password - Functionality', () => {
  before(() => {
    browser.url(url.register);
    browser.maximizeWindow();
  });

  it('should fill all fields except the Password', () => {
    $(registrationFields.firstName).setValue(data.firstName);
    $(registrationFields.lastName).setValue(data.lastName);
    $(registrationFields.phone).setValue(data.phone);
    $(registrationFields.email).setValue(data.email);
    $(registrationFields.about).setValue(data.about);
    $(registrationFields.goals).setValue(data.goals);
    $(registrationFields.english).selectByVisibleText(data.english);
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

  it('should verify that the "Password field" has type Password', () => {
    const field = $(registrationFields.password);
    const type = field.getAttribute('type');
    expect(type).to.be.equal('password');
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
    const message = $(registrationFields.passErr);
    const actual = message.isDisplayed();
    expect(actual).to.be.true;
    const actMsgText = message.getText();
    const msgText = data.shortPassErr;
    expect(actMsgText).to.be.eq(msgText);
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
    const message = $(registrationFields.passErr);
    const actual = message.isDisplayed();
    expect(actual).to.be.true;
    const actMsgText = message.getText();
    const msgText = data.longPassErr;
    expect(actMsgText).to.be.eq(msgText);
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
