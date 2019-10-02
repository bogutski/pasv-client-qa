const expect = require('chai').expect;
import { url } from '../../constants';

describe('User - Login - Design', () => {
  before(() => {
    browser.url(url.login);
  });

  it('Should validate h1 is displayed', () => {
    const element = $('//h1');
    const actual = element.isDisplayed();
    expect(actual).to.be.true;
  });

  it('should validate that h1 has correct color', () => {
    const element = $('//h1');
    const actualColor = element.getCSSProperty('color').parsed.hex;
    const expectedColor = '#333333';
    expect(actualColor).to.be.eq(expectedColor);
  });

  it('should validate that font size is correct ', () => {
    const element = $('//h1');
    const actual = element.getCSSProperty('font-weight').parsed.string;
    const expected = '500';
    expect(actual).to.be.eq(expected);
  });
});
