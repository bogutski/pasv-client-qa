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
const notificationText = 'Diary deleted';
const attributeClass = 'class';
const classHasWarning = 'has-warning';
const checkBoxesList = [
  'I need help',
  'I understood everything',
  'Helped classmates',
  'Watched lectures',
  'Read documentation',
  'Code practice',
  'Quiz practice',
  'Interview preparation',
  'Recruiter phone call',
  'Interview technical screen',
  'Interview onsite',
  'Got a job offer',
];
let checkBoxesCount;
let allCheckBoxes;
let thisCheckBox;
let formGroupOfCheckBoxes;
let hasWarningClass;
let allDiariesInDB;
let allDiariesCount;
let allDiariesCountAfterDeleting;
let myDiary;
let myDiaryCount;
let diaryId;

const selector = {
  menuDiary: '//a[@qa="diary-link"]',
  createDayReportButton: '//a[@qa="create-day-report-button"]',
  checkBox: '//input[@type="checkbox"]',
  checkBoxesOnThePage: '//input[@type="checkbox"]/..//label[contains(@for,"input")]/div',
  formGroup: '//div[contains(@class,"form-group") and .//input[@type="checkbox"]]',
  descriptionArea: '//textarea[@name="description"]',
  allDiariesOnThePage: '//div[@qa="description"]',
  saveButton: '//button[@type="submit"]',
  deleteButton: '(//button[@qa="delete-button"])[1]',
  h1: '//h1',
  diaryDeletedMessage: '//div[contains(@class,"notification-success")]/h4',
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

  it('should find all the checkboxes on the page', () => {
    allCheckBoxes = $$(selector.checkBoxesOnThePage);
  });

  it('should verify the amount of checkboxes', () => {
    checkBoxesCount = allCheckBoxes.length;
    expect(checkBoxesCount).equal(checkBoxesList.length);
  });

  it('should verify that all checkboxes have correct text', () => {
    const checkBoxesText = allCheckBoxes.map(option => option.getText());
    expect(checkBoxesText).to.deep.equal(checkBoxesList);
  });

  it('should verify that no checkbox is marked', () => {
    formGroupOfCheckBoxes = $(selector.formGroup);
    hasWarningClass = formGroupOfCheckBoxes.getAttribute(attributeClass).includes(classHasWarning);
    expect(hasWarningClass).to.be.true;
  });

  it('should fill in the description area', () => {
    $(selector.descriptionArea).setValue(dayReportText);
  });

  for (let i = 1; i <= checkBoxesList.length; i++) {
    it(`should verify that '${checkBoxesList[i - 1]}' is marked`, () => {
      thisCheckBox = $('(' + selector.checkBox + ')[' + i + ']');
      thisCheckBox.click();
      hasWarningClass = formGroupOfCheckBoxes.getAttribute(attributeClass).includes(classHasWarning);
      expect(hasWarningClass).to.be.false;
    });

    it(`should verify that '${checkBoxesList[i - 1]}' is unmarked`, () => {
      thisCheckBox = $('(' + selector.checkBox + ')[' + i + ']');
      thisCheckBox.click();
      hasWarningClass = formGroupOfCheckBoxes.getAttribute(attributeClass).includes(classHasWarning);
      expect(hasWarningClass).to.be.true;
    });
  }

  it('should mark all checkboxes', () => {
    for (let i = 1; i <= checkBoxesCount; i++) {
      thisCheckBox = $('(' + selector.checkBox + ')[' + i + ']');
      thisCheckBox.click();
    }
  });

  it('should create "My Diary"', () => {
    $(selector.saveButton).click();
  });

  it('should get all diaries from the DB', async () => {
    allDiariesInDB = await diaryGetAll(token);
    expect(allDiariesInDB).to.be.an('array');
  });

  it('should verify that the amount of all diaries is more than 0', () => {
    allDiariesCount = allDiariesInDB.length;
    expect(allDiariesCount > 0).to.be.true;
  });

  it('should verify that the first element has the necessary description', () => {
    myDiary = allDiariesInDB[0];
    expect(myDiary.description).contains(extraNumber);
  });

  it('should verify that only 1 element has a unique description in "All Diaries" array', () => {
    myDiaryCount = allDiariesInDB.filter(dairy => dairy['description'].startsWith(extraNumber));
    expect(myDiaryCount.length).to.be.equal(1);
  });

  it('should get "My diary" Id', () => {
    diaryId = myDiary._id;
  });

  it('should delete "My diary"', () => {
    $(selector.deleteButton).click();
  });

  it('should verify that success message is displayed', () => {
    browser.waitUntil(
      () => {
        return $(selector.diaryDeletedMessage).getText() === notificationText;
      },
      5000,
    );
    const messageIsDisplayed = $(selector.diaryDeletedMessage).isDisplayed();
    expect(messageIsDisplayed).to.be.true;
  });

  it('should verify that the DB does not have a diary with "My diary" Id', async () => {
    myDiary = await diaryGetByID(token, diaryId);
    expect(myDiary).to.be.null;
  });

  it('should get all diaries from the DB after deleting "My diary"', async () => {
    allDiariesInDB = await diaryGetAll(token);
  });

  it('should verify that the total number of diaries on the "Diary" page is equal to the amount in the DB', () => {
    browser.refresh();
    browser.waitUntil(
      () => {
        return $$(selector.allDiariesOnThePage).length >= allDiariesInDB.length;
      },
      5000,
    );
    allDiariesCountAfterDeleting = $$(selector.allDiariesOnThePage);
    expect(allDiariesCountAfterDeleting.length).to.be.equal(allDiariesInDB.length);
  });

  it('should verify that there is not a single diary with my description on the "Diary" page', () => {
    for (let i = 1; i <= allDiariesCountAfterDeleting.length; i++) {
      const diaryText = $('(' + selector.allDiariesOnThePage + ')[' + i + ']').getText();
      expect(diaryText).to.not.include(extraNumber);
    }
  });

  it('should verify that there is not a single diary with my description in the DB', () => {
    myDiaryCount = allDiariesInDB.filter(dairy => dairy['description'].startsWith(extraNumber));
    expect(myDiaryCount.length).to.be.equal(0);
  });
});
