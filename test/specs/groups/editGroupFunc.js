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
  groupNames: '//h4/a',
  editButton: '//a[@qa="edit-button"]',
  editGroupDescription: '//textarea[@name="description"]',
  slackWebhook: '//input[@name="slackWebhook"]',
  searchQuiz: '//input[@name="searchQuiz"]',
  successMessage: '//div[@class="notification notification-success notification-visible"]',
  descriptionButton: '//a[contains(text(),"Description")]',
  descriptionText: '//div/p',
};

const expected = {
  editGroupH1: 'Edit Group',
};
const data = {
  groupName: 'Codewars gamers',
  groupDescription: 'Group for those who like to think',
  accessType: 'All',
  newGroupName: 'Codewars winners',
  newGroupDescription: 'Group for those who like to think and win.',
  newAccessType: 'Members',
};

describe('Groups - Edit group - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should verify URL after group is created', () => {
    $(selector.menuGroups).click();
    $(selector.createGroupbutton).click();
    $(selector.groupNameField).setValue(data.groupName);
    $(selector.groupDescriptionField).setValue(data.groupDescription);
    $(selector.accessTypeField).selectByVisibleText(data.accessType);
    $(selector.submitButton).click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).equal(url.group);
  });

  it('should verify that new group is displayed in the list of groups', () => {
    $(selector.groupListItem).waitForDisplayed(1000);
    const lastGroup = $$(selector.groupListItem)[0];
    const lastGroupText = lastGroup.getText();
    expect(lastGroupText.includes(data.groupName)).to.be.true;
  });

  it('should verify that clicking on group name in the list of groups redirect to group`s page', () => {
    const lastGroupName = $$(selector.groupNames)[0];
    lastGroupName.click();
    $(selector.h1).waitForDisplayed(1000);
    const actualH1 = $(selector.h1).getText();
    const expectedH1 = `Group ${data.groupName}`;
    expect(actualH1).equal(expectedH1);
  });

  it('should verify that clicking on `Edit`button redirect to `Edit Group` page', () => {
    $(selector.editButton).click();
    $(selector.h1).waitForDisplayed(1000);
    const actualH1 = $(selector.h1).getText();
    expect(actualH1).equal(expected.editGroupH1);
  });

  it('should verify that `Group name` field is displayed on `Edit Group` page', () => {
    expect($(selector.groupNameField).isDisplayed()).to.be.true;
  });

  it('should verify that `Group description` field is displayed on `Edit Group` page', () => {
    expect($(selector.editGroupDescription).isDisplayed()).to.be.true;
  });

  it('should verify that `Access type` field is displayed on `Edit Group` page', () => {
    expect($(selector.accessTypeField).isDisplayed()).to.be.true;
  });

  it('should verify that `Slack Webhook slug` field is displayed on `Edit Group` page', () => {
    expect($(selector.slackWebhook).isDisplayed()).to.be.true;
  });

  it('should verify that `Assign quiz` field is displayed on `Edit Group` page', () => {
    expect($(selector.searchQuiz).isDisplayed()).to.be.true;
  });

  it('should verify that after editing and clicking on save button will redirect to `Groups` page', () => {
    $(selector.groupNameField).setValue(data.newGroupName);
    $(selector.editGroupDescription).setValue(data.newGroupDescription);
    $(selector.accessTypeField).selectByVisibleText(data.newAccessType);
    $(selector.submitButton).click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).equal('https://stage.pasv.us/groups');
  });

  it('should verify that success message is displayed', () => {
    expect($(selector.successMessage).isDisplayed()).to.be.true;
  });

  it('should verify that name of group was changed', () => {
    $(selector.menuGroups).click();
    $(selector.groupListItem).waitForDisplayed(1000);
    const lastGroup = $$(selector.groupListItem)[0];
    const lastGroupText = lastGroup.getText();
    expect(lastGroupText.includes(data.newGroupName)).to.be.true;
  });

  it('should verify that Description on group page was changed', () => {
    const lastGroupName = $$(selector.groupNames)[0];
    lastGroupName.click();
    $(selector.descriptionButton).waitForDisplayed(1000);
    $(selector.descriptionButton).click();
    const actualDescriptionText = $(selector.descriptionText).getText();
    expect(actualDescriptionText).include(data.newGroupDescription);
  });
});
