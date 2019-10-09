import { expect } from 'chai';
import { url } from '../../constants';

const positiveFirstName = ['Yulia', 'YULIA', 'Jojojojojojojojojojo', 'Yu-Yu', "Yu'yu"];
const negativeFirstName = [
  'Jojojojojojojojojojoj',
  'Johnson1',
  'J!@#$%^&*()_+',
  'John John',
  'Том',
];

const firstName = '//input[@name="firstName"]';
const errorMessage = 'Only letters please';

describe('Verify the functionality of First Name field on Registration page', () => {
  before(() => {
    browser.url(url.register);
  });

  describe('Verify positive scenarios for First Name field input', () => {
    positiveFirstName.forEach(name => {
      it(`firstName '${name}' is valid`, () => {
        const firstNameField = $(firstName);
        firstNameField.setValue(name);
        browser.keys('Tab');
        const hasValidClass = firstNameField.getAttribute('class').includes('is-valid');
        expect(hasValidClass).to.be.true;
      });
    });
  });

  describe('Verify negative scenarios for First Name field input', () => {
    negativeFirstName.forEach(name => {
      it(`First Name '${name}' is not valid`, () => {
        const firstNameField = $(firstName);
        firstNameField.setValue(name);
        browser.keys('Tab');
        const hasInvalidClass = firstNameField.getAttribute('class').includes('is-invalid');
        expect(hasInvalidClass).to.be.true;
      });
    });
  });

  it('Verify that correct error message is displayed below the field', () => {
    const firstNameField = $(firstName);
    firstNameField.setValue('12');
    const errorMessageSel = $('//div[@class="invalid-feedback"]');
    const expectedErrorText = errorMessageSel.getText();
    expect(expectedErrorText).to.be.eq(errorMessage);
  });
});
