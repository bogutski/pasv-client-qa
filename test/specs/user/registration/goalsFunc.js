import { expect } from 'chai';
import { user } from '../_data/data';
import { url } from '../../../specs/constants';

const sel = {
  lastNameField: '//input[@name="lastName"]',
  firstNameField: '//input[@name="firstName"]',
  phoneField: '//input[@name="phone"]',
  emailField: '//input[@name="email"]',
  passwordField: '//input[@name="password"]',
  aboutArea: '//textarea[@name="about"]',
  goalsArea: '//textarea[@name="goals"]',
  englishLevelField: '//select[@name="englishLevel"]//option[@value="Advanced"]',
  button: '//button[text()="Submit"]',
  requiredLabel: '//textarea[@name="goals"]/../div/span[text()="Required"]',
};

const data = {
  allTypeSymbols: '!@#$%^&*()_+{}[]||:;"\'< >.?*/-/1qW',
  textNoLimit:
    'Lorem Ipsum has been the industry s standard dummy text. It has survived not only five centuries but also the leap into electronic typesetting remaining essentially unchanged. It was popularised in the 1960s with the the release of Letraset sheets containing Lorem IIpsum passages.',
  text1Char: 'I',
  textValid: 'is-valid',
  textIsInvalid: 'is-invalid',
  areaResize: 'vertical',
  areaScroll: 'auto',
  firstName: 'Test',
  lastName: 'Student',
};

describe('User - Register - `My goals` area - Func', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should check that the area is displayed', () => {
    expect($(sel.goalsArea).isDisplayed()).to.be.true;
  });

  it('should check that area validation is failed if the area is empty', () => {
    $(sel.goalsArea).setValue(user.student.goals);
    $(sel.goalsArea).clearValue();
    browser.keys('Tab');
    const areaIsInvalid = $(sel.goalsArea)
      .getAttribute('class')
      .includes(data.textIsInvalid);
    expect(areaIsInvalid).to.be.true;
  });

  it('should check that `Submit` button is disabled if the area is empty', () => {
    $(sel.firstNameField).setValue(data.firstName);
    $(sel.lastNameField).setValue(data.lastName);
    $(sel.phoneField).setValue(user.student.phone);
    $(sel.emailField).setValue(user.student.email);
    $(sel.passwordField).setValue(user.student.password);
    $(sel.aboutArea).setValue(user.student.about);
    $(sel.englishLevelField).click();
    expect($(sel.button).isEnabled()).to.be.false;
  });

  it('should check that the area has label `Required` if the area is empty', () => {
    expect($(sel.requiredLabel).isDisplayed()).to.be.true;
  });

  it('should check that the area is valid with any char type', () => {
    $(sel.goalsArea).setValue(data.allTypeSymbols);
    browser.keys('Tab');
    const areaIsValid = $(sel.goalsArea)
      .getAttribute('class')
      .includes(data.textValid);
    expect(areaIsValid).to.be.true;
  });

  it('should check that the area is valid with 1 char', () => {
    $(sel.goalsArea).setValue(data.text1Char);
    browser.keys('Tab');
    const areaIsValid = $(sel.goalsArea)
      .getAttribute('class')
      .includes(data.textValid);
    expect(areaIsValid).to.be.true;
  });

  it('should check that the area is valid with no text limitation', () => {
    $(sel.goalsArea).setValue(data.textNoLimit);
    browser.keys('Tab');
    const areaIsValid = $(sel.goalsArea)
      .getAttribute('class')
      .includes(data.textValid);
    expect(areaIsValid).to.be.true;
  });

  it('should check that the area can be resized vertically', () => {
    const areaResized = $(sel.goalsArea).getCSSProperty('resize').value;
    expect(areaResized).to.be.equal(data.areaResize);
  });

  it('should check that the scroll bar appears, when the area contains large text', () => {
    const areaScrolled = $(sel.goalsArea).getCSSProperty('overflow').value;
    expect(areaScrolled).to.be.equal(data.areaScroll);
  });

  it('should check that `Submit` button is enabled if the area contains text', () => {
    $(sel.firstNameField).setValue(data.firstName);
    $(sel.lastNameField).setValue(data.lastName);
    $(sel.phoneField).setValue(user.student.phone);
    $(sel.emailField).setValue(user.student.email);
    $(sel.passwordField).setValue(user.student.password);
    $(sel.aboutArea).setValue(user.student.about);
    $(sel.goalsArea).setValue(user.student.goals);
    $(sel.englishLevelField).click();
    expect($(sel.button).isEnabled()).to.be.true;
  });
});
