import { expect } from 'chai';
import { url } from '../examples/constants';

const positiveNames = ['John Johnson', 'Johnjohnjohnjoh Johnjohnjohnjoh', 'Jo Jo'];
const negativeNames = [
  'john johnson',
  'John1 Johnson1',
  'Johnjohnjohnjohnnn Johnjohnjohnjohnnn',
  'J J',
  'John! Johnson',
  'John  Johnson',
  'John Johnson John',
  'Том Том',
];
const realName = '//input[@name="name"]';
const defaultMessage = 'Please enter your real name and surname. Example: John Smith';
const errorMessage =
  'It does not look like a real name. Example: John Smith. Name and Lastname, the first ' +
  'letter each word should be in upper case, one space between Name and Lastname, no special characters, and symbols.';

describe('Verify the functionality of Real Name field on Registration page', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  describe('Verify positive scenarios for Real Name field input', () => {
    // eslint-disable-next-line mocha/no-setup-in-describe
    positiveNames.forEach(name => {
      it(`Name '${name}' is valid`, () => {
        const realNameField = $(realName);
        realNameField.setValue(name);
        browser.keys('Tab');
        const hasValidClass = realNameField.getAttribute('class').includes('is-valid');
        expect(hasValidClass).to.be.true;
      });
    });
  });

  describe('Verify negative scenarios for Real Name field input', () => {
    // eslint-disable-next-line mocha/no-setup-in-describe
    negativeNames.forEach(name => {
      it(`Name '${name}' is not valid`, () => {
        const realNameField = $(realName);
        realNameField.setValue(name);
        browser.keys('Tab');
        const hasInvalidClass = realNameField.getAttribute('class').includes('is-invalid');
        expect(hasInvalidClass).to.be.true;
      });
    });
  });

  it('Verify that correct description message is displayed below the field', () => {
    const realNameField = $(realName);
    realNameField.click();
    const messageSel = $('.text-muted');
    const expectedMessageText = messageSel.getText();
    console.log(expectedMessageText);
    expect(expectedMessageText).to.be.eq(defaultMessage);
  });

  it('Verify that correct error message is displayed below the field', () => {
    const realNameField = $(realName);
    realNameField.setValue('J 1');
    const errorMessageSel = $('//div[@class="invalid-feedback"]');
    const expectedErrorText = errorMessageSel.getText();
    expect(expectedErrorText).to.be.eq(errorMessage);
  });
});
