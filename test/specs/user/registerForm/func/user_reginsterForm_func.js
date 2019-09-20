const { expect } = require('chai');
const { url, user } = require('./../../../../constants');

const elements = {
  registerButton: {
    selector: '//div[@id="user-section"]/ul/li/a[text() = "Register"]'
  },
  registerForm: {
    title: 'User Register',
  }
};

describe('User --- Register Form --- Func --- Form is displayed', () => {
  before(() => {
    browser.url(url.baseUrl);
  });

  it('should validate Register button is displayed on the top', () => {
    const element = $(elements.registerButton.selector);
    expect(element.isDisplayed()).true;
  });

  it('should redirect to Register form after click to Register button', () => {
    const element = $(elements.registerButton.selector);
    element.click();
    const h1Text = $('//h1').getText();
    expect(h1Text).eq(elements.registerForm.title);
  });

  it('should have correct url', () => {
    const currentUrl = browser.getUrl();
    expect(currentUrl).eq(url.registerUrl);
  });

  it('should have `Real name` field', () => {
    const element = $('//input[@name="name"]');
    expect(element.isDisplayed()).true;
  });

  it('should have `Cell phone number` name field', () => {
    const element = $('//input[@name="phone"]');
    expect(element.isDisplayed()).true;
  });

  it('should have `Email` field', () => {
    const element = $('//input[@name="email"]');
    expect(element.isDisplayed()).true;
  });

  it('should have `Password` field', () => {
    const element = $('//input[@name="password"]');
    expect(element.isDisplayed()).true;
  });

  it('should have `About` field', () => {
    const element = $('//textarea[@name="about"]');
    expect(element.isDisplayed()).true;
  });

  it('should have `Goals` field', () => {
    const element = $('//textarea[@name="goals"]');
    expect(element.isDisplayed()).true;
  });

  it('should have `English level` field', () => {
    const element = $('//label[@for="englishLevel"]/../../select');
    expect(element.isDisplayed()).true;
  });

});

describe('User --- Register Form --- Func ––– Register new user', () => {

  it('should type `Real name` field', () => {
    const element = $('//input[@name="name"]');
    element.setValue(user.admin.name)
  });

  it('should have `Cell phone number` name field', () => {
    const element = $('//input[@name="phone"]');
    element.setValue(user.admin.phone)
  });

  it('should have `Email` field', () => {
    const element = $('//input[@name="email"]');
    element.setValue(user.admin.email);
    browser.debug()
  });

  // it('should have `Password` field', () => {
  //   const element = $('//input[@name="password"]');
  //   expect(element.isDisplayed()).true;
  // });

  // it('should have `About` field', () => {
  //   const element = $('//textarea[@name="about"]');
  //   expect(element.isDisplayed()).true;
  // });
  //
  // it('should have `Goals` field', () => {
  //   const element = $('//textarea[@name="goals"]');
  //   expect(element.isDisplayed()).true;
  // });
  //
  // it('should have `English level` field', () => {
  //   const element = $('//label[@for="englishLevel"]/../../select');
  //   expect(element.isDisplayed()).true;
  // });

});
