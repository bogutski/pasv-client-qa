import { expect } from 'chai';
import { url } from './../../../specs/constants';

const englishLevelDropDown = '//select[@name="englishLevel"]';
const dropDownOption = `${englishLevelDropDown}/option`;
const redSignRequired = `${englishLevelDropDown}/..//span[contains(@class,"invalid-feedback")]`;
const submitButton = '//button[text()="Submit"]';
const englishLevelList = [
  '',
  'Zero',
  'Beginner',
  'Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper intermediate',
  'Advanced',
  'Proficient',
  'Native',
];
let attributeValue = 'value';
let attributeClass = 'class';
let classIsValid = 'is-valid';
let classIsInvalid = 'is-invalid';
let classDisabled = 'disabled';
let valueKeys = 'Tab';


describe('User - Registration - EnglishLevel - Functionality', () => {
  before(() => {
    browser.url(url.register);
  });

  it('verify that the "English level" field is displayed', () => {
    const englishLevelIsDisplayed = $(englishLevelDropDown).isDisplayed();
    expect(englishLevelIsDisplayed).to.be.true;
  });

  it('verify that the red sign "Required" is displayed', function() {
    const redSignRequiredIsDisplayed = $(redSignRequired).isDisplayed();
    expect(redSignRequiredIsDisplayed).to.be.true;
  });

  it('verify that the button "Submit" is disabled', () => {
    const submitButtonIsDisabled = $(submitButton).getAttribute(attributeClass).includes(classDisabled);
    expect(submitButtonIsDisabled).to.be.true;
  });

  it('verify that the "English level" field has correct items in dropdown', () => {
    const dropDownOptionText = $$(dropDownOption).map(option => option.getText());
    expect(dropDownOptionText).to.deep.equal(englishLevelList);
  });

  for (let i = 1; i < englishLevelList.length; i++) {
    it(`should find '${englishLevelList[i]}'`, () => {
      $(englishLevelDropDown).selectByVisibleText(englishLevelList[i]);
      browser.keys(valueKeys);
    });

    it(`verify that user should be able select '${englishLevelList[i]}' in the "English level" dropdown`, () => {
      const hasValidClass = $(englishLevelDropDown).getAttribute(attributeClass).includes(classIsValid);
      expect(hasValidClass).to.be.true;
    });

    it(`verify that the red sign "Required" disappears when user select '${englishLevelList[i]}'`, () => {
      const noRedSignRequired = $(redSignRequired).value;
      expect(noRedSignRequired).to.be.undefined;
    });
  }

  it('should find the empty option', () => {
    $(englishLevelDropDown).selectByAttribute(attributeValue, englishLevelList[0]);
    browser.keys(valueKeys);
  });

  it('verify that the "English level" field is marked invalid when the user selected an empty option', () => {
    const hasValidClass = $(englishLevelDropDown).getAttribute(attributeClass).includes(classIsInvalid);
    expect(hasValidClass).to.be.true;
  });

  it('verify that the red sign "Required" is displayed when the user selected an empty option', () => {
    const redSignRequiredIsDisplayed = $(redSignRequired).isDisplayed();
    expect(redSignRequiredIsDisplayed).to.be.true;
  });

  it('verify that the button "Submit" is disabled when the user selected an empty option', () => {
    const submitButtonIsDisabled = $(submitButton).getAttribute(attributeClass).includes(classDisabled);
    expect(submitButtonIsDisabled).to.be.true;
  });
});
