import { expect } from 'chai';
import { url } from './../../constants';

const header = '//h1';
const headerH1 = 'User Register';
const expectedFontFamily =
  '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif';
const expectedFontWeight = '500';
const expectedFontSize = '35.7499px';
const expectedColor = '#333333';
const expectedAlign = 'left';

describe('User Register - text `User Register` - design', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should verify that header is displayed above the registration form', () => {
    expect($(header).isDisplayed()).to.be.true;
  });

  it('should verify that header is correct', () => {
    expect($(header).getText()).to.equal(headerH1);
  });

  it('should verify that text `User Register` is left-aligned', () => {
    const actualAlign = $(header).getCSSProperty('text-align').parsed.string;
    expect(actualAlign).to.equal(expectedAlign);
  });

  it('should verify that text `User Register` has correct color', () => {
    const actualColor = $(header).getCSSProperty('color').parsed.hex;
    expect(actualColor).to.equal(expectedColor);
  });

  it('should verify that text `User Register` has correct font-size', () => {
    const actualFontSize = $(header).getCSSProperty('font-size').parsed.string;
    expect(actualFontSize).to.equal(expectedFontSize);
  });

  it('should verify that text `User Register` has correct font-weight', () => {
    const actualFontWeight = $(header).getCSSProperty('font-weight').parsed.string;
    expect(actualFontWeight).to.equal(expectedFontWeight);
  });

  it('should verify that text `User Register` has correct font-family ', function() {
    const actualFontFamily = $(header).getCSSProperty('font-family').parsed.string;
    expect(actualFontFamily).to.equal(expectedFontFamily);
  });
});
