import { expect } from 'chai';
import { url } from '../../../examples/constants';

const inputFieldPassword = '//input[@name="password"]';
const expectBorderColor = '#ced4da';
const expectFocusHighlight = 'rgba(0,82,204,0.25)0px0px0px3.2px';

describe('Login Page - Password input field - Design', () => {
  before(() => {
    browser.url(url.loginUrl);
  });

  it('should check that the input field is displayed', () => {
    const actualInputFieldPassword = $(inputFieldPassword).isDisplayed();
    expect(actualInputFieldPassword).to.be.true;
  });

  it('Should "Password" input field has a correct border color', () => {
    const actualBorderColor = $(inputFieldPassword).getCSSProperty('border-color').parsed.hex;
    expect(actualBorderColor).to.eq(expectBorderColor);
  });

  it('Should "Password" input field has a correct Focus highlight when user puts a cursor', () => {
    $(inputFieldPassword).click(); //can't cath highlight without click and pause
    browser.pause(300);
    const actualFocusHighlight = $(inputFieldPassword).getCSSProperty('box-shadow').value;
    expect(actualFocusHighlight).to.eq(expectFocusHighlight);
  });
});
