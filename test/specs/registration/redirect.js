import { expect } from 'chai';
import { url } from '../examples/constants';

const elements = {
  registerButton: {
    selector: '//div[@id="user-section"]/ul/li/a[text() = "Register"]',
  },
  registerForm: {
    title: 'User Register',
  },
};

describe('Redirect from Main page to Register page', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('when Register button is clicked on the Main page, user is redirected to the Register page', () => {
    const registerButton = $(elements.registerButton.selector);
    registerButton.click();
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it(`when Register button is clicked on the Main page, url changed to ${url.registerUrl}`, () => {
    const registerButton = $(elements.registerButton.selector);
    registerButton.click();
    const urlAfterClick = browser.getUrl();
    const expectedUrl = `${url.registerUrl}`;
    expect(urlAfterClick).eq(expectedUrl);
  });
});
