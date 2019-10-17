import { expect } from 'chai';
import loginAction from './../user/_actions/loginAction';

const selector = {
  menuGroups: '//li/a[@qa="groups-link"]',
  h1: '//h1',
  submitButton: '//button[@type="submit"]',
  groupNames: '//h4/a',
  successMessage: '//div[@class="notification notification-success notification-visible"]',
  lecturesButton: '//a[contains(text(),"Lectures")]',
  createLectureButton: '//a[@qa="create-lecture-button"]',
  lectureName: '//input[@name="name"]',
  youtubeLink: '//input[@name="video"]',
  date: '//input[@placeholder="Date"]',
  checkbox: '//label[@for="Active"]',
  lectureDescription: '//textarea[@name="description"]',
};

const expected = {
  createLectureH1: 'Create lecture',
};

const data = {
  lectureName: 'Solving four tasks',
  lectureLink: 'https://www.youtube.com/watch?v=pPJOen-1-mw',
  lectureDescription: 'Analysis of the solution of four codewars tasks',
};

let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let date = month + '.' + day + '.' + year;

describe('Groups - Create Lecture - Functionality', () => {
  before(() => {
    loginAction(browser);
    $(selector.menuGroups).click();
    $(selector.groupNames).waitForDisplayed(1000);
    const lastGroupName = $$(selector.groupNames)[0];
    browser.pause(1000);
    lastGroupName.click();
  });

  it('should verify that after click on `Lectures` item button `Create lecture` is displayed', () => {
    $(selector.createLectureButton).waitForDisplayed(1000);
    expect($(selector.createLectureButton).isDisplayed()).to.be.true;
  });

  it('should verify that click on `Create lecture` button redirect to `Create lecture` page', () => {
    $(selector.createLectureButton).click();
    const actualH1 = $$(selector.h1)[1].getText();
    expect(actualH1).equal(expected.createLectureH1);
  });

  it('should verify that `Lecture name` field is displayed on `Create lecture` page', () => {
    expect($(selector.lectureName).isDisplayed()).to.be.true;
  });

  it('should verify that `YouTube link` field is displayed on `Create lecture` page', () => {
    expect($(selector.youtubeLink).isDisplayed()).to.be.true;
  });

  it('should verify that `Date` field is displayed on `Create lecture` page', () => {
    expect($(selector.date).isDisplayed()).to.be.true;
  });

  it('should verify that checkbox `Active` is displayed on `Create lecture` page', () => {
    expect($(selector.checkbox).isDisplayed()).to.be.true;
  });

  it('should verify that `Lecture description` textarea is displayed on `Create lecture` page', () => {
    expect($(selector.lectureDescription).isDisplayed()).to.be.true;
  });

  it('should verify that `Save` button is displayed on `Create lecture` page', () => {
    expect($(selector.submitButton).isDisplayed()).to.be.true;
  });

  it('should verify that `Save` button is disabled when fields are empty', () => {
    expect($(selector.submitButton).getAttribute('class')).includes('disabled');
  });

  it('should verify that `Save` button is enabled after filling in the required fields', () => {
    $(selector.lectureName).setValue(data.lectureName);
    $(selector.youtubeLink).setValue(data.lectureLink);
    $(selector.date).setValue(date);
    browser.keys('Tab');
    $(selector.lectureDescription).setValue(data.lectureDescription);
    $(selector.submitButton).waitForEnabled(1000);
    const isDisabled = $(selector.submitButton)
      .getAttribute('class')
      .includes('disabled');
    expect(isDisabled).to.be.false;
  });

  it('should verify that after click on `Save` button successful message displayed', () => {
    $(selector.submitButton).click();
    browser.pause(2000);
    expect($(selector.successMessage).isDisplayed()).to.be.true;
  });

  it('should verify that successful message text is correct', () => {
    const actualMessageText = $(selector.successMessage).getText();
    expect(actualMessageText.includes('Lecture created')).to.be.true;
  });
});
