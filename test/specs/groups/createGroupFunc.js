import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuGroups: '//li/a[@qa="groups-link"]',
  h1: '//h1',
  createGroupbutton: '//a[@qa="create-group-button"]',
  groupListItem: '//div[@qa="group-list-item"]',
  submitButton: '//button[@type="submit"]',
  groupNameField: '//input[@name="name"]',
  groupDescriptionField: '//input[@name="description"]',
  accessTypeField: '//select[@name="accessType"]',
  successMessage: '//div[@class="notification notification-success notification-visible"]',
};

const expected = {
  h1Groups: 'Groups',
  h1CreateGroup: 'Create new Group',
  successMessageText: 'Group created\n×',
};

const data = {
  groupName: 'Codewars gamers',
  groupDescription: 'Group for those who like to think',
  accessType: 'All',
};

let numberOfGroups;

describe('Groups - Create group - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should verify that `Groups` item is displayed in main menu', () => {
    $(selector.menuGroups).waitForDisplayed(1000);
    const groupsIsDisplayed = $(selector.menuGroups).isDisplayed();
    expect(groupsIsDisplayed).to.be.true;
  });

  it('should verify that click to `Groups` in main menu should redirect to `Groups` page', () => {
    $(selector.menuGroups).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.group);
  });

  it('should verify that `Groups` page has correct h1', () => {
    const actualH1Text = $(selector.h1).getText();
    expect(actualH1Text).to.equal(expected.h1Groups);
  });

  it('should verify that button `Create new Group` is displayed', () => {
    expect($(selector.createGroupbutton).isDisplayed()).to.be.true;
  });

  it('should verify that count of existing groups > 0', () => {
    $(selector.groupListItem).waitForDisplayed(5000);
    numberOfGroups = $$(selector.groupListItem).length;
    expect(numberOfGroups > 0).to.be.true;
  });

  it('should verify URL after clicking on `Create new group` button', () => {
    $(selector.createGroupbutton).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).equal(url.createGroup);
  });

  it('should verify h1 on the page `Create new Group`', () => {
    const actualH1 = $(selector.h1).getText();
    expect(actualH1).equal(expected.h1CreateGroup);
  });

  it('should verify that `Group name` field is displayed', () => {
    expect($(selector.groupNameField).isDisplayed()).to.be.true;
  });

  it('should verify that `Group description` field is displayed', () => {
    expect($(selector.groupDescriptionField).isDisplayed()).to.be.true;
  });

  it('should verify that `Access type` field is displayed', () => {
    expect($(selector.accessTypeField).isDisplayed()).to.be.true;
  });

  it('should verify that `Create` button is disabled when fields are empty', () => {
    expect($(selector.submitButton).isEnabled()).to.be.false;
  });

  it('should verify that `Group name` field is required', () => {
    $(selector.groupNameField).setValue('');
    $(selector.groupDescriptionField).setValue(data.groupDescription);
    $(selector.accessTypeField).selectByVisibleText(data.accessType);
    expect($(selector.submitButton).isEnabled()).to.be.false;
  });

  it('should verify that `Access type` field is required', () => {
    $(selector.groupNameField).setValue(data.groupName);
    $(selector.groupDescriptionField).setValue(data.groupDescription);
    $(selector.accessTypeField).selectByVisibleText('');
    expect($(selector.submitButton).isEnabled()).to.be.false;
  });

  it('should verify that `Group description` field is not required', () => {
    $(selector.groupNameField).setValue(data.groupName);
    $(selector.groupDescriptionField).setValue('');
    $(selector.accessTypeField).selectByVisibleText(data.accessType);
    expect($(selector.submitButton).isEnabled()).to.be.true;
  });

  it('should verify that `Group description` field is-valid after filling other fields', () => {
    expect($(selector.groupDescriptionField).getAttribute('class')).includes('is-valid');
  });

  it('should verify that `Create` button is enabled when required fields are filled', () => {
    $(selector.groupNameField).setValue(data.groupName);
    $(selector.groupDescriptionField).setValue(data.groupDescription);
    $(selector.accessTypeField).selectByVisibleText(data.accessType);
    expect($(selector.submitButton).isEnabled()).to.be.true;
  });

  it('should verify that `Group name` field is-valid after filling', () => {
    expect($(selector.groupNameField).getAttribute('class')).includes('is-valid');
  });

  it('should verify that `Access type` field is-valid after filling', () => {
    expect($(selector.accessTypeField).getAttribute('class')).includes('is-valid');
  });

  it('should verify URL after clicking on `Create` button', () => {
    $(selector.submitButton).click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).equal(url.groupCreated);
  });

  it('should verify that after click on button `Create` success message is displayed', () => {
    expect($(selector.successMessage).isDisplayed()).to.be.true;
  });

  it('should verify that success message text is correct', () => {
    expect($(selector.successMessage).getText()).equal(expected.successMessageText);
  });

  it('should verify that amount of groups increased by 1 after creating group', () => {
    $(selector.menuGroups).click();
    $(selector.groupListItem).waitForDisplayed(5000);
    const numberOfGroups1 = $$(selector.groupListItem).length;
    expect(numberOfGroups1 === numberOfGroups + 1).to.be.true;
  });
});
