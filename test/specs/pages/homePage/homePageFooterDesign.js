import { expect } from 'chai';
import { url, app } from '../../constants';

const footer = '//footer[@class="pt-5 pb-5"]';
const version = '//span[@class="badge badge-light"]';
const secondLine = '//small[@class="d-block mb-3 text-muted"]';

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
    const hasVersion = textOfFooter.includes('Version');
    expect(hasVersion).to.be.true;
  });

  it('should  verify that current version is displayed', () => {
    const actualVersionLength = $(version).getText().length;
    expect(actualVersionLength > 4 && actualVersionLength < 13).to.be.true;
  });

  it('should verify that `copyright sign ©` is in the text', () => {
    const textOfFooter = $(footer).getText();
    expect(textOfFooter).to.include('©');
  });

  it('should verify that current year is in the footer text', () => {
    const currentYear = new Date().getFullYear().toString();
    const textOfFooter = $(footer).getText();
    const currentYearIsIncluded = textOfFooter.includes(currentYear);
    expect(currentYearIsIncluded).to.be.true;
  });

  it('should verify that text in the second line of footer is correct', () => {
    const textOfFooter = $(footer).getText();
    expect(textOfFooter).to.include(app.slogan);
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
    const actualFontSize = $(footer).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '17px';
    expect(actualFontSize).to.equal(expectFontSize);
  });

  it('should verify that number of version in fist line of footer has correct font-size', () => {
    const actualFontSize = $(version).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '12.75px';
    expect(actualFontSize).to.equal(expectFontSize);
  });

  it('should verify that second line of footer has correct font-size', () => {
    const actualFontSize = $(secondLine).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '13.6px';
    expect(actualFontSize).to.equal(expectFontSize);
  });

  it('should verify that text in footer has correct font-weight', () => {
    const actualFontWeight = $(footer).getCSSProperty('font-weight').parsed.string;
    const expectFontWeight = '400';
    expect(actualFontWeight).to.equal(expectFontWeight);
  });

  it('should verify that text in footer has correct font-family ', () => {
    const actualFontFamily = $(footer).getCSSProperty('font-family').parsed.string;
    expect(actualFontFamily).to.equal(
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
    );
  });
});
