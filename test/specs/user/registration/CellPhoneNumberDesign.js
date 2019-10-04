import { expect } from 'chai';
import { url } from '../../constants';
import { user } from '../../../examples/user/constants';

const inputFieldPhone = '//input[@name="phone"]';
const label = '//label[@for="phone"]';
const descText = '//input[@name="phone"]/following-sibling::small';
const firstSymbol = '+';
const expectedBorder = '#ced4da';
const expectedFontColor = '#495057';
const expectedFocusBorderColor = '#4d94ff';
const expectedFocusHighlightColor = '#0052cc';
const expectedBackgroundColor = '#ffffff';
const expectedTextAlign = 'start';
const expectedWeight = 400;
const expectedFontFamily =
  '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
const expectedBorderColorValid = '#24c88b';
const expectedDescText = 'Format +17770005511 or +380653332244';
const expectedLabelSize = '17px';
const expectLabelColor = '#212529';
const expectedAlign = 'left';
const expectedDescTextSize = '13.6px';

describe('User - Register Page - Cell Phone Number input field - Design', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should check that the input field is displayed', () => {
    const actualInputFieldPhone = $(inputFieldPhone).isDisplayed();
    expect(actualInputFieldPhone).to.be.true;
  });

  it('should check border-color', () => {
    const actualBorder = $(inputFieldPhone).getCSSProperty('border-top-color').parsed.hex;
    expect(actualBorder).to.be.equal(expectedBorder);
  });
});

describe('Register Page - Cell Phone Number input field when user enters first symbol - Design', () => {
  before(() => {
    browser.url(url.register);
    $(inputFieldPhone).setValue(firstSymbol);
    browser.pause(400);
  });

  it('should check font-color', () => {
    const actualFontColor = $(inputFieldPhone).getCSSProperty('color').parsed.hex;
    expect(actualFontColor).to.be.equal(expectedFontColor);
  });

  it('should check focus border-color', () => {
    const actualFocusBorderColor = $(inputFieldPhone).getCSSProperty('border-color').parsed.hex;
    expect(actualFocusBorderColor).to.be.equal(expectedFocusBorderColor);
  });

  it('should check focus highlight color', () => {
    const actualFocusHighlightColor = $(inputFieldPhone).getCSSProperty('box-shadow').parsed.hex;
    expect(actualFocusHighlightColor).to.be.equal(expectedFocusHighlightColor);
  });

  it('should check background-color', () => {
    const actualBackgroundColor = $(inputFieldPhone).getCSSProperty('background-color').parsed.hex;
    expect(actualBackgroundColor).to.be.equal(expectedBackgroundColor);
  });

  it('should check text-alignment', () => {
    const actualTextAlign = $(inputFieldPhone).getCSSProperty('text-align').value;
    expect(actualTextAlign).to.be.equal(expectedTextAlign);
  });

  it('should check font-family', () => {
    const actualfontFamily = $(inputFieldPhone).getCSSProperty('font-family').parsed.string;
    expect(actualfontFamily).to.be.equal(expectedFontFamily);
  });

  it('should check font-weight', () => {
    const actualWeightObj = $(inputFieldPhone).getCSSProperty('font-weight');
    const actualWeight = Object.values(actualWeightObj)[1];
    expect(actualWeight).to.be.equal(expectedWeight);
  });
});

describe('Register Page - Cell Phone Number input field when the number is validated - Design', () => {
  it('should check border-color', () => {
    browser.url(url.register);
    $(inputFieldPhone).setValue(user.admin.phone);
    browser.keys('Tab');
    browser.pause(300);
    const actualBorderColorValid = $(inputFieldPhone).getCSSProperty('border-color').parsed.hex;
    expect(actualBorderColorValid).to.be.equal(expectedBorderColorValid);
  });
});

describe('Register Page - Cell phone number Label - Design', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should check that the label is displayed.', () => {
    expect($(label).isDisplayed()).to.be.true;
  });

  it('should check font-family', () => {
    const actualLabelfontFamily = $(label).getCSSProperty('font-family').parsed.string;
    expect(actualLabelfontFamily).to.be.equal(expectedFontFamily);
  });

  it('should check font-size', () => {
    const labelSizeObj = $(label).getCSSProperty('font-size').value;
    expect(labelSizeObj).to.be.equal(expectedLabelSize);
  });

  it('should check font-color', () => {
    const actualLabelColor = $(label).getCSSProperty('color').parsed.hex;
    expect(actualLabelColor).to.be.equal(expectLabelColor);
  });

  it('should check font-weight', () => {
    const actualLabelWeight = $(label).getCSSProperty('font-weight').value;
    expect(actualLabelWeight).to.be.equal(expectedWeight);
  });

  it('should check text-alignment', () => {
    const actualLabelAlign = $(label).getCSSProperty('text-align').value;
    expect(actualLabelAlign).to.be.equal(expectedAlign);
  });
});

describe('Register Page - Cell phone number description text - Design', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should check that the text is displayed', () => {
    expect($(descText).isDisplayed()).to.be.true;
  });

  it('should check that the text is “Format +17770005511 or +380653332244”', () => {
    const actualDescText = $(descText).getText();
    expect(actualDescText).to.be.equal(expectedDescText);
  });

  it('should check font-family', () => {
    const actualDescTextFontFamily = $(descText).getCSSProperty('font-family').parsed.string;
    expect(actualDescTextFontFamily).to.be.equal(expectedFontFamily);
  });

  it('should check font-size', () => {
    const actualDescTextSize = $(descText).getCSSProperty('font-size').value;
    expect(actualDescTextSize).to.be.equal(expectedDescTextSize);
  });

  it('should check font-color', () => {
    const actualDescTextColor = $(descText).getCSSProperty('color').parsed.hex;
    const expectedDescTextColor = '#6c757d';
    expect(actualDescTextColor).to.be.equal(expectedDescTextColor);
  });

  it('should check font-weight', () => {
    const actualDescTextWeight = $(descText).getCSSProperty('font-weight').value;
    expect(actualDescTextWeight).to.be.equal(expectedWeight);
  });

  it('should check text-alignment', () => {
    const actualDescTextAlign = $(descText).getCSSProperty('text-align').value;
    expect(actualDescTextAlign).to.be.equal(expectedAlign);
  });
});
