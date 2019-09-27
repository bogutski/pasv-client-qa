import { assert } from 'chai';
import { url } from '../examples/constants';

const inputFieldPhone = '//input[@name="phone"]';

describe('Cell Phone Number input field', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check that “Cell phone number” input field is displayed', () => {
    const actualInputFieldPhone = $(inputFieldPhone).isDisplayed();
    assert.isTrue(actualInputFieldPhone);
  });

  it('should check border-color of "Cell phone number" input field ', () => {
    const actualBorder = $(inputFieldPhone).getCSSProperty('border-top-color').parsed.hex;
    const expectedBorder = '#ced4da';
    assert.equal(actualBorder, expectedBorder);
  });

  it('should check font-color of "Cell phone number" input field when user enters first symbol', () => {
    $(inputFieldPhone).setValue('+');
    const actualFontColor = $(inputFieldPhone).getCSSProperty('color').parsed.hex;
    const expectedFontColor = '#495057';
    assert.equal(actualFontColor, expectedFontColor);
  });

  it('should check focus border-color of "Cell phone number" input field', () => {
    const actualFocusBorderColor = $(inputFieldPhone).getCSSProperty('border-color').parsed.hex;
    const expectedFocusBorderColor = '#4d94ff';
    assert.equal(actualFocusBorderColor, expectedFocusBorderColor);
  });

  it('should check focus highlight color of "Cell phone number', () => {
    const actualFocusHighlightColor = $(inputFieldPhone).getCSSProperty('box-shadow').parsed.hex;
    const expectedFocusHighlightColor = '#0052cc';
    assert.equal(actualFocusHighlightColor, expectedFocusHighlightColor);
  });
  it('should check background-color of "Cell phone number" input field when user enters first symbol', () => {
    const actualBackgroundColor = $(inputFieldPhone).getCSSProperty('background-color').parsed.hex;
    const expectedBackgroundColor = '#ffffff';
    assert.equal(actualBackgroundColor, expectedBackgroundColor);
  });

  it('should check text-align of "Cell phone number" input field when user enters first symbol', () => {
    const actualTextAlign = $(inputFieldPhone).getCSSProperty('text-align').value;
    const expectedTextAlign = 'start';
    assert.equal(actualTextAlign, expectedTextAlign);
  });

  it('should check font-family of "Cell phone number" input field when user enters first symbol.', () => {
    const actualfontFamily = $(inputFieldPhone).getCSSProperty('font-family').parsed.string;
    const expectedfontFamily =
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
    assert.equal(actualfontFamily, expectedfontFamily);
  });

  it('should check font-weight of "Cell phone number" input field when user enters first symbol.', () => {
    const actualWeightObj = $(inputFieldPhone).getCSSProperty('font-weight');
    const actualWeight = Object.values(actualWeightObj)[1];
    const expectedweight = 400;
    assert.equal(actualWeight, expectedweight);
  });
});

describe('Cell Phone Number input field when the number is validated', () => {
  it('should check border-color of "Cell phone number" input field when the number is validated.', () => {
    browser.url(url.registerUrl);
    $(inputFieldPhone).setValue('+17008009000');
    browser.keys('Tab');
    browser.pause(300);
    const actualBorderColorValid = $(inputFieldPhone).getCSSProperty('border-color').parsed.hex;
    const expectedBorderColorValid = '#24c88b';
    assert.equal(actualBorderColorValid, expectedBorderColorValid);
  });
});

describe('Cell phone number Label', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check that label “Cell phone number”  is displayed.', () => {
    const actualLabel = $('//label[@for="phone"]').isDisplayed();
    assert.isTrue(actualLabel);
  });

  it('should check label "Cell phone number" font-family.', () => {
    const actualLabelfontFamily = $('//label[@for="phone"]').getCSSProperty('font-family').parsed
      .string;
    const expectedLabelfontFamily =
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
    assert.equal(actualLabelfontFamily, expectedLabelfontFamily);
  });

  it('should check label "Cell phone number" font-size', () => {
    const labelSizeObj = $('//label[@for="phone"]').getCSSProperty('font-size').value;
    const expectedLabelSize = '17px';
    assert.equal(labelSizeObj, expectedLabelSize);
  });

  it('should check label "Cell phone number" font-color', () => {
    const actualLabelColor = $('//label[@for="phone"]').getCSSProperty('color').parsed.hex;
    const expectLabelColor = '#212529';
    assert.equal(actualLabelColor, expectLabelColor);
  });

  it('should check label "Cell phone number" font-weight', () => {
    const actualLabelWeight = $('//label[@for="phone"]').getCSSProperty('font-weight').value;
    const expectLabelWeight = 400;
    assert.equal(actualLabelWeight, expectLabelWeight);
  });

  it('should check label "Cell phone number" text-align', () => {
    const actualLabelAlign = $('//label[@for="phone"]').getCSSProperty('text-align').value;
    const expectLabelAlign = 'left';
    assert.equal(actualLabelAlign, expectLabelAlign);
  });
});

describe('Cell phone number description text', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should check that label “Cell phone number”  is displayed.', () => {
    const actualDescText = $('//input[@name="phone"]/following-sibling::small').isDisplayed();
    assert.isTrue(actualDescText);
  });

  it('should check that description text is “Format +17770005511 or +380653332244”', () => {
    const actualDescText = $('//input[@name="phone"]/following-sibling::small').getText();
    const expectedDescText = 'Format +17770005511 or +380653332244';
    assert.equal(actualDescText, expectedDescText);
  });

  it('should check description text font-family', () => {
    const actualDescTextFontFamily = $(
      '//input[@name="phone"]/following-sibling::small',
    ).getCSSProperty('font-family').parsed.string;
    const expectedDescTextFontFamily =
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
    assert.equal(actualDescTextFontFamily, expectedDescTextFontFamily);
  });

  it('should check description text font-size', () => {
    const actualDescTextSize = $('//input[@name="phone"]/following-sibling::small').getCSSProperty(
      'font-size',
    ).value;
    const expectedDescTextSize = '13.6px';
    assert.equal(actualDescTextSize, expectedDescTextSize);
  });

  it('should check description text font-color', () => {
    const actualDescTextColor = $('//input[@name="phone"]/following-sibling::small').getCSSProperty(
      'color',
    ).parsed.hex;
    const expectedDescTextColor = '#6c757d';
    assert.equal(actualDescTextColor, expectedDescTextColor);
  });

  it('should check description text font-weight', () => {
    const actualDescTextWeight = $(
      '//input[@name="phone"]/following-sibling::small',
    ).getCSSProperty('font-weight').value;
    const expectedDescTextWeight = 400;
    assert.equal(actualDescTextWeight, expectedDescTextWeight);
  });

  it('should check description text text-align', () => {
    const actualDescTextAlign = $('//input[@name="phone"]/following-sibling::small').getCSSProperty(
      'text-align',
    ).value;
    const expectedDescTextAlign = 'left';
    assert.equal(actualDescTextAlign, expectedDescTextAlign);
  });
});
