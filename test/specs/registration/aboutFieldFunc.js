import { expect } from 'chai';
import { url } from '../examples/constants';

const el = {
  sel: {
    buttonSubmit: '//button[@type="submit"]',
    aboutField: '//textarea[@name="about"]',
  },
};

describe('Register Page - About field - Functionality', () => {
  before(() => {
    browser.url(url.registerUrl);
  });

  it('should have Submit button deactivated when the field is empty', () => {
    const buttonSubmit = $(el.sel.buttonSubmit);
    expect(buttonSubmit.isEnabled()).to.be.false;
  });

  it('should have the About text area is a required field', () => {
    const aboutField = $(el.sel.aboutField);
    expect(aboutField.isDisplayed()).to.be.true;
  });
});
