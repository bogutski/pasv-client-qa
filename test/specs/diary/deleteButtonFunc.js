import { expect } from 'chai';
import loginAction from './../user/_actions/loginAction';
import diaryGetAll from './_actions/diaryGetAll';
import diaryGetByID from './_actions/diaryGetByID';
import { url } from './../constants';

const token = process.env.TOKEN_ADMIN;
const extraNumber = new Date().getTime();
const dayReportText = extraNumber + ' Watched a video about methods bind(), call(), apply() in Javascript.';
const h1DailyReports = 'Daily reports';
const h1CreateDayReport = 'Create day report';
let allDiariesInDB;
let allDiariesCount;
let myDiary;
let diaryId;

const selector = {
  menuDiary: '//a[@qa="diary-link"]',
  createDayReportButton: '//a[@qa="create-day-report-button"]',
  descriptionArea: '//textarea[@name="description"]',
  saveButton: '//button[@type="submit"]',
  deleteButton: '(//button[@qa="delete-button"])[1]',
  h1: '//h1',
};

describe('Diary - Delete button - Functionality', () => {
  before(() => {
    loginAction(browser);
  });

  it('should redirect to the "Diary" page', () => {
    $(selector.menuDiary).click();
  });

  it('should have correct h1 after redirecting to the "Diary" page', () => {
    const actualH1 = $(selector.h1).getText();
    expect(actualH1).to.be.equal(h1DailyReports);
  });

  it('should have correct url after redirecting to the "Diary" page', () => {
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.be.equal(url.diaryList);
  });

  it('should redirect to the "Create day report" page', () => {
    browser.waitUntil(() => {
      return $(selector.createDayReportButton).isDisplayed();
    }, 5000);
    $(selector.createDayReportButton).click();
  });

  it('should have correct h1 after redirecting to the "Create day report" page', () => {
    const actualH1 = $(selector.h1).getText();
    expect(actualH1).to.be.equal(h1CreateDayReport);
  });

  it('should have correct url after redirecting to the "Create day report" page', () => {
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.be.equal(url.diaryCreateForm);
  });


  it('should fill day report area and mark checkboxes', () => {
    $(selector.descriptionArea).setValue(dayReportText);
    for (let i = 0; i <= 11; i++) {   //length, массив, что есть в том порядке! что они не нажаты, а потом нажаты
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    browser.pause(1000); //попробовать без
    $(selector.saveButton).click();
  });


  it('should get all diaries from the DB', async () => {
    allDiariesInDB = await diaryGetAll(token);
    allDiariesCount = allDiariesInDB.length;
  });

  it('verify that the amount of diaries is more than 0', () => {
    expect(allDiariesCount > 0).to.be.true;
  });

  it('verify that the null element from all diaries has the necessary description', () => {
    expect(allDiariesInDB[0].description).contains(extraNumber);
    myDiary = allDiariesInDB[0];
  });

  it('verify that in "All Diaries" array only 1 element has a unique description', () => {
    const myDiaryCount = allDiariesInDB.filter(dairy => dairy['description'].startsWith(extraNumber));
    expect(myDiaryCount.length).to.be.equal(1);
  });

  it('should get "My diary" Id', () => {
    diaryId = myDiary['_id'];
  });


  it('should delete "My diary"', () => {
    $(selector.deleteButton).click();
    browser.refresh();
  });

  it('should verify that "My diary" has been deleted from DB', async () => {
    myDiary = await diaryGetByID(token, diaryId);
    expect(myDiary).to.be.null;
  });

  it('should verify that after deleting "My diary" the amount of all diaries decreased by 1', async () => {
    allDiariesInDB = await diaryGetAll(token);
    expect(allDiariesInDB.length).to.be.equal(allDiariesCount - 1);
  });

  //DB по всем нет с моим description
  //notification
  // it('should verify that "My diary" has been deleted on the page', () => {
  //   myDiaryOnThePage = $$(selector.allDiaries);
  //   expect(myDiaryOnThePage.length).to.be.equal(0);
  // });
});