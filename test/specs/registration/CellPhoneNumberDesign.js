import { expect } from 'chai';
import { url } from '../examples/constants';
import { user } from '../examples/user/constants';

const inputFieldPhone = '//input[@name="phone"]';
const firstSymbol = '+';

describe('Register Page - Cell Phone Number input field - Design', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check that the input field is displayed', () => {
    const actualInputFieldPhone = $(inputFieldPhone).isDisplayed();
    expect(actualInputFieldPhone).to.be.true;
  });

  it('should check border-color', () => {
    const actualBorder = $(inputFieldPhone).getCSSProperty('border-top-color').parsed.hex;
    const expectedBorder = '#ced4da';
    expect(actualBorder).to.be.equal(expectedBorder);
  });
});

describe('Register Page - Cell Phone Number input field when user enters first symbol - Design', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check font-color', () => {
    $(inputFieldPhone).setValue(firstSymbol);
    const actualFontColor = $(inputFieldPhone).getCSSProperty('color').parsed.hex;
    const expectedFontColor = '#495057';
    expect(actualFontColor).to.be.equal(expectedFontColor);
  });

  it('should check focus border-color', () => {
    const actualFocusBorderColor = $(inputFieldPhone).getCSSProperty('border-color').parsed.hex;
    const expectedFocusBorderColor = '#4d94ff';
    expect(actualFocusBorderColor).to.be.equal(expectedFocusBorderColor);
  });

  it('should check focus highlight color', () => {
    const actualFocusHighlightColor = $(inputFieldPhone).getCSSProperty('box-shadow').parsed.hex;
    const expectedFocusHighlightColor = '#0052cc';
    expect(actualFocusHighlightColor).to.be.equal(expectedFocusHighlightColor);
  });

  it('should check background-color', () => {
    const actualBackgroundColor = $(inputFieldPhone).getCSSProperty('background-color').parsed.hex;
    const expectedBackgroundColor = '#ffffff';
    expect(actualBackgroundColor).to.be.equal(expectedBackgroundColor);
  });

  it('should check text-alignment', () => {
    const actualTextAlign = $(inputFieldPhone).getCSSProperty('text-align').value;
    const expectedTextAlign = 'start';
    expect(actualTextAlign).to.be.equal(expectedTextAlign);
  });

  it('should check font-family', () => {
    const actualfontFamily = $(inputFieldPhone).getCSSProperty('font-family').parsed.string;
    const expectedfontFamily =
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
    expect(actualfontFamily).to.be.equal(expectedfontFamily);
  });

  it('should check font-weight', () => {
    const actualWeightObj = $(inputFieldPhone).getCSSProperty('font-weight');
    const actualWeight = Object.values(actualWeightObj)[1];
    const expectedweight = 400;
    expect(actualWeight).to.be.equal(expectedweight);
  });
});

describe('Register Page - Cell Phone Number input field when the number is validated - Design', () => {
  it('should check border-color', () => {
    browser.url(url.registerUrl);
    $(inputFieldPhone).setValue(user.admin.phone);
    browser.keys('Tab');
    browser.pause(300);
    const actualBorderColorValid = $(inputFieldPhone).getCSSProperty('border-color').parsed.hex;
    const expectedBorderColorValid = '#24c88b';
    expect(actualBorderColorValid).to.be.equal(expectedBorderColorValid);
  });
});

describe('Register Page - Cell phone number Label - Design', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check that the label is displayed.', () => {
    const actualLabel = $('//label[@for="phone"]').isDisplayed();
    expect(actualLabel).to.be.true;
  });

  it('should check font-family', () => {
    const actualLabelfontFamily = $('//label[@for="phone"]').getCSSProperty('font-family').parsed
      .string;
    const expectedLabelfontFamily =
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
    expect(actualLabelfontFamily).to.be.equal(expectedLabelfontFamily);
  });

  it('should check font-size', () => {
    const labelSizeObj = $('//label[@for="phone"]').getCSSProperty('font-size').value;
    const expectedLabelSize = '17px';
    expect(labelSizeObj).to.be.equal(expectedLabelSize);
  });

  it('should check font-color', () => {
    const actualLabelColor = $('//label[@for="phone"]').getCSSProperty('color').parsed.hex;
    const expectLabelColor = '#212529';
    expect(actualLabelColor).to.be.equal(expectLabelColor);
  });

  it('should check font-weight', () => {
    const actualLabelWeight = $('//label[@for="phone"]').getCSSProperty('font-weight').value;
    const expectLabelWeight = 400;
    expect(actualLabelWeight).to.be.equal(expectLabelWeight);
  });

  it('should check text-alignment', () => {
    const actualLabelAlign = $('//label[@for="phone"]').getCSSProperty('text-align').value;
    const expectLabelAlign = 'left';
    expect(actualLabelAlign).to.be.equal(expectLabelAlign);
  });
});

describe('Register Page - Cell phone number description text - Design', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check that the text is displayed', () => {
    const actualDescText = $('//input[@name="phone"]/following-sibling::small').isDisplayed();
    expect(actualDescText).to.be.true;
  });

  it('should check that the text is “Format +17770005511 or +380653332244”', () => {
    const actualDescText = $('//input[@name="phone"]/following-sibling::small').getText();
    const expectedDescText = 'Format +17770005511 or +380653332244';
    expect(actualDescText).to.be.equal(expectedDescText);
  });

  it('should check font-family', () => {
    const actualDescTextFontFamily = $(
      '//input[@name="phone"]/following-sibling::small',
    ).getCSSProperty('font-family').parsed.string;
    const expectedDescTextFontFamily =
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
    expect(actualDescTextFontFamily).to.be.equal(expectedDescTextFontFamily);
  });

  it('should check font-size', () => {
    const actualDescTextSize = $('//input[@name="phone"]/following-sibling::small').getCSSProperty(
      'font-size',
    ).value;
    const expectedDescTextSize = '13.6px';
    expect(actualDescTextSize).to.be.equal(expectedDescTextSize);
  });

  it('should check font-color', () => {
    const actualDescTextColor = $('//input[@name="phone"]/following-sibling::small').getCSSProperty(
      'color',
    ).parsed.hex;
    const expectedDescTextColor = '#6c757d';
    expect(actualDescTextColor).to.be.equal(expectedDescTextColor);
  });

  it('should check font-weight', () => {
    const actualDescTextWeight = $(
      '//input[@name="phone"]/following-sibling::small',
    ).getCSSProperty('font-weight').value;
    const expectedDescTextWeight = 400;
    expect(actualDescTextWeight).to.be.equal(expectedDescTextWeight);
  });

  it('should check text-alignment', () => {
    const actualDescTextAlign = $('//input[@name="phone"]/following-sibling::small').getCSSProperty(
      'text-align',
    ).value;
    const expectedDescTextAlign = 'left';
    expect(actualDescTextAlign).to.be.equal(expectedDescTextAlign);
  });
});
