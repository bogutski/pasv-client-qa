import { expect } from 'chai';
import { url } from '../../constants';
import { user } from '../_data/data';

const passwordField = '//input[@name="password"]';
const label = '//label[@for="password"]';

const expected = {
  borderColor: '#ced4da',
  focusBorderColor: '#4d94ff',
  fontColor: '#495057',
  highlightColor: '#0052cc',
  backgroundColor: '#ffffff',
  textAlign: 'start',
  fontFamily: '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
  fontWeight: '400',
  borderColorValid: '#24c88b',
  highlightColorValid: '#24c88b',
  labelText: 'Password',
  labelFontSize: '17px',
  labelColor: '#212529',
  labelFontWeight: '400',
  labelTextAlign: 'left',
};

describe('Register - Password - Design', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should verify that `Password` field is displayed', () => {
    expect($(passwordField).isDisplayed()).to.be.true;
  });

  it('should verify border-color', () => {
    const actualBorderColor = $(passwordField).getCSSProperty('border-top-color').parsed.hex;
    expect(actualBorderColor).equal(expected.borderColor);
  });
});

describe('Register - Password - when user enters first symbol - Design', () => {
  before(() => {
    browser.url(url.register);
    $(passwordField).setValue('1');
    browser.pause(500);
  });

  it('should check font-color', () => {
    const actualFontColor = $(passwordField).getCSSProperty('color').parsed.hex;
    expect(actualFontColor).equal(expected.fontColor);
  });

  it('should verify focus border-color', () => {
    const actualFocusBorderColor = $(passwordField).getCSSProperty('border-color').parsed.hex;
    expect(actualFocusBorderColor).equal(expected.focusBorderColor);
  });

  it('should verify focus highlight color', function() {
    const actualHighlightColor = $(passwordField)
      .getCSSProperty('box-shadow')
      .parsed.hex.toLowerCase();
    expect(actualHighlightColor).equal(expected.highlightColor);
  });

  it('should verify background-color', () => {
    const actualBackgroundColor = $(passwordField).getCSSProperty('background-color').parsed.hex;
    expect(actualBackgroundColor).equal(expected.backgroundColor);
  });

  it('should verify text-align', () => {
    const actualTextAlign = $(passwordField).getCSSProperty('text-align').parsed.string;
    expect(actualTextAlign).equal(expected.textAlign);
  });

  it('should verify font-family', () => {
    const actualFontFamily = $(passwordField).getCSSProperty('font-family').parsed.string;
    expect(actualFontFamily).to.equal(expected.fontFamily);
  });

  it('should verify font-weight', () => {
    const actualFontWeight = $(passwordField).getCSSProperty('font-weight').parsed.string;
    expect(actualFontWeight).to.equal(expected.fontWeight);
  });
});
describe('Register - Password - when password is validated - Design', () => {
  before(() => {
    browser.url(url.register);
    $(passwordField).setValue(user.admin.password);
    browser.keys('Tab');
    browser.pause(500);
  });

  it('should verify border-color of field ', () => {
    const actualBorderColorValid = $(passwordField).getCSSProperty('border-color').parsed.hex;
    expect(actualBorderColorValid).equal(expected.borderColorValid);
  });

  it('should verify focus highlight color', function() {
    $(passwordField).click();
    const actualHighlightColorValid = $(passwordField).getCSSProperty('box-shadow').parsed.hex;
    expect(actualHighlightColorValid).equal(expected.highlightColorValid);
  });

  it('should verify that field is valid', () => {
    expect($(passwordField).getAttribute('class')).includes('is-valid');
  });
});

describe('Register - Password - Label - Design', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should verify that label is displayed', function() {
    expect($(label).isDisplayed()).to.be.true;
  });

  it('should verify that label has correct text', function() {
    const actualLabelText = $(label).getText();
    expect(actualLabelText).to.equal(expected.labelText);
  });

  it('should verify font-family', () => {
    const actualFontFamily = $(label).getCSSProperty('font-family').parsed.string;
    expect(actualFontFamily).to.equal(expected.fontFamily);
  });

  it('should verify font-size', () => {
    const actualLabelFontSize = $(label).getCSSProperty('font-size').parsed.string;
    expect(actualLabelFontSize).to.equal(expected.labelFontSize);
  });

  it('should verify font-color', () => {
    const actualLabelColor = $(label).getCSSProperty('color').parsed.hex;
    expect(actualLabelColor).to.equal(expected.labelColor);
  });

  it('should verify font-weight', () => {
    const actualLabelFontWeight = $(label).getCSSProperty('font-weight').parsed.string;
    expect(actualLabelFontWeight).to.equal(expected.labelFontWeight);
  });

  it('should verify text-align', () => {
    const actualLabelTextAlign = $(label).getCSSProperty('text-align').parsed.string;
    expect(actualLabelTextAlign).to.equal(expected.labelTextAlign);
  });
});
