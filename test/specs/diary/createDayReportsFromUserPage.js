import { expect } from 'chai';
import { url } from './../constants';
import { user } from './../user/_data/data';
import loginAction from './../user/_actions/loginAction';

const selector = {
  headerH1: '//h1',
  headerH3: '//h3[contains(text(),"Daily reports")]',
  numberOfDayReports: '//h3/span[@class="badge badge-light"]',
  diaryRecord: '//div[@qa="description"]',
  createDayReportButton: '//a[@qa="create-day-report-button"]',
  saveButton: '//button[@type="submit"]',
  descriptionField: '//textarea[@name="description"]',
};

//const diaryH1 = 'Daily reports';
const createDiaryH1 = 'Create day report';
const expectedHeaderH3Text = 'Daily reports';
const dayReportText = `Today I watched ${Math.trunc(
  Math.random() * 10,
)} lectures and solved ${Math.trunc(Math.random() * 10)} tasks on codewars. Also I wrote tests.`;

describe('Diary - From User Page - Functionality', () => {
  before(() => {
    loginAction(browser);
    browser.pause(500);
  });

  it('should verify that after login actions should redirect to User page', () => {
    const actualH1Text = $(selector.headerH1).getText();
    const expectedH1Text = `${user.admin.firstName} ${user.admin.lastName}`;
    expect(actualH1Text).to.equal(expectedH1Text);
  });

  it("should verify that user's page has correct header h3", () => {
    const headerH3Text = $(selector.headerH3).getText();
    expect(headerH3Text).to.include(expectedHeaderH3Text);
  });

  it('should verify that initial number of day reports > 0', () => {
    browser.pause(1000);
    const initialNumber = $(selector.numberOfDayReports).getText();
    expect(+initialNumber > 0).to.be.true;
  });

  it('should verify that click to `Create day report` button redirect to `Create day report` page', () => {
    $(selector.createDayReportButton).click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryCreateForm);
  });

  it('should verify that `Create day report` page has correct h1', () => {
    const actualH1Text = $(selector.headerH1).getText();
    expect(actualH1Text).to.equal(createDiaryH1);
  });

  it('should verify that `Save` button is enabled when there are checkboxes and correct report', () => {
    for (let i = 1; i < 12; i++) {
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    const descriptionArea = $(selector.descriptionField);
    descriptionArea.setValue(dayReportText);
    browser.pause(500);
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
});
