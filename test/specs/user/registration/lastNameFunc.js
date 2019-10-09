import { expect } from 'chai';
import { url } from '../../constants';

const positiveLastName = ['Smith', 'SMITH', 'Jojojojojojojojojojo', 'Yu-Yu', "Yu'yu"];
const negativeLastName = [
  'Jojojojojojojojojojoj',
  'Johnson1',
  'J!@#$%^&*()_+',
  'Smith Smith',
  'Том',
];

const lastName = '//input[@name="lastName"]';
const errorMessage = 'Only letters please';

describe('Verify the functionality of Last Name field on Registration page', () => {
  before(() => {
    browser.url(url.register);
  });

  describe('Verify positive scenarios for Last Name field input', () => {
    positiveLastName.forEach(name => {
      it(`Last Name '${name}' is valid`, () => {
        const lastNameField = $(lastName);
        lastNameField.setValue(name);
        browser.keys('Tab');
        const hasValidClass = lastNameField.getAttribute('class').includes('is-valid');
        expect(hasValidClass).to.be.true;
      });
    });
  });

  describe('Verify negative scenarios for Last Name field input', () => {
    negativeLastName.forEach(name => {
      it(`Last Name '${name}' is not valid`, () => {
        const lastNameField = $(lastName);
        lastNameField.setValue(name);
        browser.keys('Tab');
        const hasInvalidClass = lastNameField.getAttribute('class').includes('is-invalid');
        expect(hasInvalidClass).to.be.true;
      });
    });
  });

  it('Verify that correct error message is displayed below the field', () => {
    const lastNameField = $(lastName);
    lastNameField.setValue('12');
    const errorMessageSel = $('//div[@class="invalid-feedback"]');
    const expectedErrorText = errorMessageSel.getText();
    expect(expectedErrorText).to.be.eq(errorMessage);
  });
});
