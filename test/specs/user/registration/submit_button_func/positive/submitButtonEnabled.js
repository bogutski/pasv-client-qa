import { url } from '../../../../constants';
import { user } from '../../../../../examples/user/constants';
import { expect } from 'chai';

const firstNameField = '//input[@name="firstName"]';
const lastNameField = '//input[@name="lastName"]';
const phoneField = '//input[@name="phone"]';
const emailField = '//input[@name="email"]';
const passwordField = '//input[@name="password"]';
const aboutField = '//textarea[@name="about"]';
const goalsField = '//textarea[@name="goals"]';
const englishLevelField = '//select[@name="englishLevel"]';
const submitButton = $('//button[@type="submit"]');

describe('User - Register - Submit button', () => {
  before(() => {
    browser.url(url.register);

    $(firstNameField).setValue(user.student.firstName);
    $(lastNameField).setValue(user.student.lastName);
    $(phoneField).setValue(user.student.phone);
    $(emailField).setValue(user.student.email);
    $(passwordField).setValue(user.student.password);
    $(aboutField).setValue(user.student.about);
    $(goalsField).setValue(user.student.goals);
    $(englishLevelField).selectByVisibleText('Elementary');
  });

  it('Should check that submit button is enabled when all fields filled correct', () => {
    const isEnabled = $(submitButton).isEnabled();

    expect(isEnabled).equal(true);
  });
});
