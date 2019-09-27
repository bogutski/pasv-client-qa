const { expect } = require('chai');
const { url } = require('../../../constants');

//import { user } from '../../constants';
//import userDeleteByEmail from '../../actions/deleteByEmail';

const elements = {
  emailField: {
    selector: '//input[@name="email"]'
  },
  errorMessage: {
    selector: '//div[@class="invalid-feedback"]'
  },
  greenInputField: {
    selector: '//input[@name="email"]',
    expectedBorderColor: '#24c88b'
  },
  passwordField: {
    selector: '//input[@name="password"]'
  }
};

describe('User registration form email functionality', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('Verify that entered email can contain "@" and "." symbols', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector)
    emailFieldElement.setValue('123@test.test');
    passwordFieldElement.click();
    browser.pause(1000);

    //Verifying invalid email text is not displayed
    const errorMessageElement = $(elements.errorMessage.selector).isDisplayed();
    expect(errorMessageElement).to.be.false; 
    //Verifying border color is green
    const borderColor = emailFieldElement.getCSSProperty('border-color').parsed.hex.toLowerCase();
    expect(borderColor).to.eq(elements.greenInputField.expectedBorderColor);
    
  });

  
  it('Verify that email field doesnt accept email without @ symbol', () => {
    const element = $(elements.registerButton.selector);
    element.click();
    const h1Text = $('//h1').getText();
    expect(h1Text).eq(elements.registerForm.title);
  });

  });