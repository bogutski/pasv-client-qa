import { expect } from 'chai';
import registerAction from '../_actions/registerAction.js';
import userGetAll from './../_actions/userGetAll';
import { user } from './../_data/data';

const token = process.env.TOKEN_ADMIN;
const wrapperErrorMessage = '//div[contains(@class,"notification-error")]';
const errorMessage = `${wrapperErrorMessage}/h4`;
const errorMessageText = 'e-mail exists';
const cssPropertyFontSize = 'font-size';
const cssPropertyFontWeight = 'font-weight';
const cssPropertyFontColor = 'color';
const cssPropertyTextAlignment = 'text-align';
const cssPropertyFontFamily = 'font-family';
const cssPropertyBackgroundColor = 'background-color';
const cssPropertyBorderTopWidth = 'border-top-width';
const cssPropertyBorderTopStyle = 'border-top-style';
const cssPropertyBorderTopColor = 'border-top-color';
const cssPropertyBoxShadow = 'box-shadow';
const expected = {
  fontSize: '14px',
  fontWeight: '700',
  fontColor: '#ec3d3d',
  textAlignment: 'left',
  fontFamily: '"sf pro display", "sf pro icons", "helvetica neue", helvetica, arial, sans-serif',
  backgroundColor: '#f4e9e9',
  borderTopWidth: '2px',
  borderTopStyle: 'solid',
  borderTopColor: '#ec3d3d',
  boxShadow: '#ec3d3d',
};
let allUsers;

describe('User - Registration - ErrorMessage - Design', () => {
  before(async () => {
    allUsers = await userGetAll(token);
  });

  it('should register the user if does not exist already', () => {
    if (!allUsers.some(existingUser => existingUser.email === user.student.email)) {
      registerAction(browser);
    }
  });

  it('should try to register the user with existing email', () => {
    registerAction(browser);
  });

  it('should wait until error message appears', () => {
    browser.waitUntil(
      () => {
        return $(errorMessage).isDisplayed();
      },
      5000,
      'expected text to be different after 5s',
    );
  });

  it('should have the correct text', () => {
    const actualText = $(errorMessage).getText();
    expect(actualText).includes(errorMessageText);
  });

  it('should have the correct font-size', () => {
    const actualFontSize = $(errorMessage)
      .getCSSProperty(cssPropertyFontSize)
      .parsed.string;
    expect(actualFontSize).to.be.equal(expected.fontSize);
  });

  it('should have the correct font-weight', () => {
    const actualFontWeight = $(errorMessage)
      .getCSSProperty(cssPropertyFontWeight)
      .parsed.string;
    expect(actualFontWeight).to.be.equal(expected.fontWeight);
  });

  it('should have the correct font-color', () => {
    const actualFontColor = $(errorMessage)
      .getCSSProperty(cssPropertyFontColor)
      .parsed.hex.toLowerCase();
    expect(actualFontColor).to.be.equal(expected.fontColor);
  });

  it('should have the correct text-alignment', () => {
    const actualTextAlignment = $(errorMessage)
      .getCSSProperty(cssPropertyTextAlignment)
      .parsed.string;
    expect(actualTextAlignment).to.be.equal(expected.textAlignment);
  });

  it('should have the correct font-family', () => {
    const actualFontFamily = $(errorMessage)
      .getCSSProperty(cssPropertyFontFamily)
      .parsed.string.toLowerCase();
    expect(actualFontFamily).to.be.equal(expected.fontFamily);
  });

  it('should have the correct background-color', () => {
    const actualBackgroundColor = $(wrapperErrorMessage)
      .getCSSProperty(cssPropertyBackgroundColor)
      .parsed.hex.toLowerCase();
    expect(actualBackgroundColor).to.be.equal(expected.backgroundColor);
  });

  it('should have the correct border-top-width', () => {
    const actualBorderTopWidth = $(wrapperErrorMessage)
      .getCSSProperty(cssPropertyBorderTopWidth)
      .parsed.string;
    expect(actualBorderTopWidth).to.be.equal(expected.borderTopWidth);
  });

  it('should have the correct border-top-style:', () => {
    const actualBorderTopStyle = $(wrapperErrorMessage)
      .getCSSProperty(cssPropertyBorderTopStyle)
      .parsed.string;
    expect(actualBorderTopStyle).to.be.equal(expected.borderTopStyle);
  });

  it('should have the correct border-top-color:', () => {
    const actualBorderTopColor = $(wrapperErrorMessage)
      .getCSSProperty(cssPropertyBorderTopColor)
      .parsed.hex.toLowerCase();
    expect(actualBorderTopColor).to.be.equal(expected.borderTopColor);
  });

  it('should have the correct box-shadow:', () => {
    const actualBoxShadow = $(wrapperErrorMessage)
      .getCSSProperty(cssPropertyBoxShadow)
      .parsed.hex.toLowerCase();
    expect(actualBoxShadow).to.be.equal(expected.boxShadow);
  });
});
