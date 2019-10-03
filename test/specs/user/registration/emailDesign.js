import { expect } from 'chai';
import { url } from '../../constants';

const pause = 500;

const data = {
  correctEmail: 'pasv' + new Date().getTime() + '@gmail.com',
  firstSymbol: 'p',
};

const exp = {
  emailInputBorderColor: '#ced4da',
  emailInputFocusBorderColor: '#4d94ff',
  emailInputFocusHighlightColor: '#0052cc',
  emailInputFontColor: '#495057',
  emailInputBackgroundColor: '#ffffff',
  emailInputTextAlign: 'start',
  emailInputFontFamily:
    '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
  emailInputFontWeight: 400,
  validatedEmailInputBorderColor: '#24c88b',
  validatedEmailInputFocusHighlightColor: '#24c88b',
  labelEmailFontFamily:
    '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
  labelEmailFontSize: '17px',
  labelEmailFontWeight: 400,
  labelEmailFontColor: '#212529',
  labelEmailTextAlign: 'left',
};

const sel = {
  emailInputField: '//input[@name="email"]',
  emailLabel: '//label[@for="email"]',
  emailText: '//input[@name="email"]/following-sibling::small',
  checkMark: '',
};

describe('User - Register Page - Email Input Field - Design', () => {
  before(() => {
    browser.url(url.register);
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

describe('User - Register Page - Email label - Design', () => {
  before(() => {
    browser.url(url.register);
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
