import { expect } from 'chai';
import loginAction from '../user/_actions/loginAction';

const sel = {
  groupLink: '//li/a[@qa="groups-link"]',
  header: '//h1',
  headerEdit: '//h1[contains(text(),"Edit")]',
  createGroupBtn: '//a[@qa="create-group-button"]',
  lectureNameField: '//input[@name="name"]',
  lectureDescField: '//textarea[@name="description"]',
  btn: '//button[@type="submit"]',
  groupByName: '//div[@qa="group-list"]//h4/a[text()="QA_new_Group"]',
  lecturesLink: '//a[contains(text(),"Lectures")]',
  createLectureBtn: '//a[@qa="create-lecture-button"]',
  editSel: '//a[@qa="edit"]',
  lectureSel: '//a[@qa="edit"]/../a/span',
  successLectureUpdatedMsg: '//div[@class="notifications-br"]//h4[text()="Lecture updated"]',
  successLectureMsg: '//div[@class="notifications-br"]//h4[text()="Lecture created"]',
  description: '//p[contains(text(),"Loop")]',
  youTubeLinkField: '//input[@name="video"]',
  dateField: '//input[@placeholder="Date"]',
};

const data = {
  expHeaderGroups: 'Groups',
  expHeader: 'Create new Group',
  expUrl: 'https://stage.pasv.us/group',
  expGroupHeader: 'Group QA_new_Group',
  textLectureUpdatedMsg: 'Lecture updated',
  headerEdit: 'Edit lecture',
  newLectureName: 'Codewars solutions',
  newDesc: 'Loop and Function',
  editLecture: 'Edit lecture',
  lectureNameText: 'Practice lesson',
  lectureDescText: 'Codewars',
  youTubeUrl: 'https://www.youtube.com/watch?v=LnC67uHAkJA',
  partLink: 'lecture/create',
  textLectureMsg: 'Lecture created',
  currentDate: `${new Date().getMonth() + 1}.${new Date().getDate()}.${new Date().getFullYear()}`,
};

describe('Edit lecture`s name and description in a group', () => {
  before(() => {
    loginAction(browser);
  });

  it('should check that user gets redirected to `Groups` page', () => {
    $(sel.groupLink).click();
    $(sel.createGroupBtn).waitForDisplayed(500);
    expect($(sel.header).getText()).to.be.equal(data.expHeaderGroups);
  });

  it('should check that user gets redirected to `Lecture` page', () => {
    $(sel.groupByName).click();
    browser.waitUntil(
      () => {
        return $(sel.header).getText() === data.expGroupHeader;
      },
      5000,
      'expected text to be `Group QA_new_Group` after 5s',
    );
  });

  it('should check that click on `Create lecture` button redirects to creating lecture page', () => {
    $(sel.createLectureBtn).click();
    browser.waitUntil(
      () => {
        return browser.getUrl().includes(data.partLink) === true;
      },
      5000,
      'expected true after 5s',
    );
  });

  it('should check that new lecture is displayed', () => {
    $(sel.lectureNameField).setValue(data.lectureNameText);
    $(sel.youTubeLinkField).setValue(data.youTubeUrl);
    $(sel.dateField).setValue(data.currentDate);
    $(sel.lectureDescField).setValue(data.lectureDescText);
    $(sel.btn).click();
    browser.waitUntil(
      () => {
        return $(sel.lectureSel).isDisplayed() === true;
      },
      5000,
      'expected true after 5s',
    );
  });

  it('should check that the user sees successful `Created` message', () => {
    expect($(sel.successLectureMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful `Created` message', () => {
    expect($(sel.successLectureMsg).getText()).to.be.equal(data.textLectureMsg);
  });

  it('should check that the `Edit` button is displayed', () => {
    expect($(sel.editSel).isDisplayed()).to.be.true;
  });

  it('should check that after the `Edit` button clicked on user is redirected `Edit lecture` page', () => {
    $(sel.editSel).click();
    const headerEditText = $(sel.headerEdit)
      .getText()
      .includes(data.editLecture);
    expect(headerEditText).to.be.true;
  });

  it('should check that the lecture has new name', () => {
    $(sel.lectureNameField).clearValue();
    $(sel.lectureNameField).setValue(data.newLectureName);
    $(sel.lectureDescField).clearValue();
    $(sel.lectureDescField).setValue(data.newDesc);
    $(sel.btn).click();
    $(sel.lectureSel).waitForDisplayed(3000);
    expect($(sel.lectureSel).getText()).to.be.equal(data.newLectureName);
  });

  it('should check that the user sees successful message', () => {
    $(sel.successLectureUpdatedMsg).waitForDisplayed(3000);
    expect($(sel.successLectureUpdatedMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful message', () => {
    expect($(sel.successLectureUpdatedMsg).getText()).to.be.equal(data.textLectureUpdatedMsg);
  });

  it('should check that the description has new name', () => {
    $(sel.lectureSel).click();
    expect($(sel.description).getText()).to.be.equal(data.newDesc);
  });
});
