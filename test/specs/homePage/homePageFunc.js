//const expect = require('chai').expect;
//const assert = require('chai').assert;
import { expect } from 'chai';

describe('Home page - functionality', () => {
  before(() => {
    browser.url('https://stage.pasv.us/');
  });

  it('should have correct title', () => {
    const title = browser.getTitle();
    browser.pause(4000);
    const expected = 'Progress Monitor';
    expect(title).to.equal(expected);
  });

  it('should verify that clicking on `Progress Monitor` from Home Page gets redirected back to Home Page ', function() {
    const selector = '//span[@id="site-name"]';
    $(selector).click();
    const redirectUrl = browser.getUrl();
    const expected = 'https://stage.pasv.us/';
    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking on Login button from Home Page gets redirected to Login Page ', function() {
    const selector = '//a[@class="nav-link"]';
    $(selector).click();
    browser.pause(1000);
    const redirectUrl = browser.getUrl();
    const expected = 'https://stage.pasv.us/user/login';

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking on `Progress Monitor` from Login Page gets redirected back to Home Page ', function() {
    const selector = '//span[@id="site-name"]';
    $(selector).click();
    browser.pause(1000);
    const redirectUrl = browser.getUrl();
    const expected = 'https://stage.pasv.us/';

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking on Register button from Home Page gets redirected to Register Page ', function() {
    const selector = '//a[@class="btn btn-outline-primary"]';
    $(selector).click();
    browser.pause(1000);
    const redirectUrl = browser.getUrl();
    const expected = 'https://stage.pasv.us/user/register';

    expect(redirectUrl).to.equal(expected);
  });

  it('should verify that clicking on `Progress Monitor` from Register Page gets redirected back to Home Page ', function() {
    const selector = '//span[@id="site-name"]';
    $(selector).click();
    browser.pause(1000);
    const redirectUrl = browser.getUrl();
    const expected = 'https://stage.pasv.us/';

    expect(redirectUrl).to.equal(expected);
  });
});
