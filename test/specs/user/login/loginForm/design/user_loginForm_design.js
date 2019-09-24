const { expect } = require('chai');
const { url } = require('../../../../../constants');

const elements = {
  h1: {
    selector: '//h1',
    color: '#333333',
  },
};

describe('User --- Login Form --- Design', () => {
  before(() => {
    browser.url(url.loginUrl);
  });

  it('should validate h1 is displayed', () => {
    const element = $(elements.h1.selector);
    const isDisplayed = element.isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should validate h1 has a correct color', () => {
    const element = $(elements.h1.selector);
    const actualColor = element.getCSSProperty('color').parsed.hex;
    const expectedColor = elements.h1.color;

    expect(actualColor).to.be.eq(expectedColor);
  });

  it('should have correct color for empty email field', () => {
    const element = $('//input[@name="email"]');
    const actualBorderColor = element.getCSSProperty('border-color').parsed.hex.toLowerCase();
    const expectedBorderColor = '#ced4da';
    expect(actualBorderColor).to.eq(expectedBorderColor);
  });

  it('should have correct color for correct email field', () => {
    const element = $('//input[@name="email"]');
    element.setValue('qwe@asd.asd');
    browser.keys('Tab');
    browser.pause(300);

    const actualBorderColor = element.getCSSProperty('border-color').parsed.hex.toLowerCase();
    console.log(actualBorderColor);

    const expectedBorderColor = '#24c88b';
    expect(actualBorderColor).to.eq(expectedBorderColor);
  });

  it('should have correct color for incorrect email field', () => {
    const element = $('//input[@name="email"]');
    element.setValue('qw......easd.asd');
    browser.keys('Tab');
    browser.pause(300);

    const actualBorderColor = element.getCSSProperty('border-color').parsed.hex.toLowerCase();
    console.log(actualBorderColor);

    const expectedBorderColor = '#ff4465';
    expect(actualBorderColor).to.eq(expectedBorderColor);
    browser.pause(5000);
  });
});
