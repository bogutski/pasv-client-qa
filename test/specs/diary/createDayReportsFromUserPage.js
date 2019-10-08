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
let initialNumber;
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
    initialNumber = $(selector.numberOfDayReports).getText();
  });

  it('should  verify redirect page URL', () => {
    const actualUrl = browser.getUrl();
    const expectedUrl = `${url.baseUrl}/user/${user.admin.id}`;
    expect(actualUrl).equal(expectedUrl);
  });

  it('should verify h1 of User page', () => {
    const actualH1Text = $(selector.headerH1).getText();
    const expectedH1Text = `${user.admin.firstName} ${user.admin.lastName}`;
    expect(actualH1Text).to.equal(expectedH1Text);
  });

  it('should verify that users page has header `Daily reports`', () => {
    const headerH3Text = $(selector.headerH3).getText();
    expect(headerH3Text).to.include(expectedHeaderH3Text);
  });

  it("should verify that initial number of user's day reports > 0", () => {
    browser.pause(1000);
    initialNumber = $(selector.numberOfDayReports).getText();
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

  it('should verify that click on `user name`- profile  in upper-right corner redirect to users page', function() {
    const selector = '//a[@class="dropdown-toggle nav-link"]';
    $(selector).click();
    const option = '//button[contains(text(),"Profile")]';
    $(option).click();
    browser.pause(10000);
    const actualUrl = browser.getUrl();
    const expectedUrl = `${url.baseUrl}/user/${user.admin.id}`;
    expect(actualUrl).equal(expectedUrl);
  });

  it("should verify that number of user's day reports increased by 1", () => {
    browser.pause(1000);
    let initialNumber1 = $(selector.numberOfDayReports).getText();
    expect(+initialNumber1 === +initialNumber + 1).to.be.true;
  });
});
