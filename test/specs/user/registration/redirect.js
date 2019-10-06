import { expect } from 'chai';
import { url } from '../../constants';

const elements = {
  registerButton: {
    selector: '//a[@qa="register-link"]',
  },
  registerForm: {
    title: 'User Register',
    firstNameField: '//input[@name="firstName"]',
    lastNameField: '//input[@name="lastName"]',
    cellPhoneNumberField: '//input[@name="phone"]',
    emailField: '//input[@name="email"]',
    passwordField: '//input[@name="password"]',
    aboutTextArea: '//textarea[@name="about"]',
    myGoalsArea: '//textarea[@name="goals"]',
    englishLevelField: '//select[@name="englishLevel"]',
    submitButton: '//button[@type="submit"]',
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
    clickRegisterButton();
  });

  it('should verify when Register button is clicked, user is redirected to the Register page', () => {
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it(`should verify when Register button is clicked, url changed to ${url.register}`, () => {
    const urlAfterClick = browser.getUrl();
    const expectedUrl = `${url.register}`;
    expect(urlAfterClick).eq(expectedUrl);
  });
});

describe('User - Registration - Redirect (from Login page)', () => {
  before(() => {
    browser.url(url.login);
    clickRegisterButton();
  });

  it('should verify when Register button is clicked, user is redirected to the Register page', () => {
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it(`should verify when Register button is clicked, url changed to ${url.register}`, () => {
    const urlAfterClick = browser.getUrl();
    const expectedUrl = `${url.register}`;
    expect(urlAfterClick).eq(expectedUrl);
  });
});

describe('User - Registration - Redirect - All fields are displayed', () => {
  before(() => {
    browser.url(url.baseUrl);
    clickRegisterButton();
  });

  it('should verify Global Header is displayed', () => {
    expect($(elements.globalHeader.selector).isDisplayed()).true;
  });

  it('should verify that h1 text is User Register', () => {
    const h1RegisterPage = $('//h1').getText();
    expect(h1RegisterPage).eq(elements.registerForm.title);
  });

  it('should verify that First Name field is displayed', () => {
    expect($(elements.registerForm.firstNameField).isDisplayed()).true;
  });

  it('should verify that Last Name field is displayed', () => {
    expect($(elements.registerForm.lastNameField).isDisplayed()).true;
  });

  it('should verify that Cell Phone number field is displayed', () => {
    expect($(elements.registerForm.cellPhoneNumberField).isDisplayed()).true;
  });

  it('should verify that Email Field is displayed', () => {
    expect($(elements.registerForm.emailField).isDisplayed()).true;
  });

  it('should verify that Password Field is displayed', () => {
    expect($(elements.registerForm.passwordField).isDisplayed()).true;
  });

  it('should verify that About text area is displayed', () => {
    expect($(elements.registerForm.aboutTextArea).isDisplayed()).true;
  });

  it('should verify that My Goals area is displayed', () => {
    expect($(elements.registerForm.myGoalsArea).isDisplayed()).true;
  });

  it('should verify that English level drop-down menu is displayed', () => {
    expect($(elements.registerForm.englishLevelField).isDisplayed()).true;
  });

  it('should verify that Submit button is displayed', () => {
    expect($(elements.registerForm.submitButton).isDisplayed()).true;
  });

  it('should verify Global Footer is displayed', () => {
    expect($(elements.globalFooter.selector).isDisplayed()).true;
  });
});
