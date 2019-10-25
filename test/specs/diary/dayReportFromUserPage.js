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
  checkBox: '//input[@type="checkbox"]',
  saveButton: '//button[@type="submit"]',
  morale: '//select[@name="morale"]',
  hours: '//input[@name="hours"]',
  descriptionField: '//textarea[@name="description"]',
  userDropDownMenu: '//a[@class="dropdown-toggle nav-link"]',
  optionDropDownMenu: '//button[contains(text(),"Profile")]',
};

const expected = {
  headerH3Text: 'Daily reports',
  createButtonText: 'Create day report',
};

const data = {
  morale: Math.trunc(Math.random() * 10),
  hours: Math.trunc(Math.random() * 10),
  dayReportText: `Today I watched ${Math.trunc(
    Math.random() * 10,
  )} lectures and solved ${Math.trunc(Math.random() * 10)} tasks on codewars.`,
};
let initialNumber;
let countOfCheckBoxes;

describe('Diary - From User Page - Functionality', () => {
  before(() => {
    loginAction(browser);
    browser.pause(500);
    initialNumber = $(selector.numberOfDayReports).getText();
  });

  it('should verify URL when redirect to User page', () => {
    const actualUrl = browser.getUrl();
    const expectedUrl = `${url.baseUrl}/user/${user.admin.id}`;
    expect(actualUrl).equal(expectedUrl);
  });

  it('should verify h1 of User page', () => {
    const actualH1Text = $(selector.headerH1).getText();
    const expectedH1Text = `${user.admin.firstName} ${user.admin.lastName}`;
    expect(actualH1Text).to.equal(expectedH1Text);
  });

  it('should verify that user`s page has header `Daily reports`', () => {
    const headerH3Text = $(selector.headerH3).getText();
    expect(headerH3Text).to.include(expected.headerH3Text);
  });

  it('should verify that initial number of user`s day reports > 0', () => {
    browser.pause(1000);
    initialNumber = $(selector.numberOfDayReports).getText();
    expect(+initialNumber > 0).to.be.true;
  });

  it('should verify that button `Create day report` is displayed ', () => {
    const buttonIsDisplayed = $(selector.createDayReportButton).isDisplayed();
    expect(buttonIsDisplayed).to.be.true;
  });

  it('should verify that button `Create day report` has correct text', () => {
    const button = $(selector.createDayReportButton);
    const textOfButton = button.getText();
    expect(textOfButton).equal(expected.createButtonText);
  });

  it('should verify that click to `Create day report` button redirect to `Create day report` page', () => {
    const button = $(selector.createDayReportButton);
    button.click();
    const actualUrl = browser.getUrl();
    expect(actualUrl).to.equal(url.diaryCreateForm);
  });

  it('should verify that `Save` button is enabled when all fields filled correctly', () => {
    countOfCheckBoxes = $$(selector.checkBox).length;
    for (let i = 0; i < countOfCheckBoxes; i++) {
      const selector = $('//input[@id="input-[' + i + ']"]');
      selector.click();
    }
    $(selector.descriptionField).setValue(data.dayReportText);
    $(selector.morale).selectByVisibleText(data.morale);
    $(selector.hours).setValue(data.hours);
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
    expect(lastDiaryRecord).to.equal(data.dayReportText);
  });

  it('should verify that click on `user name`- profile  in upper-right corner redirect to user`s page', () => {
    $(selector.userDropDownMenu).click();
    $(selector.optionDropDownMenu).click();
    const actualUrl = browser.getUrl();
    const expectedUrl = `${url.baseUrl}/user/${user.admin.id}`;
    expect(actualUrl).equal(expectedUrl);
  });

  it('should verify that number of user`s day reports on user`s page increased by 1', () => {
    let initialNumber1 = $(selector.numberOfDayReports).getText();
    expect(+initialNumber1 === +initialNumber + 1).to.be.true;
  });

  it('should verify that day report appeared on user`s page', () => {
    const lastDiaryRecord = $$(selector.diaryRecord)[0].getText();
    expect(lastDiaryRecord).to.equal(data.dayReportText);
  });
});
