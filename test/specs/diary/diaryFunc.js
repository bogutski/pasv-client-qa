import { expect } from 'chai';
import { url } from './../constants';
import loginAction from './../user/_actions/loginAction';

const menuDiarySelector = '//div[@id="site-menu"]//a[text() = "Diary"]';
const headerSelector = '//h1';
const diaryRecordSelector = '//div[@class="mt-2"]';
const createDayReportButtonSelector = '//a[text()="Create day report"]';
const saveButtonSelector = '//button[@type="submit"]';
const checkBoxSelector = '//input[@type="checkbox"]';
const descriptionFieldSelector = '//textarea[@name="description"]';

const diaryH1 = 'Day reports';
const createDiaryH1 = 'Create day report';
const dayReportShortText = 'Today I wrote tests.';
const dayReportText =
  'Today I watched 2 lectures and solved 3 tasks on codewars. Also I wrote tests.';

describe('Diary - Func', () => {
  before(() => {
    loginAction(browser);
  });

  it('should verify that `Diary`item is displayed in main menu', () => {
    const diaryIsDisplayed = $(menuDiarySelector).isDisplayed();
    expect(diaryIsDisplayed).to.be.true;
  });

  it('should verify that click to `Diary` in main menu should redirect to Diary page', () => {
    $(menuDiarySelector).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryList);
  });

  it('should verify that `Day reports` page has correct h1', () => {
    const actualH1Text = $(headerSelector).getText();
    expect(actualH1Text).to.equal(diaryH1);
  });

  it('should verify that `Day reports` page has at least one record', () => {
    browser.pause(1000);
    const countOfRecords = $$(diaryRecordSelector).length;
    expect(countOfRecords > 0).to.be.true;
  });

  it('should verify that click to `Create day report` button redirect to `Create day report` page', () => {
    $(createDayReportButtonSelector).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryCreateForm);
  });

  it('should verify that `Create day report` page has correct h1', () => {
    const actualh1Text = $(headerSelector).getText();
    expect(actualh1Text).to.equal(createDiaryH1);
  });

  it('should verify that there are checkboxes on `Create day report` page', () => {
    const countOfCheckBoxes = $$(checkBoxSelector).length;
    expect(countOfCheckBoxes).equal(12);
  });

  it('should verify that `Save` button is disabled', () => {
    const isEnabled = $(saveButtonSelector).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should verify that `Save` button is disabled when there is the day report, but there are no checkmarks', () => {
    const descriptionArea = $(descriptionFieldSelector);
    descriptionArea.setValue(dayReportText);
    const isEnabled = $(saveButtonSelector).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should verify that `Save` button is disabled when there are checkmarks, but there is no day report', () => {
    //check marks
    for (let i = 0; i <= 6; i++) {
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    const descriptionArea = $(descriptionFieldSelector);
    descriptionArea.setValue('');
    const isEnabled = $(saveButtonSelector).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should verify that `Save` button is disabled when there are checkmarks, but day report is < 30 characters', () => {
    const descriptionArea = $(descriptionFieldSelector);
    descriptionArea.setValue(dayReportShortText);
    const isEnabled = $(saveButtonSelector).isEnabled();
    expect(isEnabled).to.be.false;
  });

  it('should verify that description area is-invalid when day report length < 30', () => {
    const descriptionArea = $(descriptionFieldSelector);
    expect(descriptionArea.getAttribute('class')).includes('is-invalid');
  });

  it('should verify that `Save` button is enabled when there is a correct report and checkmarks', () => {
    const descriptionArea = $(descriptionFieldSelector);
    descriptionArea.setValue(dayReportText);
    const isEnabled = $(saveButtonSelector).isEnabled();
    expect(isEnabled).to.be.true;
  });

  it('should verify that description area is-valid when day report length >= 30', () => {
    const descriptionArea = $(descriptionFieldSelector);
    expect(descriptionArea.getAttribute('class')).includes('is-valid');
  });

  it('should verify that click to `Save` button should redirect to `Day reports` page', () => {
    const saveButton = $(saveButtonSelector);
    saveButton.click();
    browser.pause(1000);
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryList);
  });

  it('should verify that day report appeared on `Day reports` page', function() {
    // const dataMinutesNew = new Date().getMinutes();
    const lastDiaryRecord = $$(diaryRecordSelector)[0].getText();
    expect(lastDiaryRecord).to.equal(dayReportText);
  });
});
