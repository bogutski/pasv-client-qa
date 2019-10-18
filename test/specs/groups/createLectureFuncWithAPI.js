import { expect } from 'chai';
import loginAction from '../user/_actions/loginAction';
import getAllLectures from './_actions/getAllLecturesInGroup';

const sel = {
  groupLink: '//li/a[@qa="groups-link"]',
  header: '//h1',
  createGroupBtn: '//a[@qa="create-group-button"]',
  lectureNameField: '//input[@name="name"]',
  labelLectureName: '//label[@for="name"]',
  createBtn: '//button[@type="submit"]',
  lectureNameRequired:
    '//label[@for="name"]/./following-sibling::span[contains(text(),"Required")]',
  youTubeLinkField: '//input[@name="video"]',
  labelYouTubeLink: '//label[@for="video"]',
  youTubeLinkRequired:
    '//label[@for="video"]/./following-sibling::span[contains(text(),"Required")]',
  lectureDescField: '//textarea[@name="description"]',
  labelLectureDesc: '//label[@for="description"]',
  btn: '//button[@type="submit"]',
  successMsg: '//div[@class="notifications-br"]//h4[text()="Group created"]',
  groupByName: '//div[@qa="group-list"]//h4/a[contains(text(), "QA_new_Group")]',
  lecturesLink: '//a[contains(text(),"Lectures")]',
  createLectureBtn: '//a[@qa="create-lecture-button"]',
  dateField: '//input[@placeholder="Date"]',
  dateRequiredMsg: '//div[@class="invalid-feedback"]',
  editSel: '//a[@qa="edit"]',
  lectureSel: '//a[@qa="edit"]/../a/span',
  successLectureMsg: '//div[@class="notifications-br"]//h4[text()="Lecture created"]',
};

const data = {
  expHeaderGroups: 'Groups',
  expHeader: 'Create new Group',
  expLabelForName: 'Lecture name',
  allTypeText: 'QwЖц1?/>{])*&^%$#@! |',
  oneChar: 'I',
  largeText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna orci, pretium eget est sed, pretium egestas odio. Maecenas viverra lacinia ante vel scelerisque. Sed ut nibh lacus. Aenean dui nisl, accumsan non risus eget, malesuada congue nullam.',
  isValid: 'is-valid',
  isInvalid: 'is-invalid',
  expUrl: 'https://stage.pasv.us/group',
  expGroupHeader: 'Group QA_new_Group',
  youTubeUrl: 'https://www.youtube.com/watch?v=LnC67uHAkJA',
  notYouTubeUrl:
    'http://eps.schoolspecialty.com/products/online-programs/wordly-wise-i3000/about-the-program',
  lectureNameText: 'Practice lesson',
  lectureDescText: 'Codewars',
  textLectureMsg: 'Lecture created',
  groupID: '5da4fcdb60879e003814e338',
  currentDate: `${new Date().getMonth() + 1}.${new Date().getDate()}.${new Date().getFullYear()}`,

  headerEdit: 'Edit lecture',
  newLectureName: 'Lecture after editing',
};

const token = process.env.TOKEN_ADMIN;
let lecturesCount;
let allLectures;

describe('Create lecture functionality (check with API))', () => {
  before(() => {
    loginAction(browser);
  });

  it('should check that user gets redirected to `Groups` page', () => {
    $(sel.groupLink).click();
    $(sel.createGroupBtn).waitForDisplayed(500);
    expect($(sel.header).getText()).to.be.equal(data.expHeaderGroups);
  });

  it('should check that the group can be selected by name', () => {
    $(sel.groupByName).click();
    const headerInGroup = $(sel.header).getText();
    expect(headerInGroup).to.be.equal(data.expGroupHeader);
  });

  it('should get all lectures in a group through API and verify that is array', async () => {
    allLectures = await getAllLectures(token, data.groupID);
    lecturesCount = allLectures.length;
    console.log('Lecture`s amount before creating a lecture is : ', lecturesCount);
    expect(allLectures).to.be.an('array');
  });

  it('should check that the `Create lecture` button is displayed', () => {
    $(sel.lecturesLink).click();
    expect($(sel.createLectureBtn).isDisplayed()).to.be.true;
  });

  it('should check that click on `Create lecture` button redirects to creating lecture page', () => {
    $(sel.createLectureBtn).click();
    const actualUrl = browser.getUrl().includes(data.groupID);
    expect(actualUrl).to.be.true;
  });

  it('should check that the `Save` button is disabled if all fields are empty', () => {
    expect($(sel.btn).isEnabled()).to.be.false;
  });

  it('should check that `Lecture name` field is displayed', () => {
    expect($(sel.lectureNameField).isDisplayed()).to.be.true;
  });

  it('should check that `Lecture name` label is displayed', () => {
    expect($(sel.labelLectureName).isDisplayed()).to.be.true;
  });

  it('should check that `Lecture name` field is required', () => {
    expect($(sel.lectureNameRequired).isDisplayed()).to.be.true;
  });

  it('should check that `Lecture name` field accepts any type of text', () => {
    $(sel.lectureNameField).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.lectureNameField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Lecture name` field is valid with 1 char', () => {
    $(sel.lectureNameField).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.lectureNameField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Lecture name` field accepts any length of text', () => {
    $(sel.lectureNameField).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.lectureNameField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `YouTube link` field is displayed', () => {
    expect($(sel.youTubeLinkField).isDisplayed()).to.be.true;
  });

  it('should check that `YouTube link` label is displayed', () => {
    expect($(sel.labelYouTubeLink).isDisplayed()).to.be.true;
  });

  it('should check that `YouTube link` field is required', () => {
    expect($(sel.youTubeLinkRequired).isDisplayed()).to.be.true;
  });

  it('should check that `YouTube link` field accepts certain type of URLs', () => {
    $(sel.youTubeLinkField).setValue(data.youTubeUrl);
    browser.keys('Tab');
    const validation = $(sel.youTubeLinkField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `YouTube link` field does not accept other URLs', () => {
    $(sel.youTubeLinkField).setValue(data.notYouTubeUrl);
    browser.keys('Tab');
    const validation = $(sel.youTubeLinkField)
      .getAttribute('class')
      .includes(data.isInvalid);
    expect(validation).to.be.true;
  });

  it('should check that `Lecture description` field is displayed', () => {
    expect($(sel.lectureDescField).isDisplayed()).to.be.true;
  });

  it('should check that `Lecture description` label is displayed', () => {
    expect($(sel.labelLectureDesc).isDisplayed()).to.be.true;
  });

  it('should check that `Lecture description` field accepts any type of text', () => {
    $(sel.lectureDescField).setValue(data.allTypeText);
    browser.keys('Tab');
    const validation = $(sel.lectureDescField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Lecture description` field is valid with 1 char', () => {
    $(sel.lectureDescField).setValue(data.oneChar);
    browser.keys('Tab');
    const validation = $(sel.lectureDescField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Lecture description` field accepts any length of text', () => {
    $(sel.lectureDescField).setValue(data.largeText);
    browser.keys('Tab');
    const validation = $(sel.lectureDescField)
      .getAttribute('class')
      .includes(data.isValid);
    expect(validation).to.be.true;
  });

  it('should check that `Date` field is displayed', () => {
    expect($(sel.dateField).isDisplayed()).to.be.true;
  });

  it('should check that `Date` field is required', () => {
    $(sel.dateField).click();
    browser.keys('Tab');
    expect($(sel.dateRequiredMsg).isDisplayed()).to.be.true;
  });

  it('should check that the user can select date in `Date` field', () => {
    $(sel.dateField).setValue(data.currentDate);
    expect($(sel.dateField).getValue()).to.be.equal(data.currentDate);
  });

  it('should check that `Save` button is displayed', () => {
    expect($(sel.btn).isDisplayed()).to.be.true;
  });

  it('should check that the `Save` button is enabled if all fields are filled', () => {
    $(sel.lectureNameField).setValue(data.lectureNameText);
    $(sel.youTubeLinkField).setValue(data.youTubeUrl);
    $(sel.dateField).setValue(data.currentDate);
    $(sel.lectureDescField).setValue(data.lectureDescText);
    expect($(sel.btn).isEnabled()).to.be.true;
  });

  it('should check that new lecture is displayed after `Save` button clicked on', () => {
    $(sel.lectureNameField).setValue(data.lectureNameText);
    $(sel.youTubeLinkField).setValue(data.youTubeUrl);
    $(sel.dateField).setValue(data.currentDate);
    $(sel.lectureDescField).setValue(data.lectureDescText);
    $(sel.btn).click();
    browser.pause(500);
    expect($(sel.lectureSel).isDisplayed()).to.be.true;
  });

  it('should check that the user sees successful message', () => {
    expect($(sel.successLectureMsg).isDisplayed()).to.be.true;
  });

  it('should check that the text of successful message', () => {
    expect($(sel.successLectureMsg).getText()).to.be.equal(data.textLectureMsg);
  });

  it('should compare all lectures count in a group through API after lecture was created', async () => {
    allLectures = await getAllLectures(token, data.groupID);
    const lecturesCountAfterAPI = allLectures.length;
    const lecturesCountAfter = await $$(sel.lectureSel);
    const lecturesCountAfterUI = lecturesCountAfter.length;
    console.log('API vs UI', lecturesCountAfterAPI, lecturesCountAfterUI);
    expect(lecturesCountAfterAPI).to.be.equal(lecturesCountAfterUI);
  });
});
