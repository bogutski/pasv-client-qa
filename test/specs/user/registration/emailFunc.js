import { expect } from 'chai';
import { url } from './../../constants';

const elements = {
  emailField: {
    selector: '//input[@name="email"]',
  },
  errorMessage: {
    selector: '//div[@class="invalid-feedback"]',
  },
  nameField: {
    selector: '//input[@name="name"]',
  },
  phoneField: {
    selector: '//input[@name="phone"]',
  },
  passwordField: {
    selector: '//input[@name="password"]',
  },
  aboutField: {
    selector: '//textarea[@name="about"]',
  },
  myGoalsField: {
    selector: '//textarea[@name="goals"]',
  },
  inputValue: {
    validEmail: '123@test.test',
    invalidEmail: '123test.test',
    validEmailAllNumbers: '1234567890@test.test',
    validEmailAllLetters: 'abcdefghijklmnopqrstuvwxyz@test.test',
    validEmailSpecialCharacters: '_+%-.@test.test',
    validEmailAllNumbersEnd: '123@1234567890.test',
    validEmailAllLettersEnd: '123@abcdefghijklmnopqrstuvwxyz.test',
    validEmailSpecialCharactersEnd: '123@t.e-st.test',
    validName: 'Test Test',
    validPhone: '+12345678900',
    validPassword: '1234567',
  },
};

describe('User registration form email functionality', () => {
  before(() => {
    browser.url(url.register);
  });

  it('Verify that entered email can contain "@" and "." symbols', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmail);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });

  it('Verify that email field doesnt accept email without @ symbol', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.invalidEmail);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-invalid');
  });

  it('Verify that email field accepts all numbers in the part BEFORE @', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmailAllNumbers);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });

  it('Verify that email field accepts all letters in the part BEFORE @', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmailAllLetters);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });

  it('Verify that email field accepts  _, +, %, -, . special characters in the part BEFORE @', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmailAllLetters);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });

  it('Verify that email field accepts all numbers in the part AFTER @', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmailAllNumbersEnd);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });

  it('Verify that email field accepts all letters in the part AFTER @', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmailAllLettersEnd);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });

  it('Verify that email field accepts . and - special characters in the part AFTER @', () => {
    const emailFieldElement = $(elements.emailField.selector);
    const passwordFieldElement = $(elements.passwordField.selector);
    emailFieldElement.setValue(elements.inputValue.validEmailSpecialCharactersEnd);
    passwordFieldElement.click();
    expect(emailFieldElement.getAttribute('class')).includes('is-valid');
  });
});
