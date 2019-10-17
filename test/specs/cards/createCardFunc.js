import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuCards: '//li/a[@qa="cards-link"]',
  h1: '//h1',
  //   createCardButton: '//a[@qa="create-group-button"]',
  //    submitButton: '//button[@type="submit"]',
};
const expected = {
  h1Cards: 'FlashCards',
};
describe('Cards - Create card - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should verify that `Cards` item is displayed in main menu', () => {
    $(selector.menuCards).waitForDisplayed(1000);
    const cardsIsDisplayed = $(selector.menuCards).isDisplayed();
    expect(cardsIsDisplayed).to.be.true;
  });

  it('should verify that click to `Cards` in main menu should redirect to `FlashCards` page', () => {
    $(selector.menuCards).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.card);
  });

  it('should verify that `FlashCards` page has correct h1', () => {
    const actualH1Text = $(selector.h1).getText();
    expect(actualH1Text).to.equal(expected.h1Cards);
  });
});
