import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuCards: '//li/a[@qa="cards-link"]',
  h1: '//h1',
  createNewFlashGroupButton: '//a[@class="btn btn-secondary"]',
  h4: '//h4',
  groupNameField: '//input[@name="name"]',
  groupDescriptionField: '//input[@name="description"]',
  //    submitButton: '//button[@type="submit"]',
};
const expected = {
  h1Cards: 'FlashCards',
  buttonText: 'Create new FlashGroup',
  h1CreateNewFlashGroup: 'Create new Flash Group',
};

let numberOfFlashGroups;

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

  it('should verify that button `Create new FlashGroup` is displayed', () => {
    expect($(selector.createNewFlashGroupButton).isDisplayed()).to.be.true;
  });

  it('should verify that button `Create new FlashGroup` has correct text', () => {
    expect($(selector.createNewFlashGroupButton).getText()).equal(expected.buttonText);
  });

  it('should verify that amount of flashgroups is > 0', () => {
    numberOfFlashGroups = $$(selector.h4).length;
    expect(numberOfFlashGroups > 0).to.be.true;
  });

  it('should verify URL after clicking on `Create new FlashGroup` button', () => {
    $(selector.createNewFlashGroupButton).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).equal(url.createFlashGroup);
  });

  it('should verify that `Create new Flash Group` page has correct h1', () => {
    const actualH1Text = $(selector.h1).getText();
    expect(actualH1Text).to.equal(expected.h1CreateNewFlashGroup);
  });

  it('should verify that `Group name` field is displayed', () => {
    expect($(selector.groupNameField).isDisplayed()).to.be.true;
  });

  it('should verify that `Group description` field is displayed', () => {
    expect($(selector.groupDescriptionField).isDisplayed()).to.be.true;
  });
});
