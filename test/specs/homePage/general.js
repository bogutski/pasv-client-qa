import { expect } from 'chai';
import { url } from '../examples/constants';

const favicon = '//link[@href="/favicon.ico"]';
const globalHeader = '//div[@id="main-bar"]';
const header = '//h1';
const footer = '//footer[@class="pt-5 pb-5"]';

describe('Home page - General - Design', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('should verify URL', () => {
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.baseUrl + '/');
  });

  it('should verify that favicon.ico is existing', () => {
    const faviconIsDisplayed = $(favicon).isExisting();
    expect(faviconIsDisplayed).to.be.true;
  });

  it('should verify that home page has correct title', () => {
    const actualTitle = browser.getTitle();
    const expectedTitle = 'Progress Monitor';
    expect(actualTitle).to.equal(expectedTitle);
  });

  it('should verify that home page has Global header', () => {
    const actualGlobalHeader = $(globalHeader).isDisplayed();
    expect(actualGlobalHeader).to.be.true;
  });

  it('should verify that Global header contains application name', () => {
    const textOfGlobalHeader = $(globalHeader)
      .getText()
      .includes('Progress Monitor');
    expect(textOfGlobalHeader).to.be.true;
  });

  it('should verify that home page contains correct h1', () => {
    const h1Actual = $(header).getText();
    const h1Expected = 'System that considers\nindividual features of\neach student';
    expect(h1Actual).equal(h1Expected);
  });

  it('should verify that home page contains 7 images', () => {
    const actualImgCount = $$('//img').length;
    const expectedImgCount = 7;
    expect(actualImgCount).to.equal(expectedImgCount);
  });

  it('should verify that home page contains 7 text blocks', () => {
    const actualBlockCount = $$('//p[@class="intro"]').length;
    const expectedBlockCount = 7;
    expect(actualBlockCount).to.equal(expectedBlockCount);
  });

  it('should verify that home page has global footer', () => {
    const footerIsDisplayed = $(footer).isDisplayed();
    expect(footerIsDisplayed).to.be.true;
  });
});
