import { expect } from 'chai';
const { url } = require('../examples/constants');
const siteName = '//span[@id="site-name"]';
const navBar = '//div[@id="user-section"]';
const loginButton = '//a[contains(text(),"Login")]';
const registerButton = '//a[contains(text(),"Register")]';

describe('Home page - Design - Header', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('verify that application has global header', () => {
    const selector = '//div[@id="main-bar"]';
    const globalHeader = $(selector).isDisplayed();

    expect(globalHeader).to.be.true;
  });

  it('verify that application name is displayed', function() {
    const siteNameIsDisplayed = $(siteName).isDisplayed();
    expect(siteNameIsDisplayed).to.be.true;
  });

  it('verify that application name is "Progress Monitor"', () => {
    const siteNameActual = $(siteName).getText();
    const expectedSiteName = 'Progress Monitor';
    expect(siteNameActual).to.equal(expectedSiteName);
  });

  it('verify that application name is left-aligned', () => {
    const actualAlignment = $(siteName).getCSSProperty('text-align').parsed.string;
    const expectAlignment = 'left';
    expect(actualAlignment).to.equal(expectAlignment);
  });

  it('application name should have correct font-size', () => {
    const actualSize = $(siteName).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '20px';
    expect(actualSize).to.equal(expectFontSize);
  });

  it('application name should have correct color', () => {
    const actualColor = $(siteName).getCSSProperty('color').parsed.hex;
    const expectColor = '#000000';
    expect(actualColor).to.equal(expectColor);
  });

  it('application name should have correct font-weight', () => {
    const actualWeight = $(siteName).getCSSProperty('font-weight').parsed.string;
    const expectFontWeight = '500';
    expect(actualWeight).to.equal(expectFontWeight);
  });

  it('application name should have correct font-family ', function() {
    const font = $(siteName).getCSSProperty('font-family').parsed.string;
    expect(font).to.equal(
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
    );
  });

  it('verify that navigation-bar is displayed', function() {
    const navigationBarIsDisplayed = $(navBar).isDisplayed();
    expect(navigationBarIsDisplayed).to.be.true;
  });

  it('verify that navigation-bar has correct alignment', function() {
    const navigationBarAlignment = $(navBar).getCSSProperty('align-items').parsed.string;
    const expectAlign = 'center';
    expect(navigationBarAlignment).to.equal(expectAlign);
  });

  it('verify that navigation bar contains Login button', () => {
    const actual = $(loginButton).getText();
    const expected = 'Login';
    expect(actual).to.equal(expected);
  });

  it('verify that Login button has correct text-color', () => {
    const actualColor = $(loginButton).getCSSProperty('color').parsed.hex;
    const expectColor = '#333333';
    expect(actualColor).to.equal(expectColor);
  });

  it('verify that Login button has correct background-color', () => {
    const actualColor = $(loginButton).getCSSProperty('background-color').parsed.hex;
    const expectColor = '#000000';
    expect(actualColor).to.equal(expectColor);
  });

  it('verify that Login button has font-size 17px', () => {
    const actualSize = $(loginButton).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '17px';
    expect(actualSize).to.equal(expectFontSize);
  });

  it('verify that Login button has font-weight 400', () => {
    const actualWeight = $(loginButton).getCSSProperty('font-weight').parsed.string;
    const expectFontWeight = '400';
    expect(actualWeight).to.equal(expectFontWeight);
  });

  it('verify that text-align of Login button is left', () => {
    const actualAlignment = $(loginButton).getCSSProperty('text-align').parsed.string;
    const expectAlignment = 'left';
    expect(actualAlignment).to.equal(expectAlignment);
  });

  it('verify that Login button has correct font-family', () => {
    const font = $(loginButton).getCSSProperty('font-family').parsed.string;
    expect(font).to.equal(
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
    );
  });

  it('verify that navigation bar has Register button', () => {
    const actual = $(registerButton).getText();
    const expected = 'Register';
    expect(actual).to.equal(expected);
  });

  it('verify that Register button has correct text-color', () => {
    const actualColor = $(registerButton)
      .getCSSProperty('color')
      .parsed.hex.toLowerCase();
    const expectColor = '#0052cc';
    expect(actualColor).to.equal(expectColor);
  });

  it('verify that Register button has correct background-color', () => {
    const actualColor = $(registerButton).getCSSProperty('background-color').parsed.hex;
    const expectColor = '#000000';
    expect(actualColor).to.equal(expectColor);
  });

  it('verify that Register button has font-size 17px', () => {
    const actualSize = $(registerButton).getCSSProperty('font-size').parsed.string;
    const expectFontSize = '17px';
    expect(actualSize).to.equal(expectFontSize);
  });

  it('verify that Register button has font-weight 400', () => {
    const actualWeight = $(registerButton).getCSSProperty('font-weight').parsed.string;
    const expectFontWeight = '400';
    expect(actualWeight).to.equal(expectFontWeight);
  });

  it('verify that text-align of Register button is center', () => {
    const actualAlignment = $(registerButton).getCSSProperty('text-align').parsed.string;
    const expectAlignment = 'center';
    expect(actualAlignment).to.equal(expectAlignment);
  });

  it('verify that Register button has correct font-family', () => {
    const font = $(registerButton).getCSSProperty('font-family').parsed.string;
    expect(font).to.equal(
      '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
    );
  });

  it('verify that Register button has correct border-color', () => {
    const borderColor = $(registerButton)
      .getCSSProperty('border-color')
      .parsed.hex.toLowerCase();
    expect(borderColor).to.equal('#0052cc');
  });
});
