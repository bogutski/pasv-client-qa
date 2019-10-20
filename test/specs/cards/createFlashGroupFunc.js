import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';
import flashCardGroupGetAll from './_actions/flashCardGroupGetAll';

const selector = {
  menuCards: '//li/a[@qa="cards-link"]',
  h1: '//h1',
  createNewFlashGroupButton: '//a[@class="btn btn-secondary"]',
  flashGroupName: '//h4[@qa="name"]',
  groupNameField: '//input[@name="name"]',
  groupDescriptionField: '//input[@name="description"]',
  groupDescription: '//div[@qa="description"]',
  createButton: '//button[@class="btn btn-primary"]',
  successMessage: '//div[@class="notification notification-success notification-visible"]',
  editButton: '//a[@class="edit"]',
};

const expected = {
  h1Cards: 'FlashCards',
  buttonText: 'Create new FlashGroup',
  h1CreateNewFlashGroup: 'Create new Flash Group',
};

const data = {
  flashCardGroupName: 'QA',
  flashCardGroupDescription: 'common questions',
};

const token = process.env.TOKEN_ADMIN;
let allGroups;
let numberOfFlashGroups;

describe('Cards - Create FlashCardGroup - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should get all FlasfCardGroups throw API amd verify that is array', async () => {
    allGroups = await flashCardGroupGetAll(token);
    expect(allGroups.payload).to.be.an('array');
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

  it('should verify that amount of flashCardGroups is > 0', () => {
    numberOfFlashGroups = $$(selector.flashGroupName).length;
    expect(numberOfFlashGroups > 0).to.be.true;
  });

  it('should get all FlasfCardGroups throw API and verify that count = numberOfFlashGroups from UI ', async () => {
    const count = allGroups.payload.length;
    expect(count).equal(numberOfFlashGroups);
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

  it('should verify that button `Create` is displayed', () => {
    expect($(selector.createButton).isDisplayed()).to.be.true;
  });

  it('should verify that after filling fields and click on Create button redirect to `FlashCards` page', () => {
    $(selector.groupNameField).setValue(data.flashCardGroupName);
    $(selector.groupDescriptionField).setValue(data.flashCardGroupDescription);
    $(selector.createButton).click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.card);
  });

  it('should verify that success message is displayed', () => {
    expect($(selector.successMessage).isDisplayed()).to.be.true;
  });

  it('should verify that amount of flashGroups is increased by 1', () => {
    const newNumberOfFlashGroups = $$(selector.flashGroupName).length;
    expect(newNumberOfFlashGroups === numberOfFlashGroups + 1).to.be.true;
  });

  it('should verify that name of Last created Group is correct', () => {
    const nameOfLastFlashGroup = $$(selector.flashGroupName)[0].getText();
    expect(nameOfLastFlashGroup).equal(data.flashCardGroupName);
  });

  it('should verify that description of created Group is correct', () => {
    const nameOfLastFlashGroup = $$(selector.groupDescription)[0].getText();
    expect(nameOfLastFlashGroup).equal(data.flashCardGroupDescription);
  });
});
