import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';
import diaryGetAll from './_actions/diaryGetAll';
import diaryGetByID from './_actions/diaryGetByID';

const sel = {
  diaryLink: '//a[@qa="diary-link"]',
  header: '//h1',
  createDailyReportBtn: '//a[@qa="create-day-report-button"]',
  checkBox: '//input[@type="checkbox"]',
  morale: '//select[@name="morale"]',
  hours: '//input[@name="hours"]',
  description: '//textarea[@name="description"]',
  saveBtn: '//button[@type="submit"]',
  likeBtn: '//div[contains(text(),"read JS tutorial")]/../span/button[@qa="like-button"]',
  successMsg: '//div/h4[text()="Diary Like. Success"]',
};

const data = {
  headerDailyReport: 'Daily reports',
  morale: 5,
  hours: 5,
  description: 'Today I solved 2 katas, read JS tutorial and watched the last lesson.',
  statusNoLike: 0,
  statusLiked: 1,
  successMsg: 'Diary Like. Success',
  like: 'Like',
  likeThis: 'I like this',
};

let countOfCheckBox;
const token = process.env.TOKEN_ADMIN;
let allDiaries;
let diaryId;
let lastDiary;
let statusLike;

describe('Diary Like', () => {
  before(() => {
    loginAction(browser);
  });

  it('should redirect to `Diary page`', () => {
    $(sel.diaryLink).click();
    $(sel.header).waitForDisplayed(500);
    expect($(sel.header).getText()).equal(data.headerDailyReport);
  });

  it('should redirect to `Diary create page`', () => {
    $(sel.createDailyReportBtn).click();
    expect(browser.getUrl()).equal(url.diaryCreateForm);
  });

  it('should create `Daily report`', () => {
    countOfCheckBox = $$(sel.checkBox).length;
    for (let i = 0; i < countOfCheckBox; i++) {
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    $(sel.morale).selectByVisibleText(data.morale);
    $(sel.hours).setValue(data.hours);
    $(sel.description).setValue(data.description);
    $(sel.saveBtn).click();
    $(sel.header).waitForDisplayed(1000);
    expect($(sel.header).getText()).equal(data.headerDailyReport);
  });

  it('should get the diary and its Id in DB', async () => {
    allDiaries = await diaryGetAll(token);
    lastDiary = allDiaries[0];
    diaryId = lastDiary._id;
  });

  it('should check that `Like` button is displayed', () => {
    const isDisplayed = $(sel.likeBtn).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should check that `Like` button is enabled', () => {
    const isEnabled = $(sel.likeBtn).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should check that there is no `Like` in DB', async () => {
    lastDiary = await diaryGetByID(token, diaryId);
    statusLike = lastDiary.like;
    expect(statusLike.length).equal(data.statusNoLike);
  });

  it('should check that `Like` button is not displayed after user clicked on it', () => {
    $(sel.likeBtn).click();
    const expected = $(sel.likeBtn).getText();
    expect(expected).not.equal(data.like);
  });

  it('should check that `I like this` button is displayed', () => {
    const isDisplayed = $(sel.likeBtn).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should verify the text of the button', () => {
    const expected = $(sel.likeBtn).getText();
    expect(expected).contains(data.likeThis);
  });

  it('should check that `I like this` button is disabled', () => {
    const isEnabled = $(sel.likeBtn).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should check that success message appears', () => {
    const isDisplayed = $(sel.successMsg).isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should verify text the message', () => {
    const expected = $(sel.successMsg).getText();
    expect(expected).equal(data.successMsg);
  });

  it('should check that `Like` appears in DB', async () => {
    lastDiary = await diaryGetByID(token, diaryId);
    statusLike = lastDiary.like;
    expect(statusLike.length).equal(data.statusLiked);
  });
});
