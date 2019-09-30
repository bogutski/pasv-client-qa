import { expect } from 'chai';
import { url } from './../examples/constants';

const footer = '//footer[@class="pt-5 pb-5"]';
const version = '//span[@class="badge badge-light"]';
const secondLine = '//small[@class="d-block mb-3 text-muted"]';

const currentYear = new Date().getFullYear();
const currentVersion = '0.1.74';
const secondLineText = 'eat(); sleep(); code(); repeat();';

describe('Home page - Footer - design', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('should check that footer is displayed', () => {
    const footerIsDisplayed = $(footer).isDisplayed();
    expect(footerIsDisplayed).to.be.true;
  });

  it('should verify that `Version` is displayed', () => {
    const textOfFooter = $(footer).getText();
    const version = textOfFooter.includes('Version');
    expect(version).to.be.true;
  });

  it('should  verify that current version is displayed', () => {
    const actualVersion = $(version).getText();
    expect(actualVersion).equal(currentVersion);
  });

  it('should verify that `copyright sign ©` is in the text', () => {
    const actualText = $(footer).getText();
    expect(actualText).to.include('©');
  });

  it('should verify that current year is in the footer text', () => {
    const text = $(footer).getText();
    const isIncludes = text.includes(currentYear);
    expect(isIncludes).to.be.true;
  });

  it('should verify that text in the second line of footer is correct', () => {
    const actualText = $(footer).getText();
    expect(actualText).to.include(secondLineText);
  });

  it('should verify that text in footer is left-aligned', () => {
    const actualAlign = $(footer).getCSSProperty('text-align').parsed.string;
    const expectAlign = 'left';
    expect(actualAlign).to.equal(expectAlign);
  });

  it('should verify that text in the footer has correct color', () => {
    const actualColor = $(footer).getCSSProperty('color').parsed.hex;
    const expectColor = '#212529';
    expect(actualColor).to.equal(expectColor);
  });

  it('should verify that word `Version` has correct font-size', () => {
    const actualSize = $(footer).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '17px';
    expect(actualSize).to.equal(expectFontSize);
  });

  it('should verify that number of version in fist line of footer has correct font-size', () => {
    const actualSize = $(version).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '12.75px';
    expect(actualSize).to.equal(expectFontSize);
  });

  it('should verify that second line of footer has correct font-size', () => {
    const actualSize = $(secondLine).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '13.6px';
    expect(actualSize).to.equal(expectFontSize);
  });

  it('should verify that text in footer has correct font-weight', () => {
    const actualWeight = $(footer).getCSSProperty('font-weight').parsed.string;
    const expectFontWeight = '400';
    expect(actualWeight).to.equal(expectFontWeight);
  });

  it('should verify that text in footer has correct font-family ', () => {
    const font = $(footer).getCSSProperty('font-family').parsed.string;
    expect(font).to.equal(
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
    );
  });
});
