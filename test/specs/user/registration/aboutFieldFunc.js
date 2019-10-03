import { expect } from 'chai';
import { url } from '../../constants';

const el = {
  sel: {
    buttonSubmit: '//button[@type="submit"]',
    aboutField: '//textarea[@name="about"]',
  },
};

describe('User - Register Page - About field - Functionality', () => {
  before(() => {
    browser.url(url.register);
  });

  it('should have Submit button deactivated when the field is empty', () => {
    const buttonSubmit = $(el.sel.buttonSubmit);
    expect(buttonSubmit.isEnabled()).to.be.false;
  });

  it('should verify the About text area is displayed', () => {
    const aboutField = $(el.sel.aboutField);
    expect(aboutField.isDisplayed()).to.be.true;
  });
});
