import { expect } from 'chai';
import { url } from '../../constants';

const el = {
  positiveNumbers: ['11111000011', '111110000012'],
  negativeNumbers: [
    '1111100010',
    '1111100000013',
    ' 11110000011',
    ' 11110000012',
    '1111100010 ',
    'l1111000011',
    '(',
    '111-',
    '1-',
  ],
};

const sel = {
  inputFieldPhone: '//input[@name="phone"]',
  invalidFeedback: '//input[@name="phone"]/../../div[@class="invalid-feedback"]',
};

const exp = {
  expectMessageText:
    'Invalid phone number, must start from country code. No spaces or symbols. Only numbers. International format.',
};

describe('User - Register Page - Cell phone imput field - Func', () => {
  before(() => {
    browser.url(url.register);
  });

  describe('Verify positive scenarios for Cell phone field input', () => {
    el.positiveNumbers.forEach(num => {
      it(`Number '${num} is valid`, () => {
        const cellPhoneField = $(sel.inputFieldPhone);
        cellPhoneField.setValue(num);
        browser.keys('Tab');
        const hasValidClass = cellPhoneField.getAttribute('class').includes('is-valid');
        expect(hasValidClass).to.be.true;
      });
    });
  });

  describe('Verify negative scenarios for Cell phone field imput', () => {
    el.negativeNumbers.forEach(num => {
      it(`Name '${num} is not valid`, () => {
        const cellPhoneField = $(sel.inputFieldPhone);
        cellPhoneField.setValue(num);
        browser.keys('Tab');
        const hasInValidClass = cellPhoneField.getAttribute('class').includes('is-invalid');
        expect(hasInValidClass).to.be.true;
      });

      it('Verify that correct error message is displayed below the field', () => {
        const message = $(sel.invalidFeedback);
        const actualMessageText = message.getText();
        expect(actualMessageText).to.be.equal(exp.expectMessageText);
      });
    });
  });
});
