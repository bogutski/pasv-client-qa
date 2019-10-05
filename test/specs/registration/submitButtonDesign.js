import { url } from '../constants.js';
import { expect } from 'chai';
const elementSelector = '//button[@type="submit"]';
const englishLevelSelector = '//label[@for="englishLevel"]/../../select';
const selectors = [
  '//input[@name="firstName"]',
  '//input[@name="lastName"]',
  '//input[@name="phone"]',
  '//input[@name="email"]',
  '//input[@name="password"]',
  '//textarea[@name="about"]',
  '//textarea[@name="goals"]',
];
const names = [
  'Kate',
  'Saf',
  '19163906778',
  'gjhghgh@gmail.com',
  '11111',
  'About about',
  '1. My goals',
];
const expectedFontColor = '#ffffff';
const expectedBackgroundColor = '#0052cc';
const expectedBorderColor = '#0052cc';
const expectedFontSize = '17px';
const expectedFontWeight = 400;
const expectedAlign = 'flex-start';
const expectedColorHover = '#ffffff';
const expectedBackgroundColorHover = '#0043a6';
const expectedBorderColorHover = '#003e99';
const expectedShadowBox = 'rgba(38,108,212,0.5)0px0px0px3.2px';

describe('Registration - Submit Button - Design', () => {
  before(() => {
    browser.url(url.register);

    for (let i = 0; i < selectors.length; i++) {
      $(selectors[i]).click();
      browser.pause(50);
      $(selectors[i]).setValue(names[i]);
    }
    $(englishLevelSelector).selectByVisibleText('Elementary');
    browser.pause(50);
  });

  it('should verify that submit button font color is correct in usable state', () => {
    const actualFontColor = $(elementSelector).getCSSProperty('color').parsed.hex;
    expect(actualFontColor).to.eq(expectedFontColor);
  });

  it('should verify that submit button background-color is correct in usable state', () => {
    const actualBackgroundColor = $(elementSelector).getCSSProperty('background-color').parsed.hex;
    expect(actualBackgroundColor).to.eq(expectedBackgroundColor);
  });

  it('should verify that submit button border-color is correct in usable state', () => {
    const actualBorderColor = $(elementSelector).getCSSProperty('background-color').parsed.hex;
    expect(actualBorderColor).to.eq(expectedBorderColor);
  });

  it('should verify that submit button font-size is correct in usable state', () => {
    const actualFontSize = $(elementSelector).getCSSProperty('font-size').value;
    expect(actualFontSize).to.eq(expectedFontSize);
  });

  it('should verify that submit button font-weight is correct in usable state', () => {
    const actualFontWeight = $(elementSelector).getCSSProperty('font-weight').value;
    expect(actualFontWeight).to.eq(expectedFontWeight);
  });

  it('should verify that submit button align is correct in usable state', () => {
    const actualAlign = $(elementSelector).getCSSProperty('align-items').value;
    expect(actualAlign).to.eq(expectedAlign);
  });

  it('should verify that submit button color is correct in hover state', () => {
    const actualColorHover = $(elementSelector).getCSSProperty('color').parsed.hex;
    expect(actualColorHover).to.eq(expectedColorHover);
  });

  it('should verify that submit button background-color is correct in hover state', () => {
    $(elementSelector).moveTo();
    browser.pause(200);
    const actualBackgroundColorHover = $(elementSelector).getCSSProperty('background-color').parsed
      .hex;
    expect(actualBackgroundColorHover).to.eq(expectedBackgroundColorHover);
  });

  it('should verify that submit button border-color is correct in hover state', () => {
    $(elementSelector).moveTo();
    const actualBorderColorHover = $(elementSelector).getCSSProperty('border-color').parsed.hex;
    expect(actualBorderColorHover).to.eq(expectedBorderColorHover);
  });

  it('should verify that when user clicks Submit button, shadow-box appears ', () => {
    $(elementSelector).moveTo();
    browser.buttonDown();
    browser.pause(200);
    const actualShadowBox = $(elementSelector).getCSSProperty('box-shadow').parsed.rgba;
    browser.buttonUp();
    expect(actualShadowBox).to.eq(expectedShadowBox);
  });
});
