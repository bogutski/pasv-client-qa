import { url } from '../constants.js';
import { expect } from 'chai';
const elementSelector = '//button[@type="submit"]';

describe('Registration - Submit Button - Design', () => {
  before(() => {
    browser.url(url.register);
    const selectors = [
      '//input[@name="name"]',
      '//input[@name="phone"]',
      '//input[@name="email"]',
      '//input[@name="password"]',
      '//textarea[@name="about"]',
      '//textarea[@name="goals"]',
    ];
    const names = [
      'Kate Saf',
      '+19163906778',
      'gjhghgh@gmail.com',
      '11111',
      'About about',
      '1. My goals',
    ];
    for (let i = 0; i < selectors.length; i++) {
      $(selectors[i]).click();
      browser.pause(50);
      $(selectors[i]).setValue(names[i]);
    }
    $('//label[@for="englishLevel"]/../../select').selectByVisibleText('Elementary');
    browser.pause(50);
  });

  it('should verify that submit button font color is correct in usable state', () => {
    const actualFontColor = $(elementSelector).getCSSProperty('color').parsed.hex;
    const expectedResult = '#ffffff';
    expect(actualFontColor).to.eq(expectedResult);
  });

  it('should verify that submit button background-color is correct in usable state', () => {
    const actualBackgroundColor = $(elementSelector).getCSSProperty('background-color').parsed.hex;
    const expectedResult = '#0052cc';
    expect(actualBackgroundColor).to.eq(expectedResult);
  });

  it('should verify that submit button border-color is correct in usable state', () => {
    const actualBorderColor = $(elementSelector).getCSSProperty('background-color').parsed.hex;
    const expectedResult = '#0052cc';
    expect(actualBorderColor).to.eq(expectedResult);
  });

  it('should verify that submit button font-size is correct in usable state', () => {
    const actualFontSize = $(elementSelector).getCSSProperty('font-size').value;
    const expectedResult = '17px';
    expect(actualFontSize).to.eq(expectedResult);
  });

  it('should verify that submit button font-weight is correct in usable state', () => {
    const actualFontWeight = $(elementSelector).getCSSProperty('font-weight').value;
    const expectedResult = 400;
    expect(actualFontWeight).to.eq(expectedResult);
  });

  it('should verify that submit button align is correct in usable state', () => {
    const actualAlign = $(elementSelector).getCSSProperty('align-items').value;
    const expectedResult = 'flex-start';
    expect(actualAlign).to.eq(expectedResult);
  });

  it('should verify that submit button color is correct in hover state', () => {
    const actualColor = $(elementSelector).getCSSProperty('color').parsed.hex;
    const expectedResult = '#ffffff';
    expect(actualColor).to.eq(expectedResult);
  });

  it('should verify that submit button background-color is correct in hover state', () => {
    $(elementSelector).moveTo();
    browser.pause(200);
    const actualBackgrounColorHover = $(elementSelector).getCSSProperty('background-color').parsed
      .hex;
    const expectedResult = '#0043a6';
    expect(actualBackgrounColorHover).to.eq(expectedResult);
  });

  it('should verify that submit button border-color is correct in hover state', () => {
    $(elementSelector).moveTo();
    const actualBorderColorHover = $(elementSelector).getCSSProperty('border-color').parsed.hex;
    const expectedResult = '#003e99';
    expect(actualBorderColorHover).to.eq(expectedResult);
  });

  it('should verify that when user clicks Submit button, shadow-box appears ', () => {
    $(elementSelector).moveTo();
    browser.buttonDown();
    browser.pause(200);
    const actualShadowBox = $(elementSelector).getCSSProperty('box-shadow').parsed.rgba;
    browser.buttonUp();
    const expectedResult = 'rgba(38,108,212,0.5)0px0px0px3.2px';
    expect(actualShadowBox).to.eq(expectedResult);
  });
});
