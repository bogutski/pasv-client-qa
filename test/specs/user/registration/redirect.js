import { expect } from 'chai';
import { url } from '../../constants';

const elements = {
  registerButton: {
    selector: '//div[@id="user-section"]/ul/li/a[text() = "Register"]',
  },
  registerForm: {
    title: 'User Register',
  },
  globalHeader: {
    selector: '//div[@id="main-bar"]',
  },
  globalFooter: {
    selector: '//footer[@class="pt-5 pb-5"]',
  },
};

const clickRegisterButton = () => {
  return $(elements.registerButton.selector).click();
};

describe('User - Registration - Redirect (from Main page)', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('should verify when Register button is clicked, user is redirected to the Register page', () => {
    clickRegisterButton();
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it(`should verify when Register button is clicked, url changed to ${url.register}`, () => {
    clickRegisterButton();
    const urlAfterClick = browser.getUrl();
    const expectedUrl = `${url.register}`;
    expect(urlAfterClick).eq(expectedUrl);
  });

  it('should verify after redirect Global Header is displayed', () => {
    clickRegisterButton();
    const globalHeaderIsDisplayed = $(elements.globalHeader.selector).isDisplayed();
    expect(globalHeaderIsDisplayed).to.be.true;
  });

  it('should verify after redirect Global Footer is displayed', () => {
    clickRegisterButton();
    const globalFooterIsDisplayed = $(elements.globalFooter.selector).isDisplayed();
    expect(globalFooterIsDisplayed).to.be.true;
  });
});

describe('User - Registration - Redirect (from Login page)', () => {
  before(() => {
    browser.url(url.login);
  });

  it('should verify when Register button is clicked, user is redirected to the Register page', () => {
    clickRegisterButton();
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it(`should verify when Register button is clicked, url changed to ${url.register}`, () => {
    clickRegisterButton();
    const urlAfterClick = browser.getUrl();
    const expectedUrl = `${url.register}`;
    expect(urlAfterClick).eq(expectedUrl);
  });

  it('should verify after redirect Global Header is displayed', () => {
    clickRegisterButton();
    const globalHeaderIsDisplayed = $(elements.globalHeader.selector).isDisplayed();
    expect(globalHeaderIsDisplayed).to.be.true;
  });

  it('should verify after redirect Global Footer is displayed', () => {
    clickRegisterButton();
    const globalFooterIsDisplayed = $(elements.globalFooter.selector).isDisplayed();
    expect(globalFooterIsDisplayed).to.be.true;
  });
});
