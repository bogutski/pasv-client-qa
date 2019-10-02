import { expect } from 'chai';
import { url } from './../constants';

const favicon = '//link[@href="/favicon.ico"]';
const globalHeader = '//div[@id="main-bar"]';
const header = '//h1';
const footer = '//footer[@class="pt-5 pb-5"]';
const images = '//img';
const textBlocks = '//p[@class="intro"]';

const expectedTitle = 'Progress Monitor';
const expectedH1 = 'System that considers\nindividual features of\neach student';
const expectedImgCount = 7;
const expectedBlockCount = 7;

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
    expect(h1Actual).to.equal(expectedH1);
  });

  it('should verify that home page contains correct number of images', () => {
    const actualImgCount = $$(images).length;
    expect(actualImgCount).to.equal(expectedImgCount);
  });

  it('should verify that home page contains correct number of text blocks', () => {
    const actualBlockCount = $$(textBlocks).length;
    expect(actualBlockCount).to.equal(expectedBlockCount);
  });

  it('should verify that home page has global footer', () => {
    const footerIsDisplayed = $(footer).isDisplayed();
    expect(footerIsDisplayed).to.be.true;
  });
});
