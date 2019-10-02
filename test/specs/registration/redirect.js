import { expect } from 'chai';
import { url } from '../examples/constants';

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

describe('Redirect from Main page to Register page', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('should verify that when Register button is clicked on the Main page, user is redirected to the Register page', () => {
    clickRegisterButton();
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it(`should verify that when Register button is clicked on the Main page, url changed to ${url.registerUrl}`, () => {
    clickRegisterButton();
    const urlAfterClick = browser.getUrl();
    const expectedUrl = `${url.registerUrl}`;
    expect(urlAfterClick).eq(expectedUrl);
  });

  it('should verify that after redirect to Register page Global Header is displayed', () => {
    clickRegisterButton();
    const globalHeaderIsDisplayed = $(elements.globalHeader.selector).isDisplayed();
    expect(globalHeaderIsDisplayed).to.be.true;
  });

  it('should verify that after redirect to Register page Global Footer is displayed', () => {
    clickRegisterButton();
    const globalFooterIsDisplayed = $(elements.globalFooter.selector).isDisplayed();
    expect(globalFooterIsDisplayed).to.be.true;
  });
});
