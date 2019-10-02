const { expect } = require('chai');
const { url } = require('../../../constants');
import { user } from '../../constants';
import userDeleteByEmail from '../../actions/deleteByEmail';

const elements = {
  registerButton: {
    selector: '//div[@id="user-section"]/ul/li/a[text() = "Register"]',
  },
  registerForm: {
    title: 'User Register',
  },
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
  before(() => {
    userDeleteByEmail(user.student.email);
  });

  it('should validate Submit button initially is disabled', () => {
    const element = $('//button[@type="submit"]');
    expect(element.isEnabled()).false;
  });

  it('should type `Real name` field', () => {
    const element = $('//input[@name="name"]');
    element.setValue(user.student.name);
  });

  it('should type `Cell phone number` name field', () => {
    const element = $('//input[@name="phone"]');
    element.setValue(user.student.phone);
  });

  it('should type `Email` field', () => {
    const element = $('//input[@name="email"]');
    element.setValue(user.student.email);
  });

  it('should type `Password` field', () => {
    const element = $('//input[@name="password"]');
    element.setValue(user.student.password);
  });

  it('should type `About` field', () => {
    const element = $('//textarea[@name="about"]');
    element.setValue(user.student.about);
  });

  it('should type `Goals` field', () => {
    const element = $('//textarea[@name="goals"]');
    element.setValue(user.student.goals);
  });

  it('should select `English level` field', () => {
    const element = $('//label[@for="englishLevel"]/../../select');
    element.selectByVisibleText('Native');
  });

  it('should validate Submit button is enabled', () => {
    const element = $('//button[@type="submit"]');
    expect(element.isEnabled()).true;
    // browser.debug()
  });

  it('should click submit button', () => {
    const element = $('//button[@type="submit"]');
    element.click();
    browser.pause(5000);
  });
});
