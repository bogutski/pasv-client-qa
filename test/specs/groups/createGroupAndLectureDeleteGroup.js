import { expect } from 'chai';
import loginAction from '../user/_actions/loginAction';
import groupsGetAll from './_actions/groupsGetAll';
import getAllLectures from './_actions/getAllLecturesInGroup';
import deleteGroupById from './_actions/deleteGroupById';

const sel = {
  groupLink: '//li/a[@qa="groups-link"]',
  header: '//h1',
  createGroupBtn: '//a[@qa="create-group-button"]',
  groupNameField: '//input[@name="name"]',
  lectureNameField: '//input[@name="name"]',
  labelLectureName: '//label[@for="name"]',
  accessTypeSel: '//select[@name="accessType"]',
  accessTypeOption: '//select[@name="accessType"]//option',
  groupDescField: '//input[@name="description"]',
  createBtn: '//button[@type="submit"]',
  youTubeLinkField: '//input[@name="video"]',
  lectureDescField: '//textarea[@name="description"]',
  btn: '//button[@type="submit"]',
  groupByName: '//div[@qa="group-list"]//h4/a[(text()="QA_new")]',
  lecturesLink: '//a[contains(text(),"Lectures")]',
  createLectureBtn: '//a[@qa="create-lecture-button"]',
  dateField: '//input[@placeholder="Date"]',
  dateRequiredMsg: '//div[@class="invalid-feedback"]',
  successLectureMsg: '//div[@class="notifications-br"]//h4[text()="Lecture created"]',
  lectureSel: '//div//a[@qa="edit"]',
};

const data = {
  groupName: 'QA_new',
  groupDesc: 'Only good content',
  expHeaderGroups: 'Groups',
  expHeader: 'Create new Group',
  expLabelForName: 'Lecture name',
  expUrl: 'https://stage.pasv.us/group',
  expGroupHeader: 'Group QA_new',
  expAccessTypeOption: ['', 'Members', 'All'],
  youTubeUrl: 'https://www.youtube.com/watch?v=LnC67uHAkJA',
  lectureNameText: `Practice lesson ${Math.round(Math.random() * 100)}`,
  lectureDescText: 'Codewars',
  textLectureMsg: 'Lecture created',
  currentDate: `${new Date().getMonth() + 1}.${new Date().getDate()}.${new Date().getFullYear()}`,
  zero: 0,
};

const token = process.env.TOKEN_ADMIN;
let allGroups;
let groupsCount;
let groupId;
let lecturesCount;
let allLectures;

describe('Create Group and lecture into it, then delete group', () => {
  before(() => {
    loginAction(browser);
  });

  it('should check that user gets redirected to `Groups` page', () => {
    $(sel.groupLink).click();
    $(sel.createGroupBtn).waitForDisplayed(500);
    expect($(sel.header).getText()).to.be.equal(data.expHeaderGroups);
  });

  it('should check that the user gets redirected to `Create new Group` page', () => {
    $(sel.createGroupBtn).click();
    expect($(sel.header).getText()).to.be.equal(data.expHeader);
  });

  it('should check that user gets redirected to `Group` page after filling all fields', () => {
    $(sel.groupNameField).setValue(data.groupName);
    $(sel.groupDescField).setValue(data.groupDesc);
    $(sel.accessTypeSel).selectByVisibleText(data.expAccessTypeOption[1]);
    $(sel.createBtn).click();
    browser.waitUntil(
      () => {
        return $(sel.header).getText() === data.expHeaderGroups;
      },
      5000,
      'WRONG Header',
    );
    expect(browser.getUrl()).to.be.equal(data.expUrl);
  });

  it('should get group Id through API', async () => {
    allGroups = await groupsGetAll(token);
    groupsCount = allGroups.length;
    groupId = allGroups[0]._id;
    console.log(
      'GROUP_ID is',
      groupId,
      'allGroups length after a new group was created is',
      groupsCount,
    );
    expect(allGroups).to.be.an('array');
  });

  it('should check that the group can be selected by name', () => {
    $(sel.groupByName).click();
    const headerInGroup = $(sel.header).getText();
    expect(headerInGroup).to.be.equal(data.expGroupHeader);
  });

  it('should get all lectures in a group through API and verify that is array', async () => {
    allLectures = await getAllLectures(token, groupId);
    lecturesCount = allLectures.length;
    expect(lecturesCount).to.be.equal(data.zero);
  });

  it('should check that click on `Create lecture` button redirects to creating lecture page', () => {
    $(sel.createLectureBtn).click();
    const actualUrl = browser.getUrl().includes(groupId);
    expect(actualUrl).to.be.true;
  });

  it('should check that new lecture is displayed after `Save` button clicked on', () => {
    $(sel.lectureNameField).setValue(data.lectureNameText);
    $(sel.youTubeLinkField).setValue(data.youTubeUrl);
    $(sel.dateField).setValue(data.currentDate);
    $(sel.lectureDescField).setValue(data.lectureDescText);
    $(sel.btn).click();
    $(sel.lectureSel).waitForDisplayed(5000);
    expect($(sel.lectureSel).isDisplayed()).to.be.true;
  });

  it('should check that the user sees successful message', () => {
    expect($(sel.successLectureMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful message', () => {
    expect($(sel.successLectureMsg).getText()).to.be.equal(data.textLectureMsg);
  });

  it('should compare all lectures count in a group through API after lecture was created', async () => {
    allLectures = await getAllLectures(token, groupId);
    const lecturesCountAfterAPI = allLectures.length;
    const lecturesCountAfter = await $$(sel.lectureSel);
    const lecturesCountAfterUI = lecturesCountAfter.length;
    console.log('API vs UI', lecturesCountAfterAPI, lecturesCountAfterUI);
    expect(lecturesCountAfterAPI).to.be.equal(lecturesCountAfterUI);
  });

  it('should delete Group in DB through API', async () => {
    await deleteGroupById(token, groupId);
    allGroups = await groupsGetAll(token);
    console.log('ALL GROUPS LENGTH is', allGroups.length);
    expect(allGroups.length).to.be.equal(groupsCount - 1);
  });

  it('should check that the group is not displayed on the Page', () => {
    const isDisplayed = $(sel.groupByName).isDisplayed();
    expect(isDisplayed).to.be.false;
  });
});
