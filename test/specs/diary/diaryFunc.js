import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';
import diaryGetAll from './_actions/diaryGetAll';

const selector = {
  menuDiary: '//a[@qa="diary-link"]',
  header: '//h1',
  diaryRecord: '//div[@qa="description"]',
  createDayReportButton: '//a[@qa="create-day-report-button"]',
  saveButton: '//button[@type="submit"]',
  checkBox: '//input[@type="checkbox"]',
  morale: '//select[@name="morale"]',
  hours: '//input[@name="hours"]',
  descriptionField: '//textarea[@name="description"]',
  invalidFeedback: '//div[@class="invalid-feedback"]',
};

const diaryH1 = 'Daily reports';
const createDiaryH1 = 'Create day report';
const dayReportShortText = 'Today I wrote tests.';
const dayReportText = `Today I watched ${Math.trunc(
  Math.random() * 10,
)} lectures and solved ${Math.trunc(Math.random() * 10)} tasks on codewars. Also I wrote tests.`;
const morale = Math.trunc(Math.random() * 10);
const hours = Math.trunc(Math.random() * 10);
const incorrectHours = 11;

let allDiaries;
let initialDiaryCount;
let countOfCheckBoxes;

describe('Diary - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should get all diaries from DB and store initial count', async () => {
    const allDiaries = await diaryGetAll(process.env.TOKEN_ADMIN);
    initialDiaryCount = allDiaries.length;
  });

  it('should verify that `Diary`item is displayed in main menu', () => {
    const diaryIsDisplayed = $(selector.menuDiary).isDisplayed();
    expect(diaryIsDisplayed).to.be.true;
  });

  it('should verify that click to `Diary` in main menu should redirect to `Day reports` page', () => {
    $(selector.menuDiary).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryList);
  });

  it('should verify that `Day reports` page has correct h1', () => {
    const actualH1Text = $(selector.header).getText();
    expect(actualH1Text).to.equal(diaryH1);
  });

  it('should verify that `Day reports` page has at least one record', () => {
    browser.pause(1000);
    const countOfRecords = $$(selector.diaryRecord).length;
    expect(countOfRecords > 0).to.be.true;
  });

  it('should verify that click to `Create day report` button redirect to `Create day report` page', () => {
    $(selector.createDayReportButton).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryCreateForm);
  });

  it('should verify that `Create day report` page has correct h1', () => {
    const actualH1Text = $(selector.header).getText();
    expect(actualH1Text).to.equal(createDiaryH1);
  });

  it('should verify that there are checkboxes on `Create day report` page', () => {
    countOfCheckBoxes = $$(selector.checkBox).length;
    expect(countOfCheckBoxes).equal(12);
  });

  it('should verify that the field `What is your morale` is displayed', () => {
    const moraleFieldisDisplayed = $(selector.morale).isDisplayed();
    expect(moraleFieldisDisplayed).to.be.true;
  });

  it('should verify that the field `How many hours did you study today` is displayed', () => {
    const hoursFieldisDisplayed = $(selector.hours).isDisplayed();
    expect(hoursFieldisDisplayed).to.be.true;
  });

  it('should verify that the field `How was your day` is displayed', () => {
    const descriptionFieldisDisplayed = $(selector.descriptionField).isDisplayed();
    expect(descriptionFieldisDisplayed).to.be.true;
  });

  it('should verify that `Save` button is disabled', () => {
    const isEnabled = $(selector.saveButton).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should verify that checkboxes are required (`Save` button is disabled when there are no checkboxes)', () => {
    const descriptionArea = $(selector.descriptionField);
    descriptionArea.setValue(dayReportText);
    const isEnabled = $(selector.saveButton).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should check all checkboxes', () => {
    for (let i = 0; i < countOfCheckBoxes; i++) {
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    const isEnabled = $(selector.saveButton).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should verify that description area is-invalid when day report length < 30', () => {
    const descriptionArea = $(selector.descriptionField);
    descriptionArea.setValue(dayReportShortText);
    expect(descriptionArea.getAttribute('class')).includes('is-invalid');
  });

  it('should verify that description area is-valid when daily report text >= 30 characters', () => {
    const descriptionArea = $(selector.descriptionField);
    descriptionArea.setValue(dayReportText);
    expect(descriptionArea.getAttribute('class')).includes('is-valid');
  });

  it('should verify that `Morale` is required field (is-invalid when it is empty)', () => {
    const moraleField = $(selector.morale);
    moraleField.selectByVisibleText('');
    browser.keys('Tab');
    expect(moraleField.getAttribute('class')).includes('is-invalid ');
  });

  it('should verify that `Morale` is required field (is-valid when it is not empty)', () => {
    const moraleField = $(selector.morale);
    moraleField.selectByVisibleText(morale);
    browser.keys('Tab');
    browser.pause(600);
    expect(moraleField.getAttribute('class')).includes('is-valid');
  });

  it('should verify that `Hours` is required field (is-invalid when it is empty)', () => {
    const hoursField = $(selector.hours);
    hoursField.setValue('');
    browser.keys('Tab');
    expect(hoursField.getAttribute('class')).includes('is-invalid ');
  });

  it('should verify that maximum hours in `Hours` field is 10 (is-invalid when enter 11)', () => {
    const hoursField = $(selector.hours);
    hoursField.setValue(incorrectHours);
    browser.keys('Tab');
    expect(hoursField.getAttribute('class')).includes('is-invalid');
  });

  it('should verify that if hours>10 then invalid feedback is appeared)', () => {
    const hoursField = $(selector.hours);
    hoursField.setValue(incorrectHours);
    browser.keys('Tab');
    expect($(selector.invalidFeedback).isDisplayed()).to.be.true;
  });

  it('should verify that `Hours` is required field (is-valid when it is not empty)', () => {
    const hoursField = $(selector.hours);
    hoursField.setValue(hours);
    browser.keys('Tab');
    expect(hoursField.getAttribute('class')).includes('is-valid');
  });

  it('should verify that `Save` button is enabled when checkboxes and all required fields are correct', () => {
    const isEnabled = $(selector.saveButton).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should verify that click to `Save` button should redirect to `Day reports` page', () => {
    const saveButton = $(selector.saveButton);
    saveButton.click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryList);
  });

  it('should verify that day report appeared on `Day reports` page', () => {
    const lastDiaryRecord = $$(selector.diaryRecord)[0].getText();
    expect(lastDiaryRecord).to.equal(dayReportText);
  });

  it('should check correct description stored in DB with API call', async () => {
    allDiaries = await diaryGetAll(process.env.TOKEN_ADMIN);
    const firstDiary = allDiaries[0];
    expect(firstDiary.description).to.equal(dayReportText);
  });

  it('should verify that after creation new Diary total count increased by 1 ', () => {
    expect(allDiaries.length).eq(initialDiaryCount + 1);
  });

  it('should check amount of diaries in DB increased by 1 (with API call)', async () => {
    allDiaries = await diaryGetAll(process.env.TOKEN_ADMIN);
    const newDiaryCount = allDiaries.length;
    expect(newDiaryCount).to.equal(initialDiaryCount + 1);
  });
});
