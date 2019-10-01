import { expect } from 'chai';
import { url } from '../examples/constants';

describe('Home page - Design - Header', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('verify that application has global header', () => {
    const selector = '//div[@id="main-bar"]';
    const globalHeader = $(selector).isDisplayed();

    expect(globalHeader).to.be.true;
  });

  /*it('verify that application has global header', () => {
    const selector = '//div[@id="main-bar"]';
    const globalHeader = $(selector).isDisplayed();

    expect(globalHeader).to.be.true;
  });
*/
});
