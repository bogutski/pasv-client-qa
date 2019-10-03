import { expect } from 'chai';
import { url } from '../../constants';

const el = {
  sel: {
    inputFieldPassword: '//input[@name="password"]',
    inputEmailField: '//input[@name="email"]',
  },
  data: {
    validLoginEmail: 'irina1568722016585@gmail.com',
    validLoginPass: 'IrinaWW0919',
    firstSymbol: 'F',
  },
  exp: {
    expectBorderColor: '#ced4da',
    expectFocusHighlight: 'rgba(0,82,204,0.25)0px0px0px3.2px',
    expectFontColor: '#495057',
    expectTextAlign: 'start',
    expectFontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
    expectBorderValid: '#24c88b',
    expectHighlightValid: 'rgba(36,200,139,0.25)0px0px0px3.2px',
    expectFocusBorderColor: '#4d94ff',
    expectBackgroundColor: '#ffffff',
    expectFontWeight: '400',
  },
};

describe('User - Login Page - Password - empty field - Design', () => {
  before(() => {
    browser.url(url.login);
  });

  it('should check that the input field is displayed', () => {
    const actualInputFieldPassword = $(el.sel.inputFieldPassword).isDisplayed();
    expect(actualInputFieldPassword).to.be.true;
  });

  it('should check border color', () => {
    const actualBorderColor = $(el.sel.inputFieldPassword).getCSSProperty('border-color').parsed
      .hex;
    expect(actualBorderColor).to.eq(el.exp.expectBorderColor);
  });
});

describe('Login Page - Password - put cursor - Design ', () => {
  it('should check Focus highlight', () => {
    $(el.sel.inputFieldPassword).click(); //can't cath highlight without click and pause
    browser.pause(500);
    const actualFocusHighlight = $(el.sel.inputFieldPassword).getCSSProperty('box-shadow').value;
    expect(actualFocusHighlight).to.eq(el.exp.expectFocusHighlight);
  });

  it('should check Focus border-color', () => {
    $(el.sel.inputEmailField).click();
    browser.pause(500);
    const actualFocusBorderColor = $(el.sel.inputEmailField).getCSSProperty('border-color').parsed
      .hex;
    expect(actualFocusBorderColor).to.eq(el.exp.expectFocusBorderColor);
  });
});

describe('Login Page - Password field - first symbol - Design', () => {
  it('should check Font-color', () => {
    $(el.sel.inputFieldPassword).setValue(el.data.firstSymbol);
    const actualFontColor = $(el.sel.inputFieldPassword).getCSSProperty('color').parsed.hex;
    expect(actualFontColor).to.eq(el.exp.expectFontColor);
  });

  it('should check Text-align', () => {
    $(el.sel.inputFieldPassword).setValue(el.data.firstSymbol);
    const actualTextAlign = $(el.sel.inputFieldPassword).getCSSProperty('text-align').value;
    expect(actualTextAlign).to.eq(el.exp.expectTextAlign);
  });

  it('should check Font-family', () => {
    $(el.sel.inputFieldPassword).setValue(el.data.firstSymbol);
    const actualFontFamily = $(el.sel.inputFieldPassword).getCSSProperty('font-family').value;
    const tempFontFamily = el.exp.expectFontFamily.toLowerCase();
    expect(tempFontFamily).to.include(actualFontFamily);
  });

  it('should check Background-color', () => {
    $(el.sel.inputEmailField).setValue(el.data.firstSymbol);
    const actualBackgroundColor = $(el.sel.inputEmailField).getCSSProperty('background-color')
      .parsed.hex;
    expect(actualBackgroundColor).to.eq(el.exp.expectBackgroundColor);
  });

  it('should check Font-weight', () => {
    $(el.sel.inputEmailField).setValue(el.data.firstSymbol);
    const actualFontWeight = $(el.sel.inputEmailField).getCSSProperty('font-weight').parsed.string;
    expect(actualFontWeight).to.eq(el.exp.expectFontWeight);
  });
});

describe('Login Page - Password - password is validated - Design', () => {
  it('should check Border-color', () => {
    $(el.sel.inputFieldPassword).setValue(el.data.validLoginPass);
    $(el.sel.inputEmailField).setValue(el.data.validLoginEmail);
    const actualBorderValid = $(el.sel.inputFieldPassword).getCSSProperty('border-color').parsed
      .hex;
    expect(actualBorderValid).to.eq(el.exp.expectBorderValid);
  });

  it('should check Focus highlight', () => {
    $(el.sel.inputFieldPassword).setValue(el.data.validLoginPass);
    $(el.sel.inputEmailField).setValue(el.data.validLoginEmail);
    $(el.sel.inputFieldPassword).click();
    browser.pause(500);
    const actualHighlightValid = $(el.sel.inputFieldPassword).getCSSProperty('box-shadow').parsed
      .rgba;
    expect(actualHighlightValid).to.eq(el.exp.expectHighlightValid);
  });
});
