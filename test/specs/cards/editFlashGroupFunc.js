import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuCards: '//li/a[@qa="cards-link"]',
  h1: '//h1',
  flashGroupName: '//h4[@qa="name"]',
  groupNameField: '//input[@name="name"]',
  groupDescriptionField: '//input[@name="description"]',
  groupDescription: '//div[@qa="description"]',
  saveButton: '//button[@class="btn btn-primary"]',
  editButton: '//a[@class="edit"]',
};

const expected = {
  h1Cards: 'FlashCards',
  h1EditGroup: 'Edit ',
};

const data = {
  addToName: '_test',
  addToDescription: '_test_questions',
};

let flashGroupNameOld;
let flashGroupDescriptionOld;

describe('Cards - Edit FlashCardGroup - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should check name of last flash group on `FlashCards` page', () => {
    $(selector.menuCards).click();
    flashGroupNameOld = $$(selector.flashGroupName)[0].getText();
    expect(flashGroupNameOld !== '').to.be.true;
  });

  it('should check description of last flash group on `FlashCards` page', () => {
    $(selector.menuCards).click();
    flashGroupDescriptionOld = $$(selector.groupDescription)[0].getText();
    expect(flashGroupDescriptionOld !== '').to.be.true;
  });

  it('should verify h1 after clicking to `edit` button redirect to `Edit Group` page ', () => {
    $(selector.editButton).click();
    browser.pause(6000);
    const actualH1 = $(selector.h1).getText();
    expect(actualH1).equal(expected.h1EditGroup + flashGroupNameOld);
  });

  it('should verify URL that after editing flashGroup and clicking Save button', () => {
    $(selector.groupNameField).addValue(data.addToName);
    $(selector.groupDescriptionField).addValue(data.addToDescription);
    $(selector.saveButton).click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).equal(url.card);
  });

  it('should verify H1 after editing flashGroup and redirecting to `FlashCards` page ', () => {
    const actualH1 = $(selector.h1).getText();
    expect(actualH1).equal(expected.h1Cards);
  });

  it('should verify that on `FlashCards` page the name of group in the list of groups was changed', () => {
    const actualFlashGroupName = $$(selector.flashGroupName)[0].getText();
    expect(actualFlashGroupName).equal(flashGroupNameOld + data.addToName);
  });

  it('should verify that on `FlashCards` page the description of group was changed', () => {
    const actualFlashGroupDescription = $$(selector.groupDescription)[0].getText();
    expect(actualFlashGroupDescription).equal(flashGroupDescriptionOld + data.addToDescription);
  });

  it('should verify that the new name of group not equal old name', () => {
    const actualFlashGroupName = $$(selector.flashGroupName)[0].getText();
    expect(actualFlashGroupName !== flashGroupNameOld).to.be.true;
  });

  it('should verify that the new description of group not equal old description', () => {
    const actualFlashGroupDescription = $$(selector.groupDescription)[0].getText();
    expect(actualFlashGroupDescription !== flashGroupDescriptionOld).to.be.true;
  });
});
