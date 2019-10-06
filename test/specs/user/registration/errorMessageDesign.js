import { expect } from 'chai';
import registerAction from './../../../examples/user/actions/registerAction.js';

describe('User - Registration - ErrorMessage - Design', () => {

  before(() => {
    registerAction(browser);
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
