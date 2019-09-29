import { expect } from 'chai';
import { url } from '../examples/constants';

describe('Home page - functionality', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('should verify that clicking to site name from Home Page gets redirected back to Home Page ', () => {
    const selector = '//span[@id="site-name"]';
    $(selector).click();
    const redirectUrl = browser.getUrl();
    const expected = url.baseUrl + '/';

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking on Login button from Home Page gets redirected to Login Page ', () => {
    const selector = '//div[@id="user-section"]//a[text()="Login"]';
    $(selector).click();
    const redirectUrl = browser.getUrl();
    const expected = url.loginUrl;

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking to site name from Login Page gets redirected back to Home Page ', () => {
    const selector = '//span[@id="site-name"]';
    $(selector).click();
    const redirectUrl = browser.getUrl();
    const expected = url.baseUrl + '/';

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking on Register button from Home Page gets redirected to Register Page ', () => {
    const selector = '//div[@id="user-section"]//a[text()="Register"]';
    $(selector).click();
    const redirectUrl = browser.getUrl();
    const expected = url.registerUrl;

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking to site name from Register Page gets redirected back to Home Page ', () => {
    const selector = '//span[@id="site-name"]';
    $(selector).click();
    const redirectUrl = browser.getUrl();
    const expected = url.baseUrl + '/';

    expect(redirectUrl).to.equal(expected);
  });
});
