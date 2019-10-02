import { expect } from 'chai';
import sel from './selectors/registration';
import exp from './expected/registration';
import data from './data/registration';

const pause = 500;

describe('User - Register Page - Email Input Field - Design', () => {
  before(() => {
    browser.url(data.registerUrl);
  });

  it('should check email input field is displayed', () => {
    expect($(sel.emailInputField).isDisplayed()).to.be.true;
  });

  it('should check border color', () => {
    const actualBorderColor = $(sel.emailInputField).getCSSProperty('border-top-color').parsed.hex;
    expect(actualBorderColor).to.be.equal(exp.emailInputBorderColor);
  });

  it('should check focus border color', () => {
    $(sel.emailInputField).setValue(data.firstSymbol);
    browser.pause(pause);
    const actualBorderColor = $(sel.emailInputField).getCSSProperty('border-top-color').parsed.hex;
    expect(actualBorderColor).to.be.equal(exp.emailInputFocusBorderColor);
  });

  it('should check focus highlight color', () => {
    $(sel.emailInputField).click();
    browser.pause(pause);
    const actualHighlightColor = $(sel.emailInputField).getCSSProperty('box-shadow').parsed.hex;
    expect(actualHighlightColor).to.be.equal(exp.emailInputFocusHighlightColor);
  });

  it('should check font color', () => {
    $(sel.emailInputField).setValue(data.firstSymbol);
    const actualFontColor = $(sel.emailInputField).getCSSProperty('color').parsed.hex;
    expect(actualFontColor).to.be.equal(exp.emailInputFontColor);
  });

  it('should check background color', () => {
    const actualBackgroundColor = $(sel.emailInputField).getCSSProperty('background-color').parsed
      .hex;
    expect(actualBackgroundColor).to.be.equal(exp.emailInputBackgroundColor);
  });

  it('should check text-alignment', () => {
    const actualTextAlign = $(sel.emailInputField).getCSSProperty('text-align').value;
    expect(actualTextAlign).to.be.equal(exp.emailInputTextAlign);
  });

  it('should check font-family', () => {
    const actualfontFamily = $(sel.emailInputField).getCSSProperty('font-family').parsed.string;
    expect(actualfontFamily).to.be.equal(exp.emailInputFontFamily);
  });

  it('should check font-weight', () => {
    const actualWeight = $(sel.emailInputField).getCSSProperty('font-weight').value;
    expect(actualWeight).to.be.equal(exp.emailInputFontWeight);
  });

  it('should check validated border color', () => {
    $(sel.emailInputField).setValue(data.correctEmail);
    browser.pause(pause);
    const actualBorderColor = $(sel.emailInputField).getCSSProperty('border-top-color').parsed.hex;
    expect(actualBorderColor).to.be.equal(exp.validatedEmailInputBorderColor);
  });

  it('should check validated focus highlight color', () => {
    $(sel.emailInputField).setValue(data.correctEmail);
    browser.pause(pause);
    const actualHighlightColor = $(sel.emailInputField).getCSSProperty('box-shadow').parsed.hex;
    expect(actualHighlightColor).to.be.equal(exp.validatedEmailInputFocusHighlightColor);
  });
});

describe('Register Page--Email label--Design', () => {
  before(() => {
    browser.url(data.registerUrl);
  });

  it('should check label font-family', () => {
    const actualFontFamily = $(sel.emailLabel).getCSSProperty('font-family').parsed.string;
    expect(actualFontFamily).to.be.equal(exp.labelEmailFontFamily);
  });

  it('should check label font-size', () => {
    const actualFontSize = $(sel.emailLabel).getCSSProperty('font-size').parsed.string;
    expect(actualFontSize).to.be.equal(exp.labelEmailFontSize);
  });

  it('should check label font color', () => {
    const actualFontColor = $(sel.emailLabel).getCSSProperty('color').parsed.hex;
    expect(actualFontColor).to.eql(exp.labelEmailFontColor);
  });

  it('should check label font-weight', () => {
    const actualWeight = $(sel.emailLabel).getCSSProperty('font-weight').value;
    expect(actualWeight).to.be.equal(exp.labelEmailFontWeight);
  });

  it('should check label text-alignment', () => {
    const actualTextAlign = $(sel.emailLabel).getCSSProperty('text-align').value;
    expect(actualTextAlign).to.be.equal(exp.labelEmailTextAlign);
  });
});
