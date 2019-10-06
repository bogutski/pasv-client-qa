import { expect } from 'chai';
import {url} from './../../constants';

describe('User - Registration - ErrorMessage - Design', () => {

  before(() => {
    browser.url(url.register);

    const firstNameField = $('//input[@name="firstName"]');
    const lastNameField = $('//input[@name="lastName"]');
    const cellPhoneNumberField = $('//input[@name="phone"]');
    const emailField = $('//input[@name="email"]');
    const passwordField = $('//input[@name="password"]');
    const aboutTextArea = $('//textarea[@name="about"]');
    const myGoalsTextArea = $('//textarea[@name="goals"]');
    const englishLevelDropDown = $('//label[@for="englishLevel"]/../../select');
    const submitButton = $('//button[@type="submit"]');

    firstNameField.setValue('Test');
    lastNameField.setValue('Kate');
    cellPhoneNumberField.setValue('380653332245');
    emailField.setValue('testKate1@gmail.com');
    passwordField.setValue('12345');
    aboutTextArea.setValue('PASV');
    myGoalsTextArea.setValue('QA Engineer');
    englishLevelDropDown.selectByAttribute('value', 'Beginner');

    submitButton.click();
  });

  const errorMessage = '//div[contains(@class,"notification-error")]/h4';
  const wrapperErrorMessage = '//div[contains(@class,"notification-error")]';
  const expected = {
    fontSize: '14px',
    fontWeight: '700',
    fontColor: '#ec3d3d',
    textAlignment: 'left',
    fontFamily: '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
    backgroundColor: '#f4e9e9',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: '#ec3d3d',
    boxShadow: '#ec3d3d',
  };


  it('should wait until error message appears', () => {
    browser.waitUntil(() => {
      return $(errorMessage).isDisplayed();
    }, 5000, 'expected text to be different after 5s');
  });

  it('should have the correct text', () => {
    const actualText = $(errorMessage).getText();
    // const expectedText = 'User with this e-mail exists';
    // expect(actualText).to.be.equal(expectedText);
    expect(actualText).includes('e-mail exists');
  });

  it('should have the correct font-size', () => {
    const actualFontSize = $(errorMessage).getCSSProperty('font-size').parsed.string;
    expect(actualFontSize).to.be.equal(expected.fontSize);
  });

  it('should have the correct font-weight', () => {
    const actualFontWeight = $(errorMessage).getCSSProperty('font-weight').parsed.string;
    expect(actualFontWeight).to.be.equal(expected.fontWeight);
  });

  it('should have the correct font-color', () => {
    const actualFontColor = $(errorMessage).getCSSProperty('color').parsed.hex.toLowerCase();
    expect(actualFontColor).to.be.equal(expected.fontColor);
  });

  it('should have the correct text-aligment', () => {
    const actualTextAligment = $(errorMessage).getCSSProperty('text-align').parsed.string;
    expect(actualTextAligment).to.be.equal(expected.textAlignment);
  });

  it('should have the correct font-family', () => {
    const actualFontFamily = $(errorMessage).getCSSProperty('font-family').parsed.string.toLowerCase();
    expect(actualFontFamily).to.be.equal(expected.fontFamily);
  });

  it('should have the correct background-color', () => {
    const actualBackgroundColor = $(wrapperErrorMessage).getCSSProperty('background-color').parsed.hex.toLowerCase();
    expect(actualBackgroundColor).to.be.equal(expected.backgroundColor);
  });

  it('should have the correct border-top-width', () => {
    const actualBorderTopWidth = $(wrapperErrorMessage).getCSSProperty('border-top-width').parsed.string;
    expect(actualBorderTopWidth).to.be.equal(expected.borderTopWidth);
  });

  it('should have the correct border-top-style:', () => {
    const actualBorderTopStyle = $(wrapperErrorMessage).getCSSProperty('border-top-style').parsed.string;
    expect(actualBorderTopStyle).to.be.equal(expected.borderTopStyle);
  });

  it('should have the correct border-top-color:', () => {
    const actualBorderTopColor = $(wrapperErrorMessage).getCSSProperty('border-top-color').parsed.hex.toLowerCase();
    expect(actualBorderTopColor).to.be.equal(expected.borderTopColor);
  });

  it('should have the correct box-shadow:', () => {
    const actualBoxShadow = $(wrapperErrorMessage).getCSSProperty('box-shadow').parsed.hex.toLowerCase();
    expect(actualBoxShadow).to.be.equal(expected.boxShadow);
  });

});
